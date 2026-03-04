import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import pagesRouter from './routes/pages.js'
import onboardingRouter from './routes/onboarding.js'
import flashcardsRouter from './routes/flashcards.js'
import typingRouter from './routes/typing.js'
import chatRouter from './routes/chat.js'
import reportRouter from './routes/report.js'
import { errorHandler } from './middleware/error-handler.js'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

// API routes
app.use('/api', onboardingRouter)
app.use('/api', flashcardsRouter)
app.use('/api', typingRouter)
app.use('/api', chatRouter)
app.use('/api', reportRouter)

// Page routes
app.use('/', pagesRouter)

// Error handler
app.use(errorHandler)

export default app
