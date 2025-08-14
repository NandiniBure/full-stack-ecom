const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
   
    try {
        console.log('Received registration request:', { name, email, password });
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        await user.save();
        
        // res.status(201).json({
        //     message: 'User registered successfully',
        //     user: {
        //         id: user._id,
        //         name: user.name,
        //         email: user.email,
        //         role: user.role
        //     }
        // });

        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };

        jwt.sign(payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '40h' }, 
            (err, token) => {
                if (err) throw err;
                res.status(201).json({
                    message: 'User registered successfully',
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                });
            }
        );

    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        console.log('Received login request:', { email, password });
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    

        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };

        jwt.sign(payload,
            process.env.JWT_SECRET,
            { expiresIn: '40h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    message: 'User registered successfully',
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                });
            }
        );

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
})


router.get('/profile',protect ,async (req, res) => {
    
})


module.exports = router;