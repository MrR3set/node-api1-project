const express = require('express');

const server = express();

let user=[
    {
        id: "a_unique_id", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      }
]



server.get("/",(req,res) => {
    res.send("Ok api");
})



const port = 5000;
server.listen(port,()=>{
    console.log("server ok",port)
})