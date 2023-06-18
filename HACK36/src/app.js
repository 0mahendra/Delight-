const express =require("express");
const path =require('path');
const hbs=require("hbs");
const multer = require("multer");
const app = express();

// imp 
app.use(express.json());
app.use(express.urlencoded({extended:false})); // iisi ki help se haam data ko get karege from the main site 


const port =  process.env.PORT ||8080;
const registration = require("./models/registration");
// yeh database ka schema ko add and connect karne ke liye 
// db wali file yah add karne ke liye 
require("./db/conn");
const staticpath=path.join(__dirname,"../public");
// const staticAdiuoPath= path.join(__dirname,"../uploads");
const changedName = path.join(__dirname,"../templets/views");
const partialPath = path.join(__dirname,"../templets/partials");
app.set("views" ,changedName);
app.set("view engine",'hbs');
hbs.registerPartials(partialPath);
app.use(express.static('public'));
// app.use(express,static(staticAdiuoPath));

app.get("/",(req,res)=>{
    res.render('login');
})
app.get("/registration",(req,res)=>{
    res.render('registration');
})
app.get("/homepage",(req,res)=>{
    res.render('homepage');
})

app.get("/index",(req,res)=>{
    res.render('index');
})
app.get("/audio",(req,res)=>{
    res.render('audio');
})
app.get("/AboutUs",(req,res)=>{
    res.render('AboutUs');
})
app.get("/home",(req,res)=>{
    res.render('homepage');
})
app.get("/meditation",(req,res)=>{
    res.render('meditation');
})
app.get("/ToDo",(req,res)=>{
    res.render('ToDo');
})

app.get("/journel",(req,res)=>{
    res.render('journel');
})

const upload = multer({
    storage : multer.diskStorage({
         destination : function(req,file,cb){
            cb(null,'./public/')
         },
         filename:function(req,file,cb){
            cb(null ,file.fieldname+Date.now().toString()+'.mp3')
         }
    })
}).single('myfile');
// var userFilename;
app.post('/upload',upload,async (req,res)=>{
    try{
    let userName1 = req.body.user;
    console.log(userName1);
    userFilename = req.file.filename;
    console.log(req.file.filename);
    const takendata = new registration({
        fileName:userFilename,
        UserName:userName1      
    })
    console.log(takendata.userName);
    const studentData =await registration.insertMany(takendata);
        console.log(studentData);
    // res.render("registration")
}catch(err){
    console.log(err);
}

})

app.post("/retrive",async(req,res)=>{
    try{
        const UserName = req.body.user;
        console.log(UserName);
        // console.log(pwd1);
        const userData = await registration.findOne({UserName:UserName});
        console.log(userData);
        // if(userData.age == pwd1){
            const filename = userData.fileName;
            res.render("audio",{filename});
            
        // }
        // else{
            // res.send("then password or email is not matching ")
        // }
        

    }
    catch(err){
        console.log(err);
    }
})
app.post("/registration",async (req,res)=>{
    try{
     const password1= req.body.pwd;
     const c1password = req.body.cpassward;
     if(password1==c1password){
       const takedata = new registration({
        Name:req.body.Name,
        UserName:req.body.UserName,
        Age:password1,
        gender:c1password,
        email:req.body.email
        
       })
        //  console.log(req.body.pwd);
        //  console.log(req.body.cpassward);
        const studentData=await registration.insertMany(takedata);
        console.log(studentData);
        res.render("homepage");
        
     }
     
     else{
        res.send("password are not matching try again ");
     }

    }catch(err){
        console.log(err);
    }
})
app.post("/login",async(req,res)=>{
    try{
        const UserName = req.body.UserName;
        const pwd1 = req.body.pwd;
         
        console.log(UserName);
        console.log(pwd1);
        const userData = await registration.findOne({UserName:UserName});
        console.log(userData);
        if(userData.Age == pwd1){
            res.render("homepage");
        }
        else{
            res.send("then password or email is not matching ")
        }
        

    }
    catch(err){
        console.log(err);
    }
})
app.get("*",(req,res)=>{
    res.render('404error');
       
});
app.listen(port,()=>{
    console.log(`listeniing to the port ${port}`);
});