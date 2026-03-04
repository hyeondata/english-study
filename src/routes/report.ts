import { Router } from 'express'
import type { Request, Response } from 'express'
import { generateReport } from '../services/openclaw.js'
import type { ParentReport } from '../types/index.js'

const router = Router()

router.post('/report/generate', async (req: Request, res: Response) => {
  try {
    const { childProfile, session, flashcardProgress } = req.body

    if (!childProfile || !session) {
      res.status(400).json({ error: 'Child profile and session data are required' })
      return
    }

    const progressArray = flashcardProgress
      ? Object.values(flashcardProgress)
      : []

    const aiInsights = await generateReport(childProfile, session, progressArray as any[])

    const report: ParentReport = {
      sessionId: session.id,
      childName: childProfile.name,
      totalLearningMinutes: Math.round(
        (new Date(session.endTime || Date.now()).getTime() - new Date(session.startTime).getTime()) / 60000
      ),
      wordsLearned: session.flashcardsReviewed || 0,
      totalAccuracy: session.accuracy || 0,
      difficultWords: [],
      strengths: (aiInsights as any).strengths || [],
      suggestions: (aiInsights as any).suggestions || [],
      generatedAt: new Date().toISOString(),
    }

    res.json(report)
  } catch (err) {
    console.error('[Report]', err)
    res.status(500).json({ error: 'Failed to generate report' })
  }
})

export default router
