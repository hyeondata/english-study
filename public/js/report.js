const profile = QuokkaStorage.getProfile()
const session = QuokkaStorage.getSession()
const progress = QuokkaStorage.getFlashcardProgress()

if (profile) {
  document.getElementById('child-name').textContent = profile.name
}
document.getElementById('report-date').textContent = new Date().toLocaleDateString('ko-KR', {
  year: 'numeric', month: 'long', day: 'numeric',
})

async function generateReport() {
  if (!profile || !session) {
    document.getElementById('loading-state').classList.add('hidden')
    document.getElementById('no-data-state').classList.remove('hidden')
    return
  }

  // Check if there's any activity
  const hasActivity = session.flashcardsReviewed > 0 ||
    session.typingWordsAttempted > 0 ||
    session.chatMessagesCount > 0

  if (!hasActivity && Object.keys(progress).length === 0) {
    document.getElementById('loading-state').classList.add('hidden')
    document.getElementById('no-data-state').classList.remove('hidden')
    return
  }

  try {
    const res = await fetch('/api/report/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childProfile: profile,
        session: { ...session, endTime: new Date().toISOString() },
        flashcardProgress: progress,
      }),
    })

    const report = await res.json()
    renderReport(report)
  } catch (err) {
    console.error('Report generation failed:', err)
    // Render with local data only
    renderLocalReport()
  }
}

function renderReport(report) {
  document.getElementById('loading-state').classList.add('hidden')
  document.getElementById('report-content').classList.remove('hidden')

  // Stats
  document.getElementById('stat-time').textContent = report.totalLearningMinutes || 0
  document.getElementById('stat-words').textContent = report.wordsLearned || 0
  document.getElementById('stat-accuracy').textContent = (report.totalAccuracy || 0) + '%'
  document.getElementById('stat-typing').textContent = session.typingWordsAttempted || 0

  // Accuracy bar
  const acc = report.totalAccuracy || 0
  document.getElementById('accuracy-bar').style.width = acc + '%'
  document.getElementById('accuracy-label').textContent = acc + '%'

  // Change bar color based on accuracy
  const bar = document.getElementById('accuracy-bar')
  if (acc >= 80) bar.style.background = 'var(--success)'
  else if (acc >= 50) bar.style.background = 'var(--warning)'
  else bar.style.background = 'var(--danger)'

  // Word list
  renderWordList()

  // AI insights
  const strengthsList = document.getElementById('strengths-list')
  const suggestionsList = document.getElementById('suggestions-list')

  ;(report.strengths || []).forEach(s => {
    const li = document.createElement('li')
    li.textContent = s
    strengthsList.appendChild(li)
  })

  ;(report.suggestions || []).forEach(s => {
    const li = document.createElement('li')
    li.textContent = s
    suggestionsList.appendChild(li)
  })
}

function renderLocalReport() {
  // Fallback: render with client-side data only
  const progressEntries = Object.values(progress)
  const totalCorrect = progressEntries.reduce((s, p) => s + p.correct, 0)
  const totalAttempts = progressEntries.reduce((s, p) => s + p.correct + p.incorrect, 0)
  const acc = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  const learningMin = session
    ? Math.round((Date.now() - new Date(session.startTime).getTime()) / 60000)
    : 0

  renderReport({
    totalLearningMinutes: learningMin,
    wordsLearned: progressEntries.filter(p => p.mastered).length,
    totalAccuracy: acc,
    strengths: ['Keep up the good work!'],
    suggestions: ['Try practicing more words!'],
  })
}

function renderWordList() {
  const container = document.getElementById('word-list')
  const entries = Object.values(progress)

  if (entries.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);">아직 학습한 단어가 없어요.</p>'
    return
  }

  entries.sort((a, b) => (b.correct + b.incorrect) - (a.correct + a.incorrect))

  entries.slice(0, 20).forEach(entry => {
    const total = entry.correct + entry.incorrect
    const pct = total > 0 ? Math.round((entry.correct / total) * 100) : 0

    const row = document.createElement('div')
    row.style.cssText = 'display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid #f0f0f0;'

    const status = entry.mastered ? '✅' : pct >= 50 ? '🔄' : '❌'
    row.innerHTML = `
      <span style="font-size:20px;">${status}</span>
      <span style="flex:1; font-weight:700;">${entry.wordId}</span>
      <span style="font-size:14px; color:var(--text-light);">${entry.correct}/${total}</span>
      <div style="width:60px; height:8px; background:#E8E8E8; border-radius:4px; overflow:hidden;">
        <div style="width:${pct}%; height:100%; background:${pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)'}; border-radius:4px;"></div>
      </div>
    `
    container.appendChild(row)
  })
}

// Init
generateReport()
