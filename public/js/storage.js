// QuokkaTutor — localStorage wrapper
const KEYS = {
  CHILD_PROFILE: 'quokka_child_profile',
  TUTOR_PERSONALITY: 'quokka_tutor_personality',
  FLASHCARD_PROGRESS: 'quokka_flashcard_progress',
  LEARNING_SESSION: 'quokka_learning_session',
  CHAT_HISTORY: 'quokka_chat_history',
}

const QuokkaStorage = {
  // Profile
  getProfile() {
    return JSON.parse(localStorage.getItem(KEYS.CHILD_PROFILE) || 'null')
  },
  setProfile(profile) {
    localStorage.setItem(KEYS.CHILD_PROFILE, JSON.stringify(profile))
  },

  // Tutor Personality
  getPersonality() {
    return JSON.parse(localStorage.getItem(KEYS.TUTOR_PERSONALITY) || 'null')
  },
  setPersonality(personality) {
    localStorage.setItem(KEYS.TUTOR_PERSONALITY, JSON.stringify(personality))
  },

  // Flashcard Progress
  getFlashcardProgress() {
    return JSON.parse(localStorage.getItem(KEYS.FLASHCARD_PROGRESS) || '{}')
  },
  setFlashcardProgress(progress) {
    localStorage.setItem(KEYS.FLASHCARD_PROGRESS, JSON.stringify(progress))
  },
  updateWordProgress(wordId, correct) {
    const all = this.getFlashcardProgress()
    if (!all[wordId]) {
      all[wordId] = { wordId, correct: 0, incorrect: 0, lastSeen: '', mastered: false }
    }
    if (correct) {
      all[wordId].correct++
    } else {
      all[wordId].incorrect++
    }
    all[wordId].lastSeen = new Date().toISOString()
    all[wordId].mastered = all[wordId].correct >= 3
    this.setFlashcardProgress(all)
    return all[wordId]
  },

  // Learning Session
  getSession() {
    return JSON.parse(localStorage.getItem(KEYS.LEARNING_SESSION) || 'null')
  },
  startSession() {
    const profile = this.getProfile()
    const session = {
      id: 'session_' + Date.now(),
      childProfileId: profile?.id || '',
      startTime: new Date().toISOString(),
      flashcardsReviewed: 0,
      typingWordsAttempted: 0,
      chatMessagesCount: 0,
      accuracy: 0,
    }
    localStorage.setItem(KEYS.LEARNING_SESSION, JSON.stringify(session))
    return session
  },
  updateSession(updates) {
    const session = this.getSession()
    if (session) {
      Object.assign(session, updates)
      localStorage.setItem(KEYS.LEARNING_SESSION, JSON.stringify(session))
    }
    return session
  },

  // Chat History
  getChatHistory() {
    return JSON.parse(localStorage.getItem(KEYS.CHAT_HISTORY) || '[]')
  },
  addChatMessage(role, content) {
    const history = this.getChatHistory()
    history.push({ role, content, timestamp: new Date().toISOString() })
    localStorage.setItem(KEYS.CHAT_HISTORY, JSON.stringify(history))
    return history
  },
  clearChatHistory() {
    localStorage.setItem(KEYS.CHAT_HISTORY, '[]')
  },

  // Auth gate
  requireProfile() {
    if (!this.getProfile()) {
      window.location.href = '/onboarding'
      return false
    }
    return true
  },

  // Reset all
  clearAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k))
  },
}
