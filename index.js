const express = require('express');
const shortid = require('shortid');
const cors = require('cors');
const server = express();

let users=[
    {
        id: "0", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    }
]

server.use(cors());
server.use(express.json());

server.get("/",(req,res) => {
    res.json("Api running");
})

server.get("/api/users",(req,res) => {
    users?
    res.json(users):res.status(404).json({message:"The users information could not be retrieved. "});
});

server.get("/api/users/:id",(req,res) => {
    const user = users.find((user)=>user.id == req.params.id);
    user?res.status(200).json(user):res.status(404).json({message:"The user with the specified ID does not exist."});
});

server.post("/api/users",(req,res)=>{
    if(!(req.body.name) || !(req.body.bio)){
        res.status(400).json({errorMessage:"Please provide both name and bio for the user"})
        return;
    }
    const user = {id:(shortid.generate()),...req.body};
    users.push(user);
    users.includes(user)?res.status(201).json(users):res.status(500).json({errorMessage: "The users information could not be retrieved."})
})

server.delete("/api/users/:id",(req,res)=>{
    const userIndex = users.findIndex((user)=>user.id==req.params.id);
    userIndex>-1?users.splice(userIndex,1)
        ?res.status(201).json(users)
        :res.status(500).json({ errorMessage: "The user could not be removed" })
    :res.status(404).json({message:"The user with the specified ID does not exist."})
})

server.put("/api/users/:id",(req,res)=>{
    if(!(req.body.name) || !(req.body.bio)){
        res.status(400).json({errorMessage:"Please provide both name and bio for the user"})
        return;
    }
    const user = users.find((user)=>user.id==req.params.id);
    user?(users[users.indexOf(user)] = {id:(user.id),name:(req.body.name),bio:(req.body.bio)})
        ?res.status(201).json(users)
        :res.status(500).json({ errorMessage: "The user information could not be modified." })
    :res.status(404).json({errorMessage:"The user with the specified ID does not exist."})
})

const port = 5000;
server.listen(port,()=>{
    console.log("server ok",port)
})