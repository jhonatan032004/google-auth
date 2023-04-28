import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const dash = Router();

dash.get("/inicio", (req,res)=>{
    if (req.cookies.ckeaj){
        try {
            const token = jwt.verify(
                req.cookies.ckeaj, 
                process.env.SECRET_KEY);
                
                res.render("dash", {
                    "nombre":token.nombre,
                    "foto":token.foto
                });

        } catch (error) {
            res.redirect("/")
        }

        res.render("dash");
    }else{
        res.redirect("/")
    }
    
});

dash.get("/salir", (req,res)=>{
    res.clearCookie("ckeaj");
    res.redirect("/")
})
export default dash;