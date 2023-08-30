import { Router } from "express";
import { UserService } from "../services/user.service";
import { sendErrorResponse } from "../utilis";




const route = Router();





route.post('/', async function (req, res) {
    try{
        const data = req.body;
        res.json(await UserService.createUser(req.body.name, req.body.password));
    } catch(e){
        sendErrorResponse(e, res)
    }
    
})



export default route;

