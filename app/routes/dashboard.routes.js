import { Router, response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const dash= Router();


dash.get('/inicio', (req, res)=>{

    if(req.cookies.ckvalenuuu){
        try {
            const token = jwt.verify(req.cookies.ckvalenuuu,
                process.env.SECRET_KEY);


                res.render('dash',{
                    "nombre": token.nombre,
                    "foto": token.foto,
                    "menu": 0
                });
        } catch (error) {
            res.redirect("/")
        }



        res.render('dash');
    }else{
        res.redirect("/")
    }

/* console.log('Logueo Exitoso'); */
});

dash.get("/usuario", async (req, res)=>{
    if(req.cookies.ckvalenuuu){
        try {
            const token = jwt.verify(req.cookies.ckvalenuuu,
                process.env.SECRET_KEY);
                let ruta = "http://localhost:3000/api/user";
                let option ={
                    method:"GET",
                }
                let datos ={

                }
                const result = await fetch(ruta,option)
                .then(response => response.json())
                .then(data => {
                    datos = data;
                    console.log(data);
                })
                .catch(err => console.error("error en peticion: " + err))

                res.render('dash',{
                    "nombre": token.nombre,
                    "foto": token.foto,
                    "menu": 1,
                    "datos": datos
                });
        } catch (error) {
            res.redirect("/")
        }



        res.render('dash');
    }else{
        res.redirect("/")
    }
})

dash.post("/guardar", (req,res)=>{
    if(req.body.name){
    
     let data={
        name: req.body.name
    }
    let metodo ="post";
    if(req.body.id){
        data={
            id: req.body.id,
            name: req.body.name
        }   
        metodo = "put"
    }
     let ruta = "http://localhost:3000/api/user";
  


     let option = {
        method : metodo,
        headers:{
            "Content-Type": "application/json"
        },
       body : JSON.stringify(data)
     }
     try {
        const result = fetch(ruta, option)
        .then(res => res.json())
        .then(data =>{
            console.log("datos guardados");
        })
        .catch(err=>console.log("error al consumir la API " +err))
        res.redirect("/v1/usuario")
     } catch (error) {
        
     }

        // res.send("se ha guardado exitosamente  " + req.body.name)

    }else{
        res.send("error")
    }
})

dash.get("/edit-user", (req, res)=>{
    const id = req.query.id;
    const name = req.query.name;
    let datos ={
        id:id,
        name:name
    }

    if(req.cookies.ckvalenuuu){
        try {
            const token = jwt.verify
            (req.cookies.ckvalenuuu,
            process.env.SECRET_KEY);
            res.render('dash',{
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 4,
                "datos": datos
            });
        } catch (error) {
            console.error("error con el token");
        }
    }

   
})

dash.get("/salir",(req,res)=>{
    res.clearCookie("ckvalenuuu");
    res.redirect("/")

})

export default dash;