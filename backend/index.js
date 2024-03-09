const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);
const jwtSecretKey = "mySecretKey123987";

const app=express();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

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
        if(!user) return res.status(401).json({msg: "Invalid username"});

        const result = bcrypt.compareSync(password,user.password);

        if(!result) return res.status(401).json({msg: "Incorrect password"});

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
   //  console.log("token",token)
    if(!token && token == "") return res.status(400).json(null);

    jwt.verify(token, jwtSecretKey, (err,info) => {
        if(err) return res.json({msg:"error on /profile endpoint",error: err});
        return res.json(info);
    })
})

app.post('/logout', async function(req,res){
    // set the token as empty
    return res.cookie('token','').json({msg: "logout successfully"});
})

app.post('/post', uploadMiddleware.single('file'), async function(req,res){
    const {originalname, path} = req.file;
    const parts= originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext ;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, jwtSecretKey,{}, async (err,info) => {
        if(err) throw err;

        // const {title,summary,content} = req.body;
        const {title,summary,content,username} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            // author: info.id,
            author: username
    });
        return res.json(postDoc);
    });

})

app.put('/post',uploadMiddleware.single('file'), async (req, res) => {
   let newPath = null;
   if(req.file){
      const {originalname, path} = req.file;
      const parts= originalname.split('.');
      const ext = parts[parts.length -1];
      newPath = path+'.'+ext ;
      fs.renameSync(path, newPath);
   }
   const {token} = req.cookies;
   jwt.verify(token, jwtSecretKey,{}, async (err,info) => {
      if(err) throw err;
      // console.log("verify info is here",info);
      //info to be updated
     const {id,title,summary,content} = req.body;
     //console.log("body from backend" , req.body);

     const postDoc = await Post.find({_id:id});
     const updatedPost = await Post.updateOne({_id:id},{
         $set: {title:title, 
               summary:summary, 
               content:content,
               cover: newPath ? newPath : postDoc.cover,
            }
     })
     //console.log("postDoc is here", postDoc);
   
     return res.json({msg:"post updated successfully", updatedPost});
  });
})

app.get('/post',async function(req,res){
    // const posts = await Post.find(); 
    // return res.json({msg: "posts retrieved successfully", posts: posts});
    return res.json(await Post.find()
        // .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id)
      // .populate('author', ['username']);
    return res.json(postDoc);
})

app.listen(3000);
