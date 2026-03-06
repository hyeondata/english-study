// Onboarding state
const state = {
  step: 1,
  personalityTraits: [],
  favoriteAnimals: [],
  learningGoal: '',
}

// Step navigation
function goToStep(step) {
  // Validate before moving forward
  if (step === 2 && state.step === 1) {
    const name = document.getElementById('child-name').value.trim()
    const age = document.getElementById('child-age').value
    if (!name) { alert('아이 이름을 입력해주세요!'); return }
    if (!age) { alert('나이를 선택해주세요!'); return }
  }

  // Hide all steps
  for (let i = 1; i <= 3; i++) {
    document.getElementById('step-' + i).classList.add('hidden')
  }
  // Show target step
  document.getElementById('step-' + step).classList.remove('hidden')

  // Update dots
  document.querySelectorAll('.step-dot').forEach(dot => {
    const dotStep = Number(dot.dataset.step)
    dot.classList.remove('active', 'done')
    if (dotStep === step) dot.classList.add('active')
    else if (dotStep < step) dot.classList.add('done')
  })

  state.step = step
}

// Chip selection — personality
document.querySelectorAll('#personality-chips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('selected')
    const trait = chip.dataset.trait
    if (chip.classList.contains('selected')) {
      state.personalityTraits.push(trait)
    } else {
      state.personalityTraits = state.personalityTraits.filter(t => t !== trait)
    }
  })
})

// Chip selection — animals
document.querySelectorAll('#animal-chips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('selected')
    const animal = chip.dataset.animal
    if (chip.classList.contains('selected')) {
      state.favoriteAnimals.push(animal)
    } else {
      state.favoriteAnimals = state.favoriteAnimals.filter(a => a !== animal)
    }
  })
})

// Goal selection (single select)
document.querySelectorAll('.goal-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.goal-chip').forEach(c => c.classList.remove('selected'))
    chip.classList.add('selected')
    state.learningGoal = chip.dataset.goal
  })
})

// Submit
async function submitOnboarding() {
  if (!state.learningGoal) {
    alert('학습 목표를 선택해주세요!')
    return
  }

  const name = document.getElementById('child-name').value.trim()
  const age = document.getElementById('child-age').value

  // Show loading
  document.getElementById('step-3').classList.add('hidden')
  document.getElementById('step-dots').classList.add('hidden')
  document.getElementById('loading-state').classList.remove('hidden')

  try {
    const response = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        age: Number(age),
        personalityTraits: state.personalityTraits,
        favoriteAnimals: state.favoriteAnimals,
        learningGoal: state.learningGoal,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong')
    }

    // Save to localStorage
    QuokkaStorage.setProfile(data.profile)
    QuokkaStorage.setPersonality(data.personality)
    QuokkaStorage.startSession()

    // Redirect to level test
    window.location.href = '/level-test'
  } catch (err) {
    console.error('Onboarding failed:', err)
    alert('오류가 발생했습니다. 다시 시도해주세요.')
    document.getElementById('loading-state').classList.add('hidden')
    document.getElementById('step-3').classList.remove('hidden')
    document.getElementById('step-dots').classList.remove('hidden')
  }
}
