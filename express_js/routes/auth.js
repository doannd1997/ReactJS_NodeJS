const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require("../models/user")
const verifyToken = require('../middleware/auth')

// @route POST /api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
	const username = req.body.username
	const password = req.body.password

	if (!username || !password) {
		return res.status(400).json({
			success: false,
			message: 'missing username or password',
		})
	}

	try {
		// check for existing user
		const user = await User.findOne({ username: username })
		if (user)
			return res.status(400).json({
				success: false,
				message: 'username already exists',
			})

		// hash password
		hashedPassword = await argon2.hash(password)
		const newUser = new User({
			username: username,
			password: hashedPassword,
		})
		await newUser.save()

		// return token
		const accessToken = jwt.sign(
			{
				userId: newUser._id,
			},
			process.env.ACCESS_TOKEN_SECRET
		)
		res.status(200).json({
			success: true,
			message: 'Register Successful',
			accessToken: accessToken,
		})
	} catch (error) {
		res.status(500).json({
			status: false,
			message: 'Register Fail due to internal Server error',
			error: error.message,
		})
	}
})

// @route POST /api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	if (!username && !password) {
		return res.status(400).json({
			status: false,
			message: 'username or password is invalid',
		})
	}

	try {
		const user = await User.findOne({
			username: username,
		})
		if (!user) {
			return res.status(400).json({
				status: false,
				message: 'username not found',
			})
		}

		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid) {
			return res.status(400).json({
				status: false,
				message: 'password is invalid',
			})
		}

		// all good
		const accessToken = jwt.sign(
			{
				userId: user._id,
			},
			process.env.ACCESS_TOKEN_SECRET
		)
		res.status(200).json({
			success: true,
			message: 'Login Successful',
			accessToken: accessToken,
		})
	} catch (error) {
		res.status(400).json({
			status: false,
			message: error.message,
		})
	}
})

// @route GET /api/auth
// @desc Verify Access Token
// @access public
router.get('/', verifyToken, async (req, res) => {
	const us = await User.find()
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'User not found',
			})
		}
		return res.json({
			success: true,
			user: user,
		})
	} catch (error) {
		res.json(500).json({
			success: fasle,
			message: error.message,
		})
	}
})

module.exports = router