const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const bcrypt = require('bcrypt');

const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');




//-------------------------------------------DO NOT EDIT ABOVE------------------------------------------------
//=================================-----------------=SET-UP=------------------================================
const db = "Users";
const orgin="http://localhost:3000";
//============================================================================================================
//--------------------------------------------DO NOT EDIT BELOW-----------------------------------------------

const app = express();
app.use(cors({
    origin:[orgin],
    methods:["GET","POST"],
    credentials:true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    key:"userId",
    secret:"HelloImsomeonewhodontcareaboutbutitotallycareaboutmylifeiwannadomtechiniitimstudyingshitandforlife",
    resave:false,
    saveUninitialized:false,
    Cookie:{
        expires:60*60*24 
    }
}))
app.use(express.json());
const User = require('./models/user');

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

    //NOTE---------------
    // user_find => will have {_id,Email,Password,Date}
    // validPassword will only contain true or false
    
    

    //Checking the request from the orgin
    if(checkFromAutenticFrontEnd(req.headers.origin)){
        //Object dereferencing
        const {user,pass}=req.body;


        try {
            let user_find = await User.findOne({ Email:user });
            const validPassword = await bcrypt.compare(pass, user_find.Password);
            
            if (validPassword) {
                req.session.user=user_find;
                res.send(user_find);
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

app.get("/login", (req,res)=>{
    if(req.session.user){
        res.send({LoggedIn:true,user:req.session.user});
    }else{
        res.send({LoggedIn:false});
    }
})

app.listen(3001, () => {
    console.log("SERVER STARTED");
});