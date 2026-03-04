import { Router } from 'express'
import type { Request, Response } from 'express'
import { generateDialogue } from '../services/openclaw.js'

const router = Router()

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { childProfile, tutorPersonality, message, conversationHistory } = req.body

    if (!message) {
      res.status(400).json({ error: 'Message is required' })
      return
    }

    const result = await generateDialogue(
      childProfile,
      tutorPersonality,
      conversationHistory || [],
      message
    )

    res.json(result)
  } catch (err) {
    console.error('[Chat]', err)
    res.status(500).json({ error: 'Failed to generate chat response' })
  }
})

export default router
