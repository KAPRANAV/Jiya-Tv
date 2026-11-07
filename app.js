/* ==========================================================================
   JIYA TV ✨ JAVASCRIPT
   Publisher: Pranav
   Full Interactive Controls, Animations & Responsive Features
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Elements Cache ---
  const body = document.getElementById('page-body');
  const iframe = document.getElementById('movie-iframe');
  const brandLogoBtn = document.getElementById('brand-logo-btn');
  const userProfileBtn = document.getElementById('user-profile-btn');

  // Theme & Aura
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const auraMenuBtn = document.getElementById('aura-menu-btn');
  const auraPickerMenu = document.getElementById('aura-picker-menu');
  const auraOptions = document.querySelectorAll('.aura-option');
  const quickMoodBtn = document.getElementById('quick-mood-btn');
  const currentMoodText = document.getElementById('current-mood-text');

  // Cinema Mode
  const cinemaToggleBtn = document.getElementById('cinema-toggle-btn');
  const cinemaOverlay = document.getElementById('cinema-overlay');

  // Player controls
  const mainPlayerBox = document.getElementById('main-player-box');
  const playerOuter = document.getElementById('player-outer');
  const theaterModeBtn = document.getElementById('theater-mode-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const reloadPlayerBtn = document.getElementById('reload-player-btn');
  const restorePlayerBtn = document.getElementById('restore-player-btn');
  const closeMiniBtn = document.getElementById('close-mini-btn');

  // Publisher & Actions
  const subscribeBtn = document.getElementById('subscribe-btn');
  const likeBtn = document.getElementById('like-btn');
  const likeCountSpan = document.getElementById('like-count');
  const dislikeBtn = document.getElementById('dislike-btn');
  const shareBtn = document.getElementById('share-btn');
  const saveBtn = document.getElementById('save-btn');
  const saveBtnText = document.getElementById('save-btn-text');
  const downloadBtn = document.getElementById('download-btn');
  const heartParticlesContainer = document.getElementById('heart-particles-container');

  // Modals
  const shareModal = document.getElementById('share-modal');
  const closeShareModal = document.getElementById('close-share-modal');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const shareLinkInput = document.getElementById('share-link-input');

  const sleepTimerBtn = document.getElementById('sleep-timer-btn');
  const sleepTimerLabel = document.getElementById('sleep-timer-label');
  const sleepModal = document.getElementById('sleep-modal');
  const closeSleepModal = document.getElementById('close-sleep-modal');
  const timerOptionBtns = document.querySelectorAll('.timer-option-btn');

  // Description
  const expandDescBtn = document.getElementById('expand-desc-btn');
  const descDetails = document.getElementById('desc-details');
  const expandDescText = document.getElementById('expand-desc-text');

  // Toast
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  // --- Helper: Show Toast Notification ---
  let toastTimer = null;
  function showToast(message, emoji = '💖') {
    if (!toast || !toastMsg) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastMsg.textContent = message;
    const sparkle = toast.querySelector('.toast-sparkle');
    if (sparkle) sparkle.textContent = emoji;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Brand Logo Click ---
  brandLogoBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Welcome to Jiya TV ✨ Published by Pranav', '🎬');
  });

  // --- User Profile Click ---
  userProfileBtn?.addEventListener('click', () => {
    showToast('Publisher: Pranav ✨ | Jiya TV Official', '👑');
  });

  // --- Theme Toggle (Dark Velvet / Strawberry Milk Pastel) ---
  themeToggleBtn?.addEventListener('click', () => {
    const isDark = body.classList.contains('theme-dark');
    if (isDark) {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      themeIcon?.setAttribute('data-lucide', 'sun');
      showToast('Switched to Strawberry Dream light mode! 🍓', '🌸');
    } else {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      themeIcon?.setAttribute('data-lucide', 'moon');
      showToast('Switched to Velvet Midnight dark mode! ✨', '🌙');
    }
    if (window.lucide) window.lucide.createIcons();
  });

  // --- Ambient Aura Mood Selector ---
  const auraMoodList = [
    { id: 'aura-sakura', name: 'Sakura Glow' },
    { id: 'aura-lavender', name: 'Lavender Haze' },
    { id: 'aura-peach', name: 'Peach Sunset' },
    { id: 'aura-cyber', name: 'Cyber Berry' },
    { id: 'aura-aurora', name: 'Midnight Glow' },
    { id: 'aura-none', name: 'Aura Off' }
  ];
  let currentAuraIndex = 0;

  function applyAuraClass(auraClass, auraName) {
    body.className = body.className.replace(/\baura-[a-z]+\b/g, '').trim();
    body.classList.add(auraClass);

    auraOptions.forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-aura') === auraClass);
    });

    if (currentMoodText) currentMoodText.textContent = auraName;
    showToast(`Ambient Aura: ${auraName} ✨`, '🎨');
  }

  auraMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    auraPickerMenu?.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (auraPickerMenu && !auraPickerMenu.contains(e.target) && e.target !== auraMenuBtn) {
      auraPickerMenu.classList.remove('active');
    }
  });

  auraOptions.forEach(option => {
    option.addEventListener('click', () => {
      const auraClass = option.getAttribute('data-aura');
      const auraName = option.querySelector('span:last-child')?.textContent || 'Aura';
      applyAuraClass(auraClass, auraName);
      auraPickerMenu?.classList.remove('active');
    });
  });

  // Quick Mood Button in Action Bar (cycles aura moods)
  quickMoodBtn?.addEventListener('click', () => {
    currentAuraIndex = (currentAuraIndex + 1) % auraMoodList.length;
    const mood = auraMoodList[currentAuraIndex];
    applyAuraClass(mood.id, mood.name);
  });

  // --- Cinema Mode (Lights Off) ---
  cinemaToggleBtn?.addEventListener('click', () => {
    body.classList.toggle('cinema-mode-active');
    if (body.classList.contains('cinema-mode-active')) {
      showToast('Cinema Lights Dimmed. Enjoy the movie on Jiya TV! 🍿', '🎬');
    }
  });

  cinemaOverlay?.addEventListener('click', () => {
    body.classList.remove('cinema-mode-active');
  });

  // --- Fullscreen Toggle ---
  fullscreenBtn?.addEventListener('click', () => {
    toggleFullscreen();
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (mainPlayerBox?.requestFullscreen) {
        mainPlayerBox.requestFullscreen().catch(() => {});
      } else if (mainPlayerBox?.webkitRequestFullscreen) {
        mainPlayerBox.webkitRequestFullscreen();
      }
      showToast('Fullscreen Mode (Press Esc to exit) 🎬', '✨');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      showToast('Exited Fullscreen', '✨');
    }
  }

  // --- Theater Mode ---
  theaterModeBtn?.addEventListener('click', () => {
    body.classList.toggle('theater-mode');
    const isTheater = body.classList.contains('theater-mode');
    showToast(isTheater ? 'Theater mode on ✨' : 'Default view restored', '🎭');
    if (window.lucide) window.lucide.createIcons();
  });

  // --- Reload Stream ---
  reloadPlayerBtn?.addEventListener('click', () => {
    if (!iframe) return;
    const currentSrc = iframe.src;
    iframe.src = '';
    setTimeout(() => {
      iframe.src = currentSrc;
      showToast('Video stream refreshed! ✨', '🔄');
    }, 200);
  });

  // --- YouTube Keyboard Shortcuts ---
  document.addEventListener('keydown', (e) => {
    const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
    if (isTyping) return;

    if (e.key === 'Escape') {
      body.classList.remove('cinema-mode-active');
      shareModal?.classList.remove('active');
      sleepModal?.classList.remove('active');
      auraPickerMenu?.classList.remove('active');
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      theaterModeBtn?.click();
    } else if (e.key === 'c' || e.key === 'C') {
      e.preventDefault();
      cinemaToggleBtn?.click();
    }
  });

  // --- Like Button with Floating Heart Explosion ---
  let isLiked = false;
  likeBtn?.addEventListener('click', (e) => {
    isLiked = !isLiked;
    likeBtn.classList.toggle('liked', isLiked);

    if (isLiked) {
      if (likeCountSpan) likeCountSpan.textContent = '142.1K';
      spawnHeartExplosion(e.clientX, e.clientY);
      showToast('Loved this movie on Jiya TV! 💖', '✨');
    } else {
      if (likeCountSpan) likeCountSpan.textContent = '142K';
    }
  });

  dislikeBtn?.addEventListener('click', () => {
    dislikeBtn.classList.toggle('active');
    if (dislikeBtn.classList.contains('active')) {
      if (isLiked) {
        isLiked = false;
        likeBtn?.classList.remove('liked');
        if (likeCountSpan) likeCountSpan.textContent = '142K';
      }
      showToast('Feedback noted! 👍', '🤍');
    }
  });

  function spawnHeartExplosion(originX, originY) {
    if (!heartParticlesContainer) return;
    const heartEmojis = ['💖', '💕', '✨', '🌸', '🎀', '🤍', '💗', '🍿'];
    const count = 14;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

      const startX = originX || window.innerWidth / 2;
      const startY = originY || window.innerHeight / 2;

      const driftX = (Math.random() - 0.5) * 160;
      const driftXEnd = driftX * 1.6 + (Math.random() - 0.5) * 80;
      const rotation = (Math.random() - 0.5) * 45;
      const rotationEnd = (Math.random() - 0.5) * 90;

      heart.style.left = `${startX - 12}px`;
      heart.style.top = `${startY - 12}px`;
      heart.style.setProperty('--drift-x', `${driftX}px`);
      heart.style.setProperty('--drift-x-end', `${driftXEnd}px`);
      heart.style.setProperty('--rot', `${rotation}deg`);
      heart.style.setProperty('--rot-end', `${rotationEnd}deg`);

      heartParticlesContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1600);
    }
  }

  // --- Subscribe to Publisher Pranav ---
  let isSubscribed = false;
  subscribeBtn?.addEventListener('click', () => {
    isSubscribed = !isSubscribed;
    const subText = subscribeBtn.querySelector('.sub-text');

    if (isSubscribed) {
      subscribeBtn.classList.add('subscribed');
      if (subText) subText.textContent = 'Subscribed 💖';
      spawnHeartExplosion(
        subscribeBtn.getBoundingClientRect().left + 40,
        subscribeBtn.getBoundingClientRect().top + 15
      );
      showToast('Subscribed to Pranav on Jiya TV! 🔔✨', '💖');
    } else {
      subscribeBtn.classList.remove('subscribed');
      if (subText) subText.textContent = 'Subscribe';
      showToast('Unsubscribed from Pranav', '🤍');
    }
  });

  // --- Save / Bookmark ---
  let isSaved = false;
  saveBtn?.addEventListener('click', () => {
    isSaved = !isSaved;
    saveBtn.classList.toggle('active', isSaved);
    if (saveBtnText) saveBtnText.textContent = isSaved ? 'Saved 💖' : 'Save';
    showToast(isSaved ? 'Saved to Jiya TV favorites! ✨' : 'Removed from saved', isSaved ? '🔖' : '🤍');
  });

  // --- Download / Offline Button ---
  downloadBtn?.addEventListener('click', () => {
    showToast('Video available for offline streaming! 📥✨', '🌸');
  });

  // --- Share Modal ---
  shareBtn?.addEventListener('click', () => {
    shareModal?.classList.add('active');
  });

  closeShareModal?.addEventListener('click', () => {
    shareModal?.classList.remove('active');
  });

  shareModal?.addEventListener('click', (e) => {
    if (e.target === shareModal) {
      shareModal.classList.remove('active');
    }
  });

  copyLinkBtn?.addEventListener('click', () => {
    const link = shareLinkInput?.value || window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      showToast('Link copied to clipboard! 📋✨', '💖');
      shareModal?.classList.remove('active');
    }).catch(() => {
      showToast('Link ready to share!', '✨');
    });
  });

  // Social Share Handlers
  const movieUrl = encodeURIComponent('https://playdrive.vip/e/AQGrE48AAgDqcw');
  const movieMsg = encodeURIComponent('Watch this premiere on Jiya TV (Published by Pranav) ✨: ');

  document.getElementById('share-whatsapp')?.addEventListener('click', () => {
    window.open(`https://api.whatsapp.com/send?text=${movieMsg}${movieUrl}`, '_blank');
  });
  document.getElementById('share-twitter')?.addEventListener('click', () => {
    window.open(`https://twitter.com/intent/tweet?text=${movieMsg}&url=${movieUrl}`, '_blank');
  });
  document.getElementById('share-telegram')?.addEventListener('click', () => {
    window.open(`https://t.me/share/url?url=${movieUrl}&text=${movieMsg}`, '_blank');
  });
  document.getElementById('share-pinterest')?.addEventListener('click', () => {
    window.open(`https://pinterest.com/pin/create/button/?url=${movieUrl}&description=${movieMsg}`, '_blank');
  });
  document.getElementById('share-instagram')?.addEventListener('click', () => {
    if (shareLinkInput) navigator.clipboard.writeText(shareLinkInput.value);
    showToast('Link copied! Paste in your Instagram story ✨', '📸');
    shareModal?.classList.remove('active');
  });

  // --- Sleep Timer ---
  let sleepCountdown = null;
  sleepTimerBtn?.addEventListener('click', () => {
    sleepModal?.classList.add('active');
  });

  closeSleepModal?.addEventListener('click', () => {
    sleepModal?.classList.remove('active');
  });

  sleepModal?.addEventListener('click', (e) => {
    if (e.target === sleepModal) {
      sleepModal.classList.remove('active');
    }
  });

  timerOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timerOptionBtns.forEach(b => b.classList.remove('active'));
      const mins = parseInt(btn.getAttribute('data-minutes'), 10);

      if (sleepCountdown) clearInterval(sleepCountdown);

      if (mins === 0) {
        if (sleepTimerLabel) sleepTimerLabel.textContent = 'Timer';
        showToast('Sleep timer turned off 🌙', '💤');
      } else {
        btn.classList.add('active');
        let remainingSeconds = mins * 60;
        if (sleepTimerLabel) sleepTimerLabel.textContent = `${mins}m`;
        showToast(`Sleep timer set for ${mins} minutes! Sweet dreams 🌙`, '✨');

        sleepCountdown = setInterval(() => {
          remainingSeconds--;
          const m = Math.floor(remainingSeconds / 60);
          if (sleepTimerLabel) sleepTimerLabel.textContent = `${m + 1}m`;

          if (remainingSeconds <= 0) {
            clearInterval(sleepCountdown);
            body.classList.add('cinema-mode-active');
            if (sleepTimerLabel) sleepTimerLabel.textContent = 'Off';
            showToast('Sleep timer ended on Jiya TV. Goodnight! 🌙✨', '💤');
          }
        }, 1000);
      }

      sleepModal?.classList.remove('active');
    });
  });

  // --- Expandable Description Box ---
  expandDescBtn?.addEventListener('click', () => {
    const isOpen = descDetails?.classList.contains('open');
    if (isOpen) {
      descDetails?.classList.remove('open');
      expandDescBtn?.classList.remove('open');
      if (expandDescText) expandDescText.textContent = 'Show more';
    } else {
      descDetails?.classList.add('open');
      expandDescBtn?.classList.add('open');
      if (expandDescText) expandDescText.textContent = 'Show less';
    }
  });

  // --- Clickable Timestamps in Description ---
  document.querySelectorAll('.chapter-item .timestamp').forEach(stamp => {
    stamp.addEventListener('click', () => {
      showToast(`Jumped to chapter at ${stamp.textContent}! ✨`, '🎬');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // --- Sticky Mini Player on Scroll ---
  let miniPlayerDismissed = false;
  window.addEventListener('scroll', () => {
    if (miniPlayerDismissed || !playerOuter) return;
    const playerRect = playerOuter.getBoundingClientRect();
    const isPastPlayer = playerRect.bottom < 60;

    if (isPastPlayer && !body.classList.contains('mini-player-active')) {
      body.classList.add('mini-player-active');
    } else if (!isPastPlayer && body.classList.contains('mini-player-active')) {
      body.classList.remove('mini-player-active');
    }
  }, { passive: true });

  restorePlayerBtn?.addEventListener('click', () => {
    body.classList.remove('mini-player-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  closeMiniBtn?.addEventListener('click', () => {
    body.classList.remove('mini-player-active');
    miniPlayerDismissed = true;
    showToast('Mini player closed', '🤍');
  });

  // --- Search Input Clear & Enter Key ---
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  if (searchInput && searchClear) {
    searchInput.addEventListener('input', () => {
      searchClear.classList.toggle('visible', searchInput.value.length > 0);
    });
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.classList.remove('visible');
      searchInput.focus();
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim().length > 0) {
        showToast(`Searching for "${searchInput.value.trim()}" on Jiya TV ✨`, '🔍');
      }
    });
  }

  // --- Voice Search Button Effect ---
  document.getElementById('voice-search-btn')?.addEventListener('click', () => {
    showToast('Listening for your voice on Jiya TV... 🎙️✨', '🌸');
  });
});
