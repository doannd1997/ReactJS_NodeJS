require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mcial.mongodb.net/project_0?retryWrites=true&w=majority`,
			{
				// useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				// useFindAndModify: false
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth/', authRouter)
app.use('/api/posts/', postRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})