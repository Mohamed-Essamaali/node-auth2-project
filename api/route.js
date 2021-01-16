
// "password":"abc12345",

const express = require('express')
const Users = require('./model')
const bcrypt = require('bcryptjs')
const router = express.Router()
router.use(express.json())

const authError = 'Invalid credentials'

router.get('/users', async (req,res,next)=>{
    try{
        const users = await Users.find()
        res.status(200).json(users)
    }
    catch(err){next(err)}
  
})

router.post('/users/register', async (req,res,next)=>{
    try{
    const {username,password,department} = req.body

        const user = await Users.findBy({username}).first()
        if(user){
            return res.status(409).json({message: `{user.username} is already taken`})
        }

        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password,12),
            department
        })
       
        res.status(200).json(newUser)
    }
    catch(err){next(err)}
  
})

router.post('/users/login', async (req,res,next)=>{
    try{
    const {username,password} = req.body

        const user = await Users.findBy({username}).first()
        if(!user){
            return res.status(409).json({message: authError})
        }

        const validatePassword = await bcrypt.compare(password,user.password)
        if(!validatePassword){
            return res.status(401).json({message: authError})
        }
       
        res.status(200).json(`welcome ${user.username} !`)
    }
    catch(err){next(err)}
  
})




module.exports = router