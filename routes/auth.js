const express = require('express')
const router = express.Router();
const passport = require('passport')
//Auth with google | /auth/google | Google
router.get('/google', passport.authenticate('google',{scope:['profile']}))//basically we are just asking for the data related to profile



//Google auth callback | /auth/google/callback | GET
router.get('/google/callback', passport.authenticate('google',{failureRedirect:'/'}), (req,res)=>{
    res.redirect('/dashboard')
})

//Logout user | /auth/logout | GET
router.get('/logout',(req, res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router;