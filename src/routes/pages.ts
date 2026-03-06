import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = Router()

const componentsDir = path.join(__dirname, '..', '..', 'components')

const servePage = (filename: string) => (_req: unknown, res: { sendFile: (p: string) => void }) => {
  res.sendFile(path.join(componentsDir, filename))
}

router.get('/', servePage('home.htm'))
router.get('/onboarding', servePage('onboarding.htm'))
router.get('/learn', servePage('learn.htm'))
router.get('/flashcard', servePage('flashcard.htm'))
router.get('/typing', servePage('typing.htm'))
router.get('/chat', servePage('chat.htm'))
router.get('/report', servePage('report.htm'))
router.get('/about', servePage('about.htm'))
router.get('/level-test', servePage('level-test.htm'))
router.get('/level-result', servePage('level-result.htm'))

router.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default router
