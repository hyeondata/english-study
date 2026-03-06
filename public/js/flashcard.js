if (!QuokkaStorage.requireLevel()) { /* redirect */ }

const profile = QuokkaStorage.getProfile()
const levelData = QuokkaStorage.getLevel()
document.getElementById('nav-name').textContent = profile.name

let words = []
let currentIndex = 0
let correctCount = 0
let isFlipped = false
let currentCategory = ''

// Fetch flashcards
function getLevelDifficulty() {
  if (!levelData) return ''
  const lvl = levelData.level
  if (lvl <= 3) return 'easy'
  if (lvl <= 6) return 'easy,medium'
  return ''
}

async function loadFlashcards(category) {
  currentCategory = category || ''
  const params = new URLSearchParams({ limit: '10' })
  if (category) params.set('category', category)
  const diff = getLevelDifficulty()
  if (diff) params.set('difficulty', diff)

  try {
    const res = await fetch('/api/flashcards?' + params)
    const data = await res.json()
    words = data.words
    currentIndex = 0
    correctCount = 0
    isFlipped = false
    document.getElementById('completion-state').classList.add('hidden')
    document.getElementById('flashcard').parentElement.style.display = ''
    document.getElementById('action-buttons').style.display = 'none'
    showCard()
  } catch (err) {
    console.error('Failed to load flashcards:', err)
  }
}

// Load categories into filter
async function loadCategories() {
  try {
    const res = await fetch('/api/flashcards?limit=100')
    const data = await res.json()
    const categories = [...new Set(data.words.map(w => w.category))]
    const container = document.getElementById('category-filter')

    categories.forEach(cat => {
      const btn = document.createElement('button')
      btn.className = 'chip'
      btn.dataset.category = cat
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1)
      btn.addEventListener('click', () => {
        container.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'))
        btn.classList.add('selected')
        loadFlashcards(cat)
      })
      container.appendChild(btn)
    })

    // "All" button handler
    container.querySelector('[data-category=""]').addEventListener('click', () => {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'))
      container.querySelector('[data-category=""]').classList.add('selected')
      loadFlashcards('')
    })
  } catch (err) {
    console.error(err)
  }
}

function showCard() {
  if (currentIndex >= words.length) {
    showCompletion()
    return
  }

  const word = words[currentIndex]
  document.getElementById('card-english').textContent = word.english
  document.getElementById('card-korean').textContent = word.korean
  document.getElementById('card-explanation').textContent = word.explanation
  document.getElementById('card-example').textContent = '"' + word.exampleSentence + '"'
  document.getElementById('card-difficulty').textContent =
    word.difficulty === 'easy' ? 'Easy' : word.difficulty === 'medium' ? 'Medium' : 'Hard'

  // Reset flip
  const card = document.getElementById('flashcard')
  card.classList.remove('flipped')
  isFlipped = false
  document.getElementById('action-buttons').style.display = 'none'

  // Update progress
  updateProgress()
  updateSpeech()
}

function flipCard() {
  const card = document.getElementById('flashcard')
  isFlipped = !isFlipped
  card.classList.toggle('flipped')

  if (isFlipped) {
    document.getElementById('action-buttons').style.display = 'flex'
  } else {
    document.getElementById('action-buttons').style.display = 'none'
  }
}

function markAnswer(correct) {
  const word = words[currentIndex]
  QuokkaStorage.updateWordProgress(word.id, correct)

  if (correct) {
    correctCount++
    document.getElementById('mascot-speech').textContent = 'Great job! 👏'
  } else {
    document.getElementById('mascot-speech').textContent = "That's okay! You'll get it next time!"
  }

  // Update session
  const session = QuokkaStorage.getSession()
  if (session) {
    const totalReviewed = (session.flashcardsReviewed || 0) + 1
    QuokkaStorage.updateSession({
      flashcardsReviewed: totalReviewed,
      accuracy: Math.round((correctCount / totalReviewed) * 100),
    })
  }

  document.getElementById('score-badge').textContent = correctCount + ' correct'
  currentIndex++
  setTimeout(showCard, 400)
}

function updateProgress() {
  const total = words.length
  const pct = Math.round(((currentIndex + 1) / total) * 100)
  document.getElementById('progress-fill').style.width = pct + '%'
  document.getElementById('progress-label').textContent = (currentIndex + 1) + ' / ' + total
}

function updateSpeech() {
  const messages = [
    'Click the card to flip it!',
    "What does this word mean? Let's find out!",
    'Take your time and think about it!',
    "You're doing great! Keep going!",
  ]
  if (currentIndex === 0) {
    document.getElementById('mascot-speech').textContent = messages[0]
  }
}

function showCompletion() {
  document.getElementById('flashcard').parentElement.style.display = 'none'
  document.getElementById('action-buttons').style.display = 'none'
  document.getElementById('mascot-area').style.display = 'none'
  const comp = document.getElementById('completion-state')
  comp.classList.remove('hidden')
  document.getElementById('completion-text').textContent =
    words.length + '개 카드 중 ' + correctCount + '개를 맞혔어요!'
}

function restartCards() {
  document.getElementById('mascot-area').style.display = ''
  loadFlashcards(currentCategory)
}

// Click/Space to flip
document.getElementById('flashcard').addEventListener('click', flipCard)
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault()
    flipCard()
  }
})

// Init
loadCategories()
loadFlashcards('')
