// ─── Child Profile ───
export interface ChildProfile {
  id: string
  name: string
  age: number
  personalityTraits: string[]
  favoriteAnimals: string[]
  learningGoal: string
  createdAt: string
}

// ─── AI Personality ───
export interface TutorPersonality {
  teacherStyle: string
  tone: string
  encouragementLevel: number
  interactionStyle: string
  greetingMessage: string
}

// ─── Flashcard ───
export interface FlashcardWord {
  id: string
  english: string
  korean: string
  explanation: string
  exampleSentence: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

export interface FlashcardProgress {
  wordId: string
  correct: number
  incorrect: number
  lastSeen: string
  mastered: boolean
}

// ─── Typing Game ───
export interface TypingCheckRequest {
  wordId: string
  typed: string
  attemptNumber: number
}

export interface TypingCheckResponse {
  correct: boolean
  hint?: string
  aiFeedback: string
  revealAnswer: boolean
}

// ─── Chat ───
export interface ChatMessage {
  role: 'user' | 'tutor'
  content: string
  timestamp: string
}

export interface ChatRequest {
  childProfileId: string
  message: string
  conversationHistory: ChatMessage[]
  childProfile: ChildProfile
  tutorPersonality: TutorPersonality
}

export interface ChatResponse {
  reply: string
  suggestedFollowups?: string[]
}

// ─── Learning Session ───
export interface LearningSession {
  id: string
  childProfileId: string
  startTime: string
  endTime?: string
  flashcardsReviewed: number
  typingWordsAttempted: number
  chatMessagesCount: number
  accuracy: number
}

// ─── Parent Report ───
export interface ParentReport {
  sessionId: string
  childName: string
  totalLearningMinutes: number
  wordsLearned: number
  totalAccuracy: number
  difficultWords: FlashcardWord[]
  strengths: string[]
  suggestions: string[]
  generatedAt: string
}

// ─── OpenClaw ───
export interface OpenClawRequest {
  agentType: 'personality_analysis' | 'dialogue' | 'feedback' | 'report'
  childProfile: ChildProfile
  tutorPersonality?: TutorPersonality
  context: Record<string, unknown>
}

export interface OpenClawResponse {
  success: boolean
  data: Record<string, unknown>
  fallback: boolean
}
