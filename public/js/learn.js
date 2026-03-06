// Gate: require profile + level
if (!QuokkaStorage.requireLevel()) {
  // redirect happens inside requireLevel
}

const profile = QuokkaStorage.getProfile()
const personality = QuokkaStorage.getPersonality()
const levelData = QuokkaStorage.getLevel()

// Nav name badge
document.getElementById('nav-name').textContent = profile.name

// Greeting
const greetingText = document.getElementById('greeting-text')
const greetingSub = document.getElementById('greeting-sub')

if (personality && personality.greetingMessage) {
  greetingText.textContent = personality.greetingMessage
} else {
  greetingText.textContent = `Hi ${profile.name}! Ready to learn?`
}
greetingSub.textContent = "Let's have fun learning English today!"

// Stats from localStorage
const progress = QuokkaStorage.getFlashcardProgress()
const session = QuokkaStorage.getSession()

const wordsLearned = Object.values(progress).filter(p => p.mastered).length
const totalAttempts = Object.values(progress).reduce((sum, p) => sum + p.correct + p.incorrect, 0)
const correctAttempts = Object.values(progress).reduce((sum, p) => sum + p.correct, 0)
const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0

document.getElementById('stat-words').textContent = wordsLearned
document.getElementById('stat-accuracy').textContent = accuracy + '%'

// Simple streak: count days with activity (simplified for MVP)
const streak = session ? 1 : 0
document.getElementById('stat-streak').textContent = streak

// Level badge
if (levelData) {
  document.getElementById('level-display').textContent = 'Lv. ' + levelData.level
}

// Ensure session exists
if (!session) {
  QuokkaStorage.startSession()
}

function resetProfile() {
  if (confirm('프로필을 초기화하면 모든 학습 데이터가 삭제됩니다. 계속하시겠습니까?')) {
    QuokkaStorage.clearAll()
    window.location.href = '/onboarding'
  }
}
