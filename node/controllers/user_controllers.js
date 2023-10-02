const User = require('../models/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwt_secret = process.env.JWT_KEY
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zelalemtigist21@gmail.com',
        pass: process.env.email_password,
    },
});

const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    try {
        const userCount = await User.countDocuments({})
        let role = 'user'
        if (userCount === 0) {
            role = 'admin'
        }

        const verificationToken = crypto.randomBytes(16).toString('hex');

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt).catch((err) => {
            throw new Error(err)
        })
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'user already found' })
        }

        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
            verificationToken,
            isVerified: false

        })

        await user.save()

        const verificationLink = `http://localhost:5000/users/verify?token=${verificationToken}`;
        const mailOptions = {
            from: 'zelalemtigist21@gmail.com',
            to: email,
            subject: 'Account verification',
            text: `Click on the following link to verify you account: ${verificationLink}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error)
                res.status(500).json({ message: 'Email could not be sent' })
            } else {
                console.log('Email sent:', info.response)
                res.status(201).json({ message: 'User created successfully' })

            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const verifyEmail = async (req, res) => {
    const token = req.query.token

    try {
        const user = await User.findOneAndUpdate({ verificationToken: token })

        if (!user) {
            return res.statud(400).json({ message: 'Invalid verification token' })

        };

        console.log(user)

        user.isVerified = true
        user.verificationToken = undefined
        await user.save()

        res.status(200).json({ message: 'email verified successfuly' });


    } catch (error) {
        console.log('Error verifying email:', error)
        res.status(500).json({ message: 'internal server error' })
    }
}


const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'user not found' })

        }

        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'invalid credentials' })
        }

        const token = jwt.sign({
            email: user.email,
            id: user.id,
            role: user.role
        },
            jwt_secret,
            {
                expiresIn: '7d'
            }
        );
        res.status(200).json({ message: 'signin successfully', token: token, user })
        console.log('signed in');


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const forgetPasswordEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000;

        // Log the email you're searching for
        console.log('Searching for user with email:', email);

        const user = await User.findOne({ email });

        if (!user) {
            // Log the email if the user is not found
            console.log('User not found for email:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the user's email and reset token
        console.log('Found user with email:', user.email);
        console.log('Generated reset token:', resetToken);

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;

        await user.save();

        const resetLink = `http://localhost:5000/users/resetPassword?token=${resetToken}`;

        const mailOptions = {
            from: 'zelalemtigist21@gmail.com',
            to: email,
            subject: 'Reset your password',
            text: `Click on the following link to reset your password: ${resetLink}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully', info.response);

        res.status(200).json({ message: 'Reset password email sent successfully', resetToken });
    } catch (error) {
        console.error('Error in forgetPasswordEmail:', error);
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { email, password, token } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user || user.resetToken !== token) {
            return res.status(400).json({ message: 'Invalid reset token' })

        }

        if (user.resetTokenExpiration < Date.now() + 3600000) {
            res.status(400).json({ message: 'Reset token has expired' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword
        user.resetToken = null
        user.resetTokenExpiration = null

        await user.save()

        accessToken = jwt.sign({ userId: user.id }, jwt_secret)
        res.status(200).json({ message: 'Password reset successufuly', accessToken })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })

    }
}

module.exports = {
    signup,
    signin,
    forgetPasswordEmail,
    resetPassword,
    verifyEmail,

}

