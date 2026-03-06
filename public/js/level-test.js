// Gate: require profile (but not level yet)
if (!QuokkaStorage.requireProfile()) { /* redirect */ }

const profile = QuokkaStorage.getProfile()
document.getElementById('nav-name').textContent = profile.name

let questions = []
let currentIndex = 0
let correctCount = 0
let answers = []
let isProcessing = false

async function startTest() {
  document.getElementById('intro-state').classList.add('hidden')
  document.getElementById('test-state').classList.remove('hidden')

  try {
    const res = await fetch('/api/level-test/questions')
    const data = await res.json()
    questions = data.questions
    currentIndex = 0
    correctCount = 0
    answers = []
    showQuestion()
  } catch (err) {
    console.error('Failed to load questions:', err)
    alert('문제를 불러오지 못했습니다. 다시 시도해주세요.')
  }
}

function showQuestion() {
  if (currentIndex >= questions.length) {
    submitTest()
    return
  }

  isProcessing = false
  const q = questions[currentIndex]

  // Progress
  document.getElementById('progress-label').textContent = (currentIndex + 1) + ' / ' + questions.length
  document.getElementById('progress-fill').style.width = ((currentIndex + 1) / questions.length * 100) + '%'
  document.getElementById('score-badge').textContent = correctCount + ' correct'

  // Type badge
  const typeLabels = {
    word_meaning: 'Word Meaning',
    phonics_recognition: 'Phonics',
    sentence_comprehension: 'Reading',
  }
  document.getElementById('question-type-badge').textContent = typeLabels[q.type] || q.type

  // Question
  document.getElementById('question-prompt').textContent = q.prompt
  document.getElementById('question-prompt-kr').textContent = q.promptKorean

  // Options
  const container = document.getElementById('options-container')
  container.innerHTML = ''
  q.options.forEach(opt => {
    const btn = document.createElement('button')
    btn.className = 'btn btn-outline btn-block level-test-option'
    btn.textContent = opt.text
    btn.dataset.optionId = opt.id
    btn.addEventListener('click', () => selectOption(opt.id, btn))
    container.appendChild(btn)
  })

  // Hide feedback
  document.getElementById('feedback-area').classList.add('hidden')

  // Animate card
  const card = document.getElementById('question-card')
  card.classList.remove('animate-fadeInUp')
  void card.offsetWidth
  card.classList.add('animate-fadeInUp')
}

function selectOption(optionId, btn) {
  if (isProcessing) return
  isProcessing = true

  const q = questions[currentIndex]
  const isCorrect = optionId === q.correctOptionId

  // Record answer
  answers.push({ questionId: q.id, selectedOptionId: optionId })

  // Disable all buttons
  document.querySelectorAll('#options-container button').forEach(b => {
    b.disabled = true
    if (b.dataset.optionId === q.correctOptionId) {
      b.classList.remove('btn-outline')
      b.classList.add('btn-success')
    }
  })

  if (isCorrect) {
    correctCount++
    btn.classList.remove('btn-outline')
    btn.classList.add('btn-success')
    document.getElementById('feedback-emoji').textContent = '🎉'
    document.getElementById('feedback-text').textContent = '정답이에요!'
    document.getElementById('feedback-text').style.color = 'var(--success)'
  } else {
    btn.classList.remove('btn-outline')
    btn.classList.add('btn-danger')
    document.getElementById('feedback-emoji').textContent = '😊'
    document.getElementById('feedback-text').textContent = '아쉬워요! 다음엔 맞출 수 있을 거예요!'
    document.getElementById('feedback-text').style.color = 'var(--danger)'
  }

  document.getElementById('feedback-area').classList.remove('hidden')

  setTimeout(() => {
    currentIndex++
    showQuestion()
  }, 1200)
}

async function submitTest() {
  document.getElementById('test-state').classList.add('hidden')
  document.getElementById('loading-state').classList.remove('hidden')

  try {
    const res = await fetch('/api/level-test/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    })

    const result = await res.json()

    // Save to localStorage
    QuokkaStorage.setLevel(result)

    // Navigate to result page
    setTimeout(() => {
      window.location.href = '/level-result'
    }, 1500)
  } catch (err) {
    console.error('Submit failed:', err)
    alert('결과를 저장하지 못했습니다. 다시 시도해주세요.')
    document.getElementById('loading-state').classList.add('hidden')
    document.getElementById('intro-state').classList.remove('hidden')
  }
}
