import { Router } from 'express'
import type { Request, Response } from 'express'
import { getLevelTestQuestions, scoreTest } from '../services/level-test-data.js'

const router = Router()

router.get('/level-test/questions', (_req: Request, res: Response) => {
  const questions = getLevelTestQuestions()
  res.json({ questions })
})

router.post('/level-test/submit', (req: Request, res: Response) => {
  const { answers } = req.body as { answers: { questionId: string; selectedOptionId: string }[] }

  if (!answers || !Array.isArray(answers)) {
    res.status(400).json({ error: 'answers array is required' })
    return
  }

  const result = scoreTest(answers)
  res.json(result)
})

export default router
