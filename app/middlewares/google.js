import  passport  from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";

dotenv.config();

//const email = ["guerreroydragonxxs@gmail.com"];
  
passport.use(   
    "auth-google",
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7000/auth/google"
  },
  function(accessToken, refreshToken, profile, cb) {
      
    /* const response = email.includes(profile.emails[0].vale); */

   /*  if(response){
        cb(null,profile);
    }else{
        emails.push(profile.emails[0].value);
        cb(null,profile)
    } */
    return cb(null, profile);
  }
))