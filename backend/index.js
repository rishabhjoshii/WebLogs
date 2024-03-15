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
require('dotenv').config();


const salt = bcrypt.genSaltSync(10);


const app=express();

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,      
    exposedHeaders: ["set-cookie"],      //access-control-allow-credentials:true
    methods:['GET','POST','PUT','DELETE']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGODB_URL)
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
        const token = jwt.sign({username},process.env.JWT_PASSWORD);
        console.log("token is here",token);
        return res.cookie('token',token).json({
            msg: "logged in successfully",
            id: user._id, 
            username,
            token: token
        });

    }
    catch(err){
        console.log("error while login", err);
        return res.status(400).json({msg: "erorr while login", error: err});
    }
})

app.get('/profile',async function(req,res){
    try{
        const {token} = req.cookies;
    //  console.log("token",token)
        if(!token && token == "") return res.status(400).json(null);

        jwt.verify(token, process.env.JWT_PASSWORD, (err,info) => {
            if(err) return res.json({msg:"error on /profile endpoint",error: err});
            return res.json(info);
        })
    }
    catch(err){
        return res.status(400).json({msg:"error on /profile endpoint",error: err});
    }
    
})

app.post('/logout', async function(req,res){
    // set the token as empty
    return res.cookie('token','').json({msg: "logout successfully"});
})

app.post('/post', uploadMiddleware.single('file'), async function(req,res){
   try{
      const {originalname, path} = req.file;
      const parts= originalname.split('.');
      const ext = parts[parts.length -1];
      const newPath = path+'.'+ext ;
      fs.renameSync(path, newPath);

      const {token} = req.cookies;
      jwt.verify(token, process.env.JWT_PASSWORD,{}, async (err,info) => {
         if(err) return res.status(400).json({err});

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

   }
   catch(err){
      return res.status(500).json({msg: "can't create Post",err});
   }
    
})

app.put('/post',uploadMiddleware.single('file'), async (req, res) => {
    try{
        let newPath = null;
        if(req.file){
            const {originalname, path} = req.file;
            const parts= originalname.split('.');
            const ext = parts[parts.length -1];
            newPath = path+'.'+ext ;
            fs.renameSync(path, newPath);
        }
        const {token} = req.cookies;
        jwt.verify(token, process.env.JWT_PASSWORD,{}, async (err,info) => {
            if(err) return res.status(400).json({err});
            
            //info to be updated
            const {id,title,summary,content,username} = req.body;

            //authentcate the user before editing the post
            //console.log("from bk , user is:", username);
            if(!username) return res.status(404).json({msg: "user is not the owner of this post"});
            
            const postDoc = await Post.findOne({_id:id});
            //console.log("from bk , author is :", postDoc);

            if(!postDoc || postDoc.author!==username) return res.status(404).json({msg: "author is not the owner of this blog"});
            
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
    }
    catch(err){
        return res.status(400).json({msg:"error at /post put endpoint",err});
    }
   
})

app.get('/post',async function(req,res){
    // const posts = await Post.find(); 
    // return res.json({msg: "posts retrieved successfully", posts: posts});
    try{
        const posts = await Post.find()
        // .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    ;

    return res.json(posts);
    }
    catch(err){
        return res.status(400).json({msg:"error at /post get endpoint",err});
    }
})

app.get('/post/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const postDoc = await Post.findById(id)
        // .populate('author', ['username']);
        return res.json({postDoc, status: 200});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({msg: "cant find post with this id", status: 404});
    }
    
})

app.delete('/post/:id', async function(req, res) {
    try{
        const {id} = req.params;
        const {username} = req.body;

        //authenticating the user before deleting the post
        if(!username) return res.status(400).json({msg: "user is not the owner of this post"});
        const postDoc = await Post.findById(id);
        if(!postDoc || postDoc.author !==username) return res.status(400).json({msg: "user is not the owner of this post"});

        //author is authenticated
        const response = await Post.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ msg: "Post not found" });
        }
        return res.json({msg:"post deleted successfully", response});
    }
    catch(err){
        return res.status(404).json({msg:"Deletion failed", err});
    }
})

app.get('/:username', async function(req,res){
    try{
        const {username} = req.params;

        const userExists = await User.findOne({username: username});
        if(!userExists) return res.status(404).json({msg: "user not found",status: 404});

        const userDoc = await Post.find({author: username}).sort({createdAt: -1});
        return res.json(userDoc);
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg: "error while fetching user's posts",status:400,err});
    }
})

app.listen(3000);
