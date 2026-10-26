// ==========================================================================
// AMMAYI & ABBAYI WEBSITE - MAIN CONTROLLER SCRIPT (app.js)
// Handles UI Interactions, Animations, Confetti, Quiz Engine, Chat & Modals
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMusicController();
  initConfettiTriggers();
  initAIChatController();
  initQuizController();
  initLetterGenerator();
  initPhotoGallery();
  initCursorTrail();
});

// ==========================================================================
// 1. MUSIC & AMBIENCE CONTROLLER
// ==========================================================================
function initMusicController() {
  const musicBtn = document.getElementById('music-toggle-btn');
  const musicBtnText = document.getElementById('music-btn-text');

  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    if (!window.audioManager) return;
    const isPlaying = window.audioManager.toggleMusic();

    if (isPlaying) {
      musicBtnText.textContent = "Ambience: ON 🎵";
      musicBtn.classList.add('btn-primary');
      if (window.audioManager) window.audioManager.playSparkle();
    } else {
      musicBtnText.textContent = "Play Ambience";
      musicBtn.classList.remove('btn-primary');
    }
    lucide.createIcons();
  });
}

// ==========================================================================
// 2. CELEBRATION & CONFETTI FIREWORKS
// ==========================================================================
function triggerConfetti() {
  if (window.audioManager) window.audioManager.playCelebration();

  if (typeof confetti === 'function') {
    // Stage 1: Left and Right Cannons
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff4081', '#f43f5e', '#a855f7', '#38bdf8', '#fbbf24', '#ffffff']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }
}

window.triggerConfetti = triggerConfetti;

function initConfettiTriggers() {
  const heroCelebrateBtn = document.getElementById('hero-celebrate-btn');
  if (heroCelebrateBtn) {
    heroCelebrateBtn.addEventListener('click', () => {
      triggerConfetti();
    });
  }

  const giftBox = document.getElementById('gift-box-trigger');
  const headerGiftBtn = document.getElementById('header-surprise-btn');

  const handleGiftOpen = () => {
    if (window.audioManager) window.audioManager.playCelebration();
    triggerConfetti();

    // Pulse animation on gift
    if (giftBox) {
      gsap.to(giftBox, {
        scale: 1.5,
        rotation: 360,
        duration: 0.6,
        yoyo: true,
        repeat: 1,
        ease: "back.out(2)"
      });
    }

    // Open Certificate or Climax
    setTimeout(() => {
      const certSection = document.getElementById('certificate-section');
      if (certSection) {
        certSection.scrollIntoView({ behavior: 'smooth' });
        const card = document.getElementById('certificate-card');
        if (card) {
          card.classList.add('highlight-pulse');
          setTimeout(() => card.classList.remove('highlight-pulse'), 2500);
        }
      }
    }, 800);
  };

  if (giftBox) giftBox.addEventListener('click', handleGiftOpen);
  if (headerGiftBtn) headerGiftBtn.addEventListener('click', handleGiftOpen);
}

// ==========================================================================
// 3. AI BESTIE CHAT CONTROLLER
// ==========================================================================
let latestAIResponse = "Hey Ammayi! I'm your personalized Bestie AI, created by Abbayi for your birthday!";

function initAIChatController() {
  const chatWindow = document.getElementById('chat-window');
  const userInput = document.getElementById('ai-user-input');
  const sendBtn = document.getElementById('ai-send-btn');
  const ttsBtn = document.getElementById('tts-btn');
  const clearBtn = document.getElementById('clear-chat-btn');

  if (!chatWindow || !userInput || !sendBtn) return;

  const handleSend = () => {
    const text = userInput.value.trim();
    if (!text) return;

    if (window.audioManager) window.audioManager.playPop();

    // Add user bubble
    appendMessage(text, 'user');
    userInput.value = '';

    // Show typing indicator
    const typingElem = document.createElement('div');
    typingElem.className = 'chat-bubble chat-ai typing-indicator';
    typingElem.innerHTML = '<em>Bestie AI is thinking... ✨</em>';
    chatWindow.appendChild(typingElem);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Simulate AI response delay
    setTimeout(() => {
      chatWindow.removeChild(typingElem);
      const reply = window.bestieAI ? window.bestieAI.generateResponse(text) : "Happy Birthday Ammayi! Best friends forever! 💖";
      latestAIResponse = reply;
      appendMessage(reply, 'ai');
      if (window.audioManager) window.audioManager.playSparkle();
    }, 450);
  };

  sendBtn.addEventListener('click', handleSend);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // TTS Read Aloud
  if (ttsBtn) {
    ttsBtn.addEventListener('click', () => {
      if (window.bestieAI) {
        window.bestieAI.speak(latestAIResponse);
      }
    });
  }

  // Clear Chat
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      chatWindow.innerHTML = `
        <div class="chat-bubble chat-ai">
          💖 <strong>Chat Cleared!</strong> What memory or question would you like to explore next? ✨
        </div>
      `;
      latestAIResponse = "Chat Cleared! What memory would you like to explore next?";
    });
  }
}

function appendMessage(text, sender) {
  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble chat-${sender}`;

  // Convert simple markdown bold/linebreaks
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');

  bubble.innerHTML = formatted;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendSuggestion(promptText) {
  const userInput = document.getElementById('ai-user-input');
  if (userInput) {
    userInput.value = promptText;
    const sendBtn = document.getElementById('ai-send-btn');
    if (sendBtn) sendBtn.click();
  }
}
window.sendSuggestion = sendSuggestion;

// ==========================================================================
// 4. FRIENDSHIP MEMORY QUIZ ENGINE
// ==========================================================================
let currentQuizIdx = 0;
let quizScore = 0;

function initQuizController() {
  const openQuizBtn = document.getElementById('open-quiz-btn');
  if (openQuizBtn) {
    openQuizBtn.addEventListener('click', () => {
      currentQuizIdx = 0;
      quizScore = 0;
      renderQuizQuestion();
      openModal('quiz-modal');
    });
  }
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container || !window.bestieAI) return;

  const questions = window.bestieAI.quizQuestions;

  if (currentQuizIdx >= questions.length) {
    // Render Results Screen
    const percentage = Math.round((quizScore / questions.length) * 100);
    let title = "🌟 Supreme Bestie Level!";
    if (percentage < 60) title = "😊 Still Our Favorite Bestie!";

    container.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <span style="font-size: 4rem;">🏆</span>
        <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin: 0.5rem 0;">${title}</h3>
        <p style="color: #fcd34d; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">
          Your Score: ${quizScore} / ${questions.length} (${percentage}%)
        </p>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem;">
          No matter the score, 4 years of real memories are unforgettable and etched in our hearts forever! 💖
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem;">
          <button onclick="triggerConfetti(); closeModal('quiz-modal');" class="btn-icon-pill btn-primary">
            <span>🎉</span>
            <span>Celebrate & Exit</span>
          </button>
          <button onclick="currentQuizIdx = 0; quizScore = 0; renderQuizQuestion();" class="btn-icon-pill">
            <span>🔄</span>
            <span>Try Again</span>
          </button>
        </div>
      </div>
    `;
    triggerConfetti();
    return;
  }

  const q = questions[currentQuizIdx];

  let optionsHTML = '';
  q.options.forEach((opt, idx) => {
    optionsHTML += `
      <button class="chip-btn" style="width: 100%; text-align: left; padding: 0.85rem 1.2rem; font-size: 0.95rem; border-radius: 12px; margin-bottom: 0.6rem;" onclick="handleQuizAnswer(${idx})">
        ${opt}
      </button>
    `;
  });

  container.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span class="chapter-badge badge-pink">Question ${currentQuizIdx + 1} of ${questions.length}</span>
        <span style="color: #cbd5e1; font-size: 0.85rem; font-weight: 600;">Score: ${quizScore}</span>
      </div>
      <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: #fff; margin-bottom: 1.5rem; line-height: 1.5;">
        ${q.question}
      </h3>
      <div id="quiz-options-list">
        ${optionsHTML}
      </div>
      <div id="quiz-feedback-box" style="margin-top: 1rem; display: none;"></div>
    </div>
  `;
}

function handleQuizAnswer(selectedIdx) {
  const q = window.bestieAI.quizQuestions[currentQuizIdx];
  const isCorrect = selectedIdx === q.correct;
  if (isCorrect) {
    quizScore++;
    if (window.audioManager) window.audioManager.playSparkle();
  } else {
    if (window.audioManager) window.audioManager.playPop();
  }

  const feedbackBox = document.getElementById('quiz-feedback-box');
  const optionsList = document.getElementById('quiz-options-list');

  // Highlight choices
  const buttons = optionsList.querySelectorAll('button');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.style.background = 'rgba(16, 185, 129, 0.3)';
      btn.style.borderColor = '#10b981';
      btn.style.color = '#fff';
    } else if (idx === selectedIdx && !isCorrect) {
      btn.style.background = 'rgba(239, 68, 68, 0.3)';
      btn.style.borderColor = '#ef4444';
      btn.style.color = '#fff';
    }
  });

  feedbackBox.style.display = 'block';
  feedbackBox.innerHTML = `
    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 12px; border-left: 3px solid ${isCorrect ? '#10b981' : '#f59e0b'};">
      <p style="font-weight: 700; color: ${isCorrect ? '#10b981' : '#f59e0b'}; margin-bottom: 0.3rem;">
        ${isCorrect ? '✨ That\'s Right!' : '💡 Memory Note:'}
      </p>
      <p style="color: #cbd5e1; font-size: 0.9rem;">${q.explanation}</p>
      <button onclick="currentQuizIdx++; renderQuizQuestion();" class="btn-icon-pill btn-primary" style="margin-top: 0.8rem; width: 100%; justify-content: center;">
        <span>Next Question →</span>
      </button>
    </div>
  `;
}
window.handleQuizAnswer = handleQuizAnswer;

// ==========================================================================
// 5. AI LETTER GENERATOR
// ==========================================================================
let currentGeneratedLetter = "";

function initLetterGenerator() {
  const openLetterBtn = document.getElementById('open-letter-btn');
  const readVoiceBtn = document.getElementById('read-letter-voice-btn');

  if (openLetterBtn) {
    openLetterBtn.addEventListener('click', () => {
      generateLetterTone('heartwarming');
      openModal('letter-modal');
    });
  }

  if (readVoiceBtn) {
    readVoiceBtn.addEventListener('click', () => {
      if (window.bestieAI && currentGeneratedLetter) {
        window.bestieAI.speak(currentGeneratedLetter);
      }
    });
  }
}

function generateLetterTone(tone) {
  if (!window.bestieAI) return;
  currentGeneratedLetter = window.bestieAI.generateLetter(tone);

  const displayBox = document.getElementById('letter-display-box');
  if (displayBox) {
    displayBox.textContent = currentGeneratedLetter;
  }
}
window.generateLetterTone = generateLetterTone;

function copyLetterText() {
  if (!currentGeneratedLetter) return;
  navigator.clipboard.writeText(currentGeneratedLetter).then(() => {
    alert("💌 Letter copied to clipboard!");
  }).catch(() => {
    alert("Letter copied!");
  });
}
window.copyLetterText = copyLetterText;

// ==========================================================================
// 6. PHOTO GALLERY & CUSTOM UPLOADS
// ==========================================================================
function initPhotoGallery() {
  const openGalleryBtn = document.getElementById('open-gallery-btn');
  const uploadInput = document.getElementById('photo-upload-input');
  const container = document.getElementById('photo-cards-container');

  if (openGalleryBtn) {
    openGalleryBtn.addEventListener('click', () => {
      openModal('gallery-modal');
    });
  }

  if (uploadInput && container) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newCard = document.createElement('div');
          newCard.style.cssText = "background: #fff; padding: 12px 12px 28px; border-radius: 6px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transform: rotate(1deg); text-align: center; color: #1e293b;";
          newCard.innerHTML = `
            <img src="${event.target.result}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 4px;" alt="Ammayi Memory">
            <p style="font-family: var(--font-hand); font-size: 1.4rem; margin-top: 8px; color: #0f172a;">New Memory 💖</p>
            <p style="font-size: 0.75rem; color: #64748b;">Added with Love</p>
          `;
          container.appendChild(newCard);
          triggerConfetti();
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// ==========================================================================
// 7. MODAL HELPERS & NAVIGATION
// ==========================================================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    if (window.audioManager) window.audioManager.playPop();
    lucide.createIcons();
  }
}
window.openModal = openModal;

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
  }
}
window.closeModal = closeModal;

function scrollToChapter(chapId) {
  const elem = document.getElementById(chapId);
  if (elem) {
    elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    elem.classList.add('highlight-pulse');
    setTimeout(() => elem.classList.remove('highlight-pulse'), 2000);
  }
}
window.scrollToChapter = scrollToChapter;

// ==========================================================================
// 8. INTERACTIVE SPARKLE CURSOR TRAIL
// ==========================================================================
function initCursorTrail() {
  const container = document.getElementById('cursor-trail-container');
  if (!container) return;

  let throttle = false;

  window.addEventListener('mousemove', (e) => {
    if (throttle) return;
    throttle = true;
    setTimeout(() => { throttle = false; }, 35);

    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: radial-gradient(circle, #f472b6 0%, rgba(251, 191, 36, 0.8) 100%);
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px #f472b6;
      transform: translate(-50%, -50%);
      transition: transform 0.6s ease-out, opacity 0.6s ease-out;
    `;
    container.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30 + 20}px) scale(0)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => {
      if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
    }, 600);
  });
}
