const express = require('express')
const router = express.Router()

const Post = require('../models/post')
const User = require('../models/user')
const verifyToken = require('../middleware/auth')

// @route GET /api/posts
// @desc Get all user's posts
// @access Private
router.get('/', verifyToken, async(req, res) => {
    const userId = req.userId

    try {
        const posts = await Post.find({
            user: userId
        }).populate('user', ['username'])
        res.json({
            success: true,
            posts: posts
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// @route POST /api/posts/create
// @desc Create post
// @access private
router.post('/create', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body

	// validation
	if (!title) {
		return res.status(400).json({
			success: false,
			message: 'Post title is Invalid',
		})
	}

	try {
		const newPost = Post({
			title,
			description,
			url: url.startsWith('https://') ? url : `https://${url}`,
			status: status || 'TO-LEARN',
			user: req.userId,
		})

		await newPost.save()
		res.json({
			success: true,
			message: `Post ${newPost.title} created successful`,
			post: newPost,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

// @route PUT /api/posts/:id
// @desc Update post
// @access private
router.put('/:id', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body

	// validation
	if (!title) {
		return res.status(400).json({
			success: false,
			message: 'Post title is Invalid',
		})
	}

	const postUpdateCondition = {
		_id: req.params.id,
		user: req.userId,
	}

	try {
		let updatedPost = {
			title,
			description,
			url: url.startsWith('https://') ? url : `https://${url}`,
			status: status || 'TO-LEARN',
			user: req.userId,
		}

		updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{
				new: true,
			}
		)

		if (!updatedPost) {
			return res.status(401).json({
				success: false,
				message: 'Post not found',
			})
		}

		res.json({
			success: true,
			message: `Post ${updatedPost.title} update successful`,
			post: updatedPost,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

// @route DELTELE /api/posts/:id
// @desc Delete post
// @access private
router.delete('/:id', verifyToken, async (req, res) => {
	const postId = req.params.id
	const deletedPostCondition = {
		_id: req.params.id,
		user: req.userId,
	}

	try {
		let deletedPost = await Post.findOneAndDelete(deletedPostCondition)

		if (!deletedPost) {
			return res.status(401).json({
				success: false,
				message: 'Post not found or User not authorized',
			})
		}

		res.json({
			success: true,
			message: `Post ${deletedPost.title} was deleted`,
			post: deletedPost,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

module.exports = router