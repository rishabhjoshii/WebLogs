const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const jwtSecretKey = "mySecretKey123987";

const app=express();

app.use(cors({credentials: true, origin: 'http://localhost:5174'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://rishabhjoshii:qO4DyWnYsmlbPvER@cluster0.zozdpwg.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Can't connect to database", err);
    });


app.post("/register", async function(req,res){
    const {username, password} = req.body;
    try{
        const newUser = await new User({
            username,
            password : bcrypt.hashSync(password,salt),
        })
        await newUser.save();
        return res.json(newUser);
    }
    catch(err){
        console.log("error while signing in,may be username already exists", err);
        return res.status(400).json({msg: "error while signing in,may be username already exists", error: err});
    }
})

app.post('/login', async function(req,res){
    const {username,password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user) return res.status(200).json({msg: "Invalid username"});

        const result = bcrypt.compareSync(password,user.password);

        if(!result) return res.status(400).json({msg: "Incorrect password"});

        //user is valid ,generate token for the user
        const token = jwt.sign({username},jwtSecretKey);
        return res.cookie('token',token).json({
            msg: "logged in successfully",
            id: user._id, 
            username,
        });

    }
    catch(err){
        console.log("error while login", err);
        return res.status(400).json({msg: "erorr while login", error: err});
    }
})

app.get('/profile',async function(req,res){
    const {token} = req.cookies;
    jwt.verify(token, jwtSecretKey,{}, (err,info) => {
        if(err) throw err;
        return res.json(info);
    })
})

app.post('/logout', async function(req,res){
    // set the token as empty
    return res.cookie('token','').json({msg: "logout successfully"});
})

app.listen(3000);