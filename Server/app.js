const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
const User = require('./models/user');


//-------------------------------------------DO NOT EDIT ABOVE------------------------------------------------
//=================================-----------------=SET-UP=------------------================================
const db = "Users";
const orgin="http://localhost:3000";
//============================================================================================================
//--------------------------------------------DO NOT EDIT BELOW-----------------------------------------------


mongoose.connect('mongodb://localhost:27017/'+db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log("MONGO CONNECTION OPEN") }).catch(err => {
    console.log("THERE IS A PROBLEM");
    console.log(err)
});

mongoose.set('useFindAndModify', false);

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));


//Check the Requestes from the Autentic Front-End
const checkFromAutenticFrontEnd=(serverOrgin)=>{
    return serverOrgin==orgin;
}

app.post("/register",async(req,res)=>{

    //NOTE---------------
    //user_find => to find the user => returns null if the user is not found
    //DB SCHEMA {Email,Password,Date:default}
    //Enterd in the DB {user,pass}
    


    //Checking the Request is from the orgin
    if(checkFromAutenticFrontEnd(req.headers.origin)){
        //Object dereferencing
        const {user,pass}=req.body;

        //Password Encryption
        const hash = await bcrypt.hash(pass, 12);

        User.findOne({Email:user}).then((user_find) => {
            if(user_find){
                console.log("User exist");
            }else{
                // console.log(user+" "+hash);
                // user is from => front-end hash is from bycrypt
                const userTemp=new User({Email:user,Password:hash});
                userTemp.save();
                console.log("Entered in the database");
            }
        });

    }else{
        console.log("Network is wrong");
    }

});

app.post('/login',async(req,res)=>{
    if(checkFromAutenticFrontEnd(req.headers.origin)){
        const {user,pass}=req.body;
        try {
            const user_find = await User.findOne({ Email:user });
            const validPassword = await bcrypt.compare(pass, user_find.Password);
            
            if (validPassword) {
                res.send(user_find)
                console.log("Valid password")
            }else{
                res.send({message:"Wrong Password"})
                console.log("Not a valid password")
            }
        }catch(error){
            res.send({err:error});
            console.log(error);
        } 
    }
})

app.listen(3001, () => {
    console.log("SERVER STARTED");
});