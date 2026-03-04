import { Router } from 'express'
import type { Request, Response } from 'express'
import { getWordById } from '../services/flashcard-data.js'
import { generateHint } from '../services/hint-generator.js'
import { generateFeedback } from '../services/openclaw.js'
import type { TypingCheckResponse } from '../types/index.js'

const router = Router()

router.post('/typing/check', async (req: Request, res: Response) => {
  try {
    const { wordId, typed, attemptNumber, childProfile, tutorPersonality } = req.body

    const word = getWordById(wordId)
    if (!word) {
      res.status(404).json({ error: 'Word not found' })
      return
    }

    const isCorrect = typed.trim().toLowerCase() === word.english.toLowerCase()

    let hint: string | undefined
    let revealAnswer = false

    if (!isCorrect) {
      if (attemptNumber >= 3) {
        revealAnswer = true
      } else {
        hint = generateHint(word.english, attemptNumber)
      }
    }

    const aiFeedback = await generateFeedback(
      childProfile,
      tutorPersonality,
      isCorrect,
      word.english
    )

    const response: TypingCheckResponse = {
      correct: isCorrect,
      hint,
      aiFeedback,
      revealAnswer,
    }

    res.json(response)
  } catch (err) {
    console.error('[Typing]', err)
    res.status(500).json({ error: 'Failed to check typing' })
  }
})

export default router
