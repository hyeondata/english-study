if (!QuokkaStorage.requireProfile()) { /* redirect */ }

const profile = QuokkaStorage.getProfile()
const personality = QuokkaStorage.getPersonality()
document.getElementById('nav-name').textContent = profile.name

let words = []
let currentIndex = 0
let score = 0
let attemptNumber = 1

async function loadWords() {
  try {
    const res = await fetch('/api/flashcards?limit=10')
    const data = await res.json()
    words = data.words
    currentIndex = 0
    score = 0
    attemptNumber = 1
    document.getElementById('completion-state').classList.add('hidden')
    document.getElementById('prompt-area').style.display = ''
    document.querySelector('.typing-input-area').style.display = ''
    document.getElementById('btn-check').style.display = ''
    showWord()
  } catch (err) {
    console.error('Failed to load words:', err)
  }
}

function showWord() {
  if (currentIndex >= words.length) {
    showCompletion()
    return
  }

  const word = words[currentIndex]
  document.getElementById('word-display').textContent = word.korean
  document.getElementById('word-korean').textContent = word.exampleSentence
  document.getElementById('word-hint').classList.add('hidden')
  document.getElementById('typing-input').value = ''
  document.getElementById('typing-input').className = 'form-input'
  document.getElementById('typing-input').style =
    'max-width:400px; font-size:28px; font-weight:700; text-align:center; display:inline-block;'
  document.getElementById('feedback-area').classList.add('hidden')
  attemptNumber = 1
  updateProgress()
  document.getElementById('typing-input').focus()
}

async function checkAnswer() {
  const input = document.getElementById('typing-input')
  const typed = input.value.trim()

  if (!typed) return

  const word = words[currentIndex]
  const btn = document.getElementById('btn-check')
  btn.disabled = true
  btn.textContent = 'Checking...'

  try {
    const res = await fetch('/api/typing/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wordId: word.id,
        typed,
        attemptNumber,
        childProfile: profile,
        tutorPersonality: personality,
      }),
    })

    const data = await res.json()

    // Show feedback
    const feedbackArea = document.getElementById('feedback-area')
    const feedbackText = document.getElementById('feedback-text')
    feedbackArea.classList.remove('hidden')
    feedbackText.textContent = data.aiFeedback

    if (data.correct) {
      input.classList.add('correct')
      score++
      document.getElementById('score-badge').textContent = 'Score: ' + score

      // Update session
      const session = QuokkaStorage.getSession()
      if (session) {
        QuokkaStorage.updateSession({
          typingWordsAttempted: (session.typingWordsAttempted || 0) + 1,
        })
      }
      QuokkaStorage.updateWordProgress(word.id, true)

      setTimeout(() => {
        currentIndex++
        showWord()
      }, 1500)
    } else if (data.revealAnswer) {
      // Show answer after 3 wrong attempts
      input.classList.add('incorrect')
      feedbackText.textContent = `The answer is "${word.english}". ${data.aiFeedback}`
      QuokkaStorage.updateWordProgress(word.id, false)

      setTimeout(() => {
        currentIndex++
        showWord()
      }, 2500)
    } else {
      // Show hint
      input.classList.add('incorrect')
      if (data.hint) {
        const hintEl = document.getElementById('word-hint')
        hintEl.textContent = data.hint
        hintEl.classList.remove('hidden')
      }
      attemptNumber++

      setTimeout(() => {
        input.value = ''
        input.className = 'form-input'
        input.style = 'max-width:400px; font-size:28px; font-weight:700; text-align:center; display:inline-block;'
        input.focus()
      }, 1000)
    }
  } catch (err) {
    console.error('Check failed:', err)
    document.getElementById('feedback-text').textContent = 'Oops! Try again!'
    document.getElementById('feedback-area').classList.remove('hidden')
  } finally {
    btn.disabled = false
    btn.textContent = 'Check!'
  }
}

function updateProgress() {
  const total = words.length
  const pct = Math.round(((currentIndex + 1) / total) * 100)
  document.getElementById('progress-fill').style.width = pct + '%'
  document.getElementById('progress-label').textContent = (currentIndex + 1) + ' / ' + total
}

function showCompletion() {
  document.getElementById('prompt-area').style.display = 'none'
  document.querySelector('.typing-input-area').style.display = 'none'
  document.getElementById('btn-check').style.display = 'none'
  document.getElementById('feedback-area').classList.add('hidden')
  const comp = document.getElementById('completion-state')
  comp.classList.remove('hidden')
  document.getElementById('completion-text').textContent =
    words.length + '개 단어 중 ' + score + '개를 맞혔어요!'
}

function restartGame() {
  loadWords()
}

// Enter key to check
document.getElementById('typing-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    checkAnswer()
  }
})

// Init
loadWords()
