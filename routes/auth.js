const express = require("express");
const User = require("../models/User");
const {body, validationResult} = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchuser");

require('dotenv').config();
// const JWT_SECRET = "thisIsJustAHackathon";

let success = true

//Temporary Data Storage
// router.get("/", (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
//     const user = User(req.body);
//     user.save();
// });

//Define a POST route to create a user
router.post("/createuser", 
    [
        body("name").isLength({min: 3}),
        body("email").isEmail(),
        body("password").isLength({min: 5}),
    ],
    async(req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            success = false;
            return res.status(400).json({success, errors: errors.array()});
        }

        try{
            let user = await User.findOne({email: req.body.email})
            if (user)
            {
                success = false

                return res.status(400).json({success, errors: `Account Already Exists!!!`});
            }

            const salt = await bcrypt.genSalt(11);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            success=true
            res.json({success, authToken});
        }   catch (error)   {
            console.error(error);
            res.status(500).send(`Internal Server Error!!!`);
        }
    }
);


// Define a POST route to login a user
router.post("/login", 
    [
        body("email").isEmail(),
        body("password").isLength({min: 5}),
    ], async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            success = false
            return res.status(400).json({success, errors: errors.array()});
        }

        const {email, password} = req.body;
        
        try{
            let user = await User.findOne({email: req.body.email})

            if (!user)
            {
                return res.status(400).json(`Incorrect Details`)
            }
            const passwordComparison = await bcrypt.compare(password, user.password);

            if (!passwordComparison)
            {
                return res.status(400).json({error: `incorrect Details!`});
            }

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authToken = jwt.sign(data, process.env.JWT_SECRET);

            res.json({success: authToken});
        }   catch(error)    {
            console.error(error);
            res.status(500).send(`Internal Server Error!!!`);
        }
    }
);

// Define a DELETE route to delete a user by ID
router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Find the user by ID and delete it
      const deletedUser = await User.findByIdAndRemove(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  // Define a PUT route to edit user details by ID
router.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedFields = req.body;
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update only the fields that are present in the request body
      for (const field in updatedFields) {
        if (updatedFields.hasOwnProperty(field)) {
          user[field] = updatedFields[field];
        }
      }

      // Save the updated user
      const updatedUser = await user.save();
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

  });

module.exports = router;