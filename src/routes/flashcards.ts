import { Router } from 'express'
import type { Request, Response } from 'express'
import { getFlashcards } from '../services/flashcard-data.js'

const router = Router()

router.get('/flashcards', (req: Request, res: Response) => {
  const { category, difficulty, limit } = req.query
  const words = getFlashcards({
    category: category as string | undefined,
    difficulty: difficulty as string | undefined,
    limit: limit ? Number(limit) : 10,
  })
  res.json({ words })
})

router.post('/flashcards/progress', (req: Request, res: Response) => {
  const { progress } = req.body
  // MVP: progress is stored client-side in localStorage
  // Server just acknowledges and returns next recommended words
  const nextWords = getFlashcards({ limit: 5 })
  res.json({ saved: true, nextRecommended: nextWords })
})

export default router
