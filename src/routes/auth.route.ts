import { Router } from "express";
import {UserService} from "../services/user.service";
import crypto from "crypto";
import { createJWT, decodeJWT } from "../misc/jwt";

export const authRouter = Router();

authRouter.post('/auth/login', async(req, res) => {

    const username = req.body.name;
    const password = req.body.password;

    const user = await UserService.getUserByUsername(username);

    if(user == null) {
        res.status(404).send();
        return;
    }

    const hash = crypto.createHash('sha512').update(password).digest().toString('hex');

    if(user.password!= hash) {
        res.status(401).send();
        return;
    }

    const accessToken = createJWT("student-api", parseInt(process.env.ACCESS_DURATION!), "access", user.userId, "admin", req.ip, req.headers["user-agent"] ?? "", process.env.SECRET!);
    const refreshToken = createJWT("student-api", parseInt(process.env.REFRESH_DURATION!), "refresh",user.userId, "admin", req.ip, req.headers["user-agent"] ?? "", process.env.SECRET!);

    res.json({
        access: accessToken,
        refresh: refreshToken
    })

});

authRouter.post("/auth/refresh", async(req, res) => {

    const token = req.body.refreshToken;

    const jwt = decodeJWT(token, process.env.SECRET!);

    if(jwt == null) {
        console.log("Cannot decode token");
        res.status(401).send();
        return;
    }

    if(jwt.typ !== "refresh") {
        console.log("Not refresh token");
        res.status(401).send();
        return;
    }

    if(new Date(jwt.iat * 1000) > new Date()) {
        console.log("IAT is greater than NOW");
        res.status(401).send();
        return;
    }

    if(new Date(jwt.exp * 1000) < new Date()) {
        console.log("Token has expired");
        res.status(401).send();
        return;
    }

    if(jwt.iss !== "student-api") {
        console.log("Wrong ISS");
        res.status(401).send();
        return;
    }

    if(jwt.ip !== req.ip) {
        console.log("Different IP address");
        res.status(401).send();
        return;
    }

    if(jwt.ua !== req.headers["user-agent"]) {
        console.log("Wrong User Agent");
        res.status(401).send();
        return;
    }

    if(jwt.role === "admin") {

        const adminUser = UserService.getUserById(jwt.sub);

        if(adminUser == null) {
            console.log("User does not exist");
            res.status(401).send();
            return;
        }

        //... is deleted, is disabled ....

    } else {
        console.log("Unknown role");
        res.status(401).send();
        return;
    }

    const accessToken = createJWT(jwt.iss, parseInt(process.env.ACCESS_DURATION!), "access", jwt.sub, jwt.role, jwt.ip, jwt.ua, process.env.SECRET!);
    const refreshToken = createJWT(jwt.iss, parseInt(process.env.REFRESH_DURATION!), "refresh", jwt.sub, jwt.role, jwt.ip, jwt.ua, process.env.SECRET!);

    res.json({
        access: accessToken,
        refresh: refreshToken
    })

});