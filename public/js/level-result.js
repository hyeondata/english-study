// Gate: need profile
if (!QuokkaStorage.requireProfile()) { /* redirect */ }

const profile = QuokkaStorage.getProfile()
const levelData = QuokkaStorage.getLevel()

document.getElementById('nav-name').textContent = profile.name

if (!levelData) {
  window.location.href = '/level-test'
}

// Display result
const level = levelData.level
const score = levelData.score
const correctCount = levelData.correctCount
const totalQuestions = levelData.totalQuestions

document.getElementById('level-badge').textContent = 'Lv. ' + level
document.getElementById('score-label').textContent = correctCount + ' / ' + totalQuestions
document.getElementById('score-pct').textContent = score + '%'

// Animate score bar
setTimeout(() => {
  document.getElementById('score-bar-fill').style.width = score + '%'
}, 100)

// Encouragement message by level range
let message = ''
if (level <= 3) {
  message = '영어 학습을 시작하는 단계예요! 파닉스 영상부터 함께 배워봐요!'
} else if (level <= 6) {
  message = '기초가 탄탄해요! 단어 조합과 문장 만들기를 연습해봐요!'
} else {
  message = '영어 실력이 훌륭해요! 리스닝과 독해 연습을 해봐요!'
}
document.getElementById('result-message').textContent = message
document.getElementById('result-title').textContent = profile.name + '의 영어 레벨: ' + level

// Load phonics recommendations
let currentVideoId = null

async function loadPhonics() {
  try {
    const res = await fetch('/api/phonics/recommendations?level=' + level)
    const data = await res.json()
    const container = document.getElementById('video-list')

    const watched = JSON.parse(localStorage.getItem('quokka_watched_videos') || '[]')

    data.videos.forEach(video => {
      const isWatched = watched.includes(video.id)
      const card = document.createElement('div')
      card.className = 'card card-hover video-card flex items-center'
      card.style.cssText = 'gap:16px; padding:16px; cursor:pointer;'
      card.innerHTML =
        '<img src="' + video.thumbnailUrl + '" alt="' + video.title + '" class="video-thumbnail"/>' +
        '<div style="flex:1;">' +
          '<div style="font-size:16px; font-weight:700;">' + video.title + '</div>' +
          '<div style="font-size:13px; color:var(--text-light);">' + video.category.replace(/_/g, ' ') + '</div>' +
        '</div>' +
        (isWatched ? '<span style="font-size:20px;">&#x2705;</span>' : '<span style="font-size:20px;">&#x25B6;&#xFE0F;</span>')
      card.addEventListener('click', () => openVideoModal(video))
      container.appendChild(card)
    })
  } catch (err) {
    console.error('Failed to load phonics:', err)
  }
}

function openVideoModal(video) {
  currentVideoId = video.id
  document.getElementById('modal-title').textContent = video.title
  document.getElementById('video-iframe').src = 'https://www.youtube.com/embed/' + video.youtubeId + '?autoplay=1'
  document.getElementById('video-modal').classList.remove('hidden')
  document.body.style.overflow = 'hidden'

  const watched = JSON.parse(localStorage.getItem('quokka_watched_videos') || '[]')
  if (watched.includes(video.id)) {
    document.getElementById('btn-watched').textContent = '이미 시청함'
    document.getElementById('btn-watched').disabled = true
  } else {
    document.getElementById('btn-watched').textContent = '영상 봤어요'
    document.getElementById('btn-watched').disabled = false
  }
}

function closeVideoModal() {
  document.getElementById('video-iframe').src = ''
  document.getElementById('video-modal').classList.add('hidden')
  document.body.style.overflow = ''
  currentVideoId = null
}

function closeModalOutside(event) {
  if (event.target === document.getElementById('video-modal')) {
    closeVideoModal()
  }
}

function markWatched() {
  if (!currentVideoId) return
  const watched = JSON.parse(localStorage.getItem('quokka_watched_videos') || '[]')
  if (!watched.includes(currentVideoId)) {
    watched.push(currentVideoId)
    localStorage.setItem('quokka_watched_videos', JSON.stringify(watched))
  }
  document.getElementById('btn-watched').textContent = '이미 시청함'
  document.getElementById('btn-watched').disabled = true
  // Reload list to update checkmarks
  closeVideoModal()
  document.getElementById('video-list').innerHTML = ''
  loadPhonics()
}

// Init
loadPhonics()
