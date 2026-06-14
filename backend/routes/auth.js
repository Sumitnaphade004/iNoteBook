const express = require('express');
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Sumit_45"

// ROUTE 1: Create a user using: POST "/api/auth/createUser". Doesn't require auth
router.post('/createUser',[ 
    body("name","Enter the valid name").isLength({ min:3}),
    body("email","Enter the valid name").isEmail(),
    body("password","Password must be contain atleast 5 characters").isLength({ min:5}),
],async (req,res)=>{
    let success = false;
    // If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Check wheather the user with same email is exists already
    try{
        success= false;
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email is already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

        //Create a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
         
        
        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)  
        success= true;
        res.json({success:true, authToken})
        // res.json(user)

        // .then(user=> res.json(user))
        //     .catch(err=>{console.log(err)
        //         res.json({error: "Please enter the unique values" , message: err.message    })
        // })
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})



// ROUTE 2: Authenticate a User using: POST "api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});




// ROUTE 3: Get logedin user details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req,res)=>{ 
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }

})

module.exports = router; 