import { Router, response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";
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
                    "foto":token.foto,
                    "menu":0
                });

        } catch (error) {
            res.redirect("/")
        }

        //res.render("dash");
    }else{
        res.redirect("/")
    }
    
});

dash.get("/usuario", async (req,res)=>{
    if (req.cookies.ckeaj){
        try {
            const token = jwt.verify(
                req.cookies.ckeaj, 
                process.env.SECRET_KEY);

                let ruta = "http://localhost:3000/api/user";
                let option = {
                    method:"GET"
                }
                let datos = {};
                const result = await fetch(ruta,option)
                .then(response => response.json())
                .then(data => {
                    datos = data[0];
                    console.log(datos);
                })
                .catch(err => console.log("Error en peticion" + err))

                res.render("dash", {
                    "nombre":token.nombre,
                    "foto":token.foto,
                    "menu":1,
                    "datos":datos
                       });

        } catch (error) {
            res.redirect("/")
        }
    }else{
        res.redirect("/")
    }
    
});
dash.get("/productos", (req,res)=>{
    if (req.cookies.ckeaj){
        try {
            const token = jwt.verify(
                req.cookies.ckeaj, 
                process.env.SECRET_KEY);
                
                res.render("dash", {
                    "nombre":token.nombre,
                    "foto":token.foto,
                    "menu":2
                });

        } catch (error) {
            res.redirect("/")
        }
    }else{
        res.redirect("/")
    }
    
});
dash.get("/categorias", (req,res)=>{
    if (req.cookies.ckeaj){
        try {
            const token = jwt.verify(
                req.cookies.ckeaj, 
                process.env.SECRET_KEY);
                
                res.render("dash", {
                    "nombre":token.nombre,
                    "foto":token.foto,
                    "menu":3
                });

        } catch (error) {
            res.redirect("/")
        }
    }else{
        res.redirect("/")
    }
    
});

dash.post("/guardar", (req,res)=>{
    if(req.body.name){
        let data = {
            name:req.body.name
        }
        let ruta = "http://localhost:3000/api/user";
        let metodo = "post";

        let option = {
            method: metodo,
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data)
        };
        try {
            const result = fetch(ruta, option)
            .then(res=>res.json())
            .then(data=>{
                console.log("Datos guardados");
            })
            .catch(err=>console.log("error al consumir " + err))
            res.redirect("/v1/usuario")
        } catch (error) {
            
        }
    }else{
        res.send("error")
    }
});

dash.get("/salir", (req,res)=>{
    res.clearCookie("ckeaj");
    res.redirect("/")
});
export default dash;