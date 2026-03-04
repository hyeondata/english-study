import { Router } from 'express'
import type { Request, Response } from 'express'
import { analyzePersonality } from '../services/openclaw.js'
import type { ChildProfile } from '../types/index.js'

const router = Router()

router.post('/onboarding', async (req: Request, res: Response) => {
  try {
    const { name, age, personalityTraits, favoriteAnimals, learningGoal } = req.body

    if (!name || !age) {
      res.status(400).json({ error: 'Name and age are required' })
      return
    }

    const profile: ChildProfile = {
      id: 'child_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      name,
      age: Number(age),
      personalityTraits: personalityTraits || [],
      favoriteAnimals: favoriteAnimals || [],
      learningGoal: learningGoal || 'basic_vocabulary',
      createdAt: new Date().toISOString(),
    }

    const personality = await analyzePersonality(profile)

    res.json({ profile, personality })
  } catch (err) {
    console.error('[Onboarding]', err)
    res.status(500).json({ error: 'Failed to process onboarding' })
  }
})

export default router
