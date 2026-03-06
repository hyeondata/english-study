import { Router } from 'express'
import type { Request, Response } from 'express'
import { getPhonicsRecommendations } from '../services/phonics-data.js'

const router = Router()

router.get('/phonics/recommendations', (req: Request, res: Response) => {
  const level = parseInt(req.query.level as string, 10)

  if (isNaN(level) || level < 1 || level > 10) {
    res.status(400).json({ error: 'level must be 1-10' })
    return
  }

  const videos = getPhonicsRecommendations(level)
  res.json({ videos })
})

export default router
