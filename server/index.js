const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user_model = require("./models/users")
const jwt = require('jsonwebtoken');

const cors = require('cors')

app.use(express.json()) // parses the json
app.use(cors());

mongoose.connect("mongodb+srv://Saksham:saksham@cluster0.3qs9d.mongodb.net/todo?retryWrites=true&w=majority");

app.get("/getUsers",(req,res)=>{
    user_model.find({}, (err,result)=>{
        if(err){
            console.log("ERROR OCCURED!")
            res.json(err)
        }
        else{
            console.log("WORKED SUCCESSFULLY!")
            res.json(result)
        }
    })
})

app.post("/createUser",async (req,res)=>{
    const user = req.body;
    const new_user = new user_model(user);
    await new_user.save();

    res.json(user)
})

app.post("/login",async(req,res)=>{
    const user = await user_model.findOne({
        email : req.body.email,
        password : req.body.password,
    })

    if(user){
        const token = jwt.sign({
            email : user.email,
            name : user.name,
            age : user.age,
            todos : user.todos,
        }, 'secret')
        return res.json({ status:"ok", user  :token })
    }else{
        return res.json({ status:404, user:false })
    }
})

app.post("/updateUser", async (req,res)=>{
    await user_model.findOneAndUpdate(
        {"email" : req.body.email},
        {"todos" : req.body.todos}
    )

    res.json({ status:"ok" , updated:true })

})

app.post("/deleteUser", async (req,res)=>{
    await user_model.deleteOne(
        {"email" : req.body.email}
    ).then(()=>{
        return res.json({ status:"ok", updated:true })
    }).catch((err)=>{
        console.log(err);
        return res.json({ status:404 , updated:false })
    })

})

app.listen(3001,()=>{
    console.log("server is running on https://localhost:3001")
})