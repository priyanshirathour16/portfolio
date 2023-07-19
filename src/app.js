require('dotenv').config();
const express = require("express");
require("./db/conn");
const User = require("./models/user")
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const hbs = require("hbs");

const staticpath = path.join(__dirname , "../public");
const templatepath = path.join(__dirname , "../templates/views");
const partialspath = path.join(__dirname , "../templates/partials");
app.use(express.urlencoded({extended:false}));
app.use("/css" , express.static(path.join(__dirname , "../node_modules/bootstrap/dist/css")));
app.use("/js" , express.static(path.join(__dirname , "../node_modules/bootstrap/dist/js")));
app.use("/jq" , express.static(path.join(__dirname , "../node_modules/jquery/dist")));
app.use(express.static(staticpath));
app.set("view engine" , "hbs");
app.set("views" , templatepath);
hbs.registerPartials(partialspath);


app.get('/' , (req , res)=>{
    res.render("index")
})

app.post("/contact" , async(req , res )=>{
    try{
        // res.send(req.body);
        const userData =  new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch(err){
        res.status(500).send(err);
    }
})

app.listen(port , ()=>{
    console.log("server is running successsfully==")
}) 


