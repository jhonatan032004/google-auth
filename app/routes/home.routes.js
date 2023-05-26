import { Router } from "express";


const Route = Router();

Route.get('/about', (req,res)=>{
    res.render("about");
})

Route.get('/blog', (req,res)=>{
    res.render("blog");
})

Route.get('/contact', (req,res)=>{
    res.render("contact");
})

Route.get('/', (req,res)=>{
    res.render("index");
})

Route.get('/service', (req,res)=>{
    res.render("service");
})

export default Route;