import  express  from "express";
import dotenv from "dotenv";
import { loginRouter } from "./routes/login.routes.js";
import passport from "passport";
import "./middlewares/google.js"
import ejs from "ejs";
import path from "path";
import * as url from 'url';
import routeHome from "./routes/backofficeroutes.js";

dotenv.config();

const app = express();
// Middlewares
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/auth",passport.authenticate("auth-google",{
    scope:[
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ],
    session:false
}),loginRouter);


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set("port", process.env.PORT || 9999);
app.set("views", path.join(__dirname, "views"));
//ASIGNANDO PLANTILLA EJS
app.set("view engine", "ejs");

// app.get("/", (req, res)=>{
//     res.send("HOLA BIENVENIDO");
// });
app.use("/", routeHome);

export default app;