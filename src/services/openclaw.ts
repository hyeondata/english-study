import type {
  ChildProfile, TutorPersonality, ChatMessage,
  LearningSession, FlashcardProgress, OpenClawRequest, OpenClawResponse,
} from '../types/index.js'

const OPENCLAW_BASE_URL = process.env.OPENCLAW_BASE_URL || 'https://gpu-ser8.tail1ac982.ts.net/'
const OPENCLAW_TIMEOUT = 10_000

async function callOpenClaw(request: OpenClawRequest): Promise<OpenClawResponse> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), OPENCLAW_TIMEOUT)

    const response = await fetch(`${OPENCLAW_BASE_URL}/openclaw/agent/tutor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENCLAW_API_KEY || ''}`,
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`OpenClaw returned ${response.status}`)
    }

    const data = await response.json() as Record<string, unknown>
    return { success: true, data, fallback: false }
  } catch (error) {
    console.error('[OpenClaw] Request failed, using fallback:', error)
    return { success: false, data: getFallback(request.agentType, request), fallback: true }
  }
}

// ─── Public API ───

export async function analyzePersonality(profile: ChildProfile): Promise<TutorPersonality> {
  const result = await callOpenClaw({
    agentType: 'personality_analysis',
    childProfile: profile,
    context: { step: 'onboarding' },
  })
  return result.data as unknown as TutorPersonality
}

export async function generateDialogue(
  profile: ChildProfile,
  personality: TutorPersonality,
  history: ChatMessage[],
  userMessage: string
): Promise<{ reply: string; suggestedFollowups: string[] }> {
  const result = await callOpenClaw({
    agentType: 'dialogue',
    childProfile: profile,
    tutorPersonality: personality,
    context: { conversationHistory: history, latestMessage: userMessage },
  })
  return result.data as unknown as { reply: string; suggestedFollowups: string[] }
}

export async function generateFeedback(
  profile: ChildProfile,
  personality: TutorPersonality,
  isCorrect: boolean,
  word: string
): Promise<string> {
  const result = await callOpenClaw({
    agentType: 'feedback',
    childProfile: profile,
    tutorPersonality: personality,
    context: { isCorrect, word },
  })
  return (result.data as { message: string }).message
}

export async function generateReport(
  profile: ChildProfile,
  session: LearningSession,
  progress: FlashcardProgress[]
): Promise<Partial<Record<string, unknown>>> {
  const result = await callOpenClaw({
    agentType: 'report',
    childProfile: profile,
    context: { session, progress },
  })
  return result.data
}

// ─── Fallback Responses ───

function getFallback(agentType: string, request: OpenClawRequest): Record<string, unknown> {
  const name = request.childProfile.name
  const traits = request.childProfile.personalityTraits || []

  switch (agentType) {
    case 'personality_analysis': {
      // Adapt personality based on traits
      let style = 'playful_friend'
      let tone = 'warm_and_fun'
      let level = 8
      let interaction = 'lots_of_praise'

      if (traits.includes('shy')) {
        style = 'gentle_guide'
        tone = 'warm_and_slow'
        level = 9
        interaction = 'patient_encourager'
      } else if (traits.includes('competitive')) {
        style = 'cheerful_coach'
        tone = 'energetic_and_fun'
        level = 7
        interaction = 'challenge_seeker'
      } else if (traits.includes('curious')) {
        style = 'explorer_friend'
        tone = 'exciting_and_curious'
        level = 8
        interaction = 'question_asker'
      }

      return {
        teacherStyle: style,
        tone,
        encouragementLevel: level,
        interactionStyle: interaction,
        greetingMessage: `Hi ${name}! I'm Quokka, your English buddy! Let's learn together!`,
      }
    }

    case 'dialogue': {
      const latestMessage = (request.context.latestMessage as string || '').toLowerCase()
      let reply = `That's interesting, ${name}! Tell me more!`
      const followups = ['Tell me more!', 'What else do you know?', "Let's learn a new word!"]

      if (latestMessage.includes('hello') || latestMessage.includes('hi') || latestMessage.includes('안녕')) {
        reply = `Hey ${name}! Great to see you! Ready to learn some English today?`
      } else if (latestMessage.includes('help') || latestMessage.includes('도와')) {
        reply = `Of course I'll help you, ${name}! What would you like to learn?`
      } else if (latestMessage.includes('word') || latestMessage.includes('단어')) {
        reply = `Let's learn a fun word! How about "wonderful"? It means something really great!`
      }

      return { reply, suggestedFollowups: followups }
    }

    case 'feedback': {
      const isCorrect = request.context.isCorrect as boolean
      const word = request.context.word as string

      if (isCorrect) {
        const praises = [
          `Amazing job, ${name}! You spelled "${word}" perfectly!`,
          `Wow, ${name}! You're a spelling superstar!`,
          `Yes! "${word}" is correct! Keep going, ${name}!`,
          `Fantastic, ${name}! You nailed it!`,
        ]
        return { message: praises[Math.floor(Math.random() * praises.length)] }
      } else {
        const encouragements = [
          `Good try, ${name}! Let's try again — you can do it!`,
          `Almost there, ${name}! Look at the hint and try once more!`,
          `Don't worry, ${name}! Learning takes practice!`,
        ]
        return { message: encouragements[Math.floor(Math.random() * encouragements.length)] }
      }
    }

    case 'report':
      return {
        strengths: ['Consistent practice', 'Growing vocabulary', 'Good effort!'],
        suggestions: ['Try practicing 10 minutes daily', 'Review difficult words before bed', 'Try the typing game more often'],
      }

    case 'level_test':
      return { message: `Great effort on the test, ${name}!` }

    default:
      return { message: `Keep learning, ${name}! You're doing great!` }
  }
}
