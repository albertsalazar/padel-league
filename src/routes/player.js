
const router = require('express').Router();
const Player = require('../models/Player');

router.get('/players/signIn', (req,res) =>{
    res.render('players/signIn');
});
router.get('/players/signUp', (req,res) =>{
    res.render('players/signUp');
});
router.get('/',(req,res) =>{
    res.render('/')
})

router.post('/players/signUp', async(req,res) =>{
   const{name,email,phone,category,password,passwordConfirmation} = req.body;
   const errors = [];
   const messages = [];
   if(name ==""){
       errors.push({text : 'Introduce your name '})
   }
   if(email ==""){
    errors.push({text : 'Introduce your email '})
    }
    if(password==""){
        errors.push({text : 'Introduce a password '})
    }else if(password.length<6){
        errors.push({text : 'Password is to much weak '})
    }
    if(passwordConfirmation==""){
        errors.push({text : 'Please confirm your password'})
    }
    if(password.length>0 && passwordConfirmation.length>0 && password!=passwordConfirmation){
        errors.push({text : 'Password confirmation does not match password'})
    }

   if(password !=passwordConfirmation ){
    errors.push({text:'Password should match'});
   }
   if(errors.length>0){
       res.render('players/signUp',{errors,name,email,phone,category,password,passwordConfirmation});
   }else{
       const newPlayer= new Player({name,email,phone,category,password});
       newPlayer.password = await newPlayer.encryptPassword(password);
       await newPlayer.save();
       messages.push({text: 'Player created'});
       res.render('index', {messages});
   }
  
});
module.exports = router;