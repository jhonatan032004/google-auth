import { Router } from "express";

const router = Router();

router.get("/", (req, res)=>{
    res.render("backoffice",{name:""});
})

export default router;