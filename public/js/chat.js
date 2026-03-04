if (!QuokkaStorage.requireProfile()) { /* redirect */ }

const profile = QuokkaStorage.getProfile()
const personality = QuokkaStorage.getPersonality()
document.getElementById('nav-name').textContent = profile.name

const messagesEl = document.getElementById('chat-messages')
const inputEl = document.getElementById('chat-input')
const suggestionsEl = document.getElementById('chat-suggestions')
let isSending = false

// Load history or show welcome
function init() {
  const history = QuokkaStorage.getChatHistory()

  if (history.length === 0) {
    // Welcome message
    const greeting = personality?.greetingMessage ||
      `Hi ${profile.name}! I'm Quokka, your English buddy! What would you like to talk about?`
    addBubble('tutor', greeting)
    QuokkaStorage.addChatMessage('tutor', greeting)
    showSuggestions(["Let's learn a word!", 'Hello Quokka!', 'Tell me a fun fact!'])
  } else {
    // Restore history
    history.forEach(msg => addBubble(msg.role, msg.content, false))
    messagesEl.scrollTop = messagesEl.scrollHeight
  }

  inputEl.focus()
}

function addBubble(role, content, animate = true) {
  const bubble = document.createElement('div')
  bubble.className = 'chat-bubble ' + role
  if (animate) bubble.classList.add('animate-fadeInUp')

  if (role === 'tutor') {
    bubble.innerHTML = '<strong style="display:block; font-size:13px; color:var(--primary); margin-bottom:4px;">🐻 Quokka</strong>' + escapeHtml(content)
  } else {
    bubble.textContent = content
  }

  messagesEl.appendChild(bubble)
  messagesEl.scrollTop = messagesEl.scrollHeight
}

function addLoadingBubble() {
  const bubble = document.createElement('div')
  bubble.className = 'chat-bubble tutor animate-fadeInUp'
  bubble.id = 'loading-bubble'
  bubble.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>'
  messagesEl.appendChild(bubble)
  messagesEl.scrollTop = messagesEl.scrollHeight
}

function removeLoadingBubble() {
  const el = document.getElementById('loading-bubble')
  if (el) el.remove()
}

function showSuggestions(suggestions) {
  suggestionsEl.innerHTML = ''
  if (!suggestions || suggestions.length === 0) return

  suggestions.forEach(text => {
    const chip = document.createElement('button')
    chip.className = 'chat-suggestion-chip'
    chip.textContent = text
    chip.addEventListener('click', () => {
      inputEl.value = text
      sendMessage()
    })
    suggestionsEl.appendChild(chip)
  })
}

async function sendMessage() {
  const text = inputEl.value.trim()
  if (!text || isSending) return

  isSending = true
  inputEl.value = ''
  suggestionsEl.innerHTML = ''

  // Add user bubble
  addBubble('user', text)
  QuokkaStorage.addChatMessage('user', text)

  // Update session
  const session = QuokkaStorage.getSession()
  if (session) {
    QuokkaStorage.updateSession({
      chatMessagesCount: (session.chatMessagesCount || 0) + 1,
    })
  }

  // Show loading
  addLoadingBubble()

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childProfile: profile,
        tutorPersonality: personality,
        message: text,
        conversationHistory: QuokkaStorage.getChatHistory().slice(-20),
      }),
    })

    const data = await res.json()
    removeLoadingBubble()

    const reply = data.reply || "Hmm, I'm thinking... Can you say that again?"
    addBubble('tutor', reply)
    QuokkaStorage.addChatMessage('tutor', reply)

    if (data.suggestedFollowups) {
      showSuggestions(data.suggestedFollowups)
    }
  } catch (err) {
    removeLoadingBubble()
    const fallback = "Oops! Let me think about that again. Can you try once more?"
    addBubble('tutor', fallback)
    console.error('Chat error:', err)
  }

  isSending = false
  inputEl.focus()
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Enter to send
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    sendMessage()
  }
})

init()
