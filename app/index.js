import app from "./app.js";

app.listen(app.get("port"), ()=>{
    console.log(`Conectado Al puerto locahost:${app.get("port")}`);
});


