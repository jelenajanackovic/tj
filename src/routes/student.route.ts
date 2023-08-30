import { Router } from "express";
import { StudentServise } from "../services/student.service";
import { isDefined } from "../utilis";

const route = Router();

route.get('/', async function(req, res){
    res.json(await StudentServise.getAllStudents())
    
})

route.get('/search/:brIndeksa', async function (req, res) {
    const brIndeksa= req.params.brIndeksa
    const data= await StudentServise.getStudentByBrIndeksa(brIndeksa)
    isDefined(data, res)
    
})

route.get('/:id', async function(req,res) {
    const id = req.params.id;
    const data = await StudentServise.getStudentById(Number.parseInt(id))
    isDefined(data, res)  

})

route.post('/', async function (req, res) {
    try{
        const data = req.body;
        res.json(await StudentServise.saveStudent(data))
    } catch(e){
        res.statusCode = 500
        res.send({
            message: e.message
        })
    }
    
})

route.put('/:id', async function (req, res) {
    const id = req.params.id;
    const student = req.body;
    res.json(await StudentServise.updateStudent(Number.parseInt(id), student))
    
})

route.delete('/:id', async function (req, res) {
    const id = req.params.id;
    await StudentServise.deleteStudent(Number.parseInt(id))
    res.status(204).send();
    
})

export default route;