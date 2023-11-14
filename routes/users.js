const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.post('/register',async(req,res)=>{
    
    const {username,email,password} = req.body;
    
    try{
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser){
            return (res.status(400).json({error: "Username or email already exists"}));
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            roles: ["Buyer"],
        });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'An error occured'});
    }
});


router.post('/login',async (req,res)=>{
    const {username,password} = req.body;

    try{
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({error: 'Invalid Login'});
        }

        const passwordMatch = await bcrypt.compare(password,user.password);

        if(!passwordMatch){
            return res.status(401).json({error : 'Invalid Login'});
        }

        res.status(200).json({
            message : 'User authenticated',
            roles: user.roles,
        });
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'An error occured'});
    }
})




// Update username
router.patch('/update', async (req, res) => {
    const { username, newUsername } = req.body;
  
    // Check if the new username already exists
    const existingUser = await User.findOne({ username: newUsername });

    // If the new username already exists, return an error
    if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
    }

    try {
        // Find and update the user based on the current username
        const updatedUser = await User.findOneAndUpdate({ username }, { username: newUsername }, { new: true });
  
        // If the user is not found, return an error
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the updated user
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ error: 'An error occurred while updating username' });
    }
});

  
  // Delete account
router.delete('/delete', async (req, res) => {
    const { username } = req.body;
  
    try {
      // Find and delete the user based on the current username
      await User.findOneAndDelete({ username });
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ error: 'An error occurred while deleting account' });
    }
  });




module.exports = router;