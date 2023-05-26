import { Router } from "express";


const Routes = Router();

Routes.get('/back', (req,res)=>{
    res.render("backoffice");
})

export default Routes;