// ページ読み込み完了時の初期化
window.addEventListener('load', () => {
  // 初期フェードイン
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// パーティクル背景生成
function initParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  particlesContainer.id = 'particles';
  document.body.appendChild(particlesContainer);
}

function createParticle() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 6 + 's';
  particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 6000);
}

// 赤い雨エフェクト
function createBloodRain() {
  const rain = document.createElement('div');
  rain.className = 'blood-rain';
  rain.style.left = Math.random() * 100 + '%';
  rain.style.animationDuration = (Math.random() * 2 + 2) + 's';
  rain.style.animationDelay = Math.random() * 2 + 's';
  rain.style.opacity = Math.random() * 0.5 + 0.3;
  document.body.appendChild(rain);
  
  setTimeout(() => rain.remove(), 5000);
}

// 血の雫エフェクト
function createBloodDrip() {
  const drip = document.createElement('div');
  drip.className = 'blood-drip';
  drip.style.left = Math.random() * 100 + '%';
  document.body.appendChild(drip);
  
  setTimeout(() => drip.remove(), 3000);
}

// ホラー効果
function addHorrorEffects() {
  // ランダムな血の雫
  if (Math.random() < 0.3) {
    createBloodDrip();
  }
  
  // ランダムなグリッチ
  const glitchElements = document.querySelectorAll('.horror-text');
  glitchElements.forEach(element => {
    if (Math.random() < 0.1) {
      element.style.animation = 'glitch 0.3s';
      setTimeout(() => {
        element.style.animation = 'horror-flicker 3s infinite';
      }, 300);
    }
  });
  
  // ランダムなテキストフラッシュ
  const highlights = document.querySelectorAll('.story-highlight');
  highlights.forEach(highlight => {
    if (Math.random() < 0.05) {
      highlight.style.textShadow = '0 0 20px #AD002D, 0 0 30px #AD002D';
      setTimeout(() => {
        highlight.style.textShadow = '0 0 10px rgba(173, 0, 45, 0.5)';
      }, 200);
    }
  });
}

// スクロール連動表示
function revealOnScroll() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
}

// 環境音効果（ビジュアル）
let ambientMode = false;
function toggleAmbientMode() {
  if (!ambientMode) {
    ambientMode = true;
    document.body.style.filter = 'contrast(1.15) brightness(0.9)';
  } else {
    ambientMode = false;
    document.body.style.filter = '';
  }
}

// キーボードショートカット
document.addEventListener('keydown', (e) => {
  // Spaceキーで環境モード切り替え
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
    toggleAmbientMode();
  }
  
  // Escキーでトップへスクロール
  if (e.code === 'Escape') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// スクロールイベント
window.addEventListener('scroll', () => {
  revealOnScroll();
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 画面揺れエフェクト（ランダム発動）
function screenShake() {
  const intensity = 5;
  const duration = 300;
  const startTime = Date.now();
  
  function shake() {
    const elapsed = Date.now() - startTime;
    if (elapsed < duration) {
      const x = (Math.random() - 0.5) * intensity;
      const y = (Math.random() - 0.5) * intensity;
      document.body.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(shake);
    } else {
      document.body.style.transform = '';
    }
  }
  
  shake();
}

// ランダムイベント
function triggerRandomEvent() {
  const random = Math.random();
  
  if (random < 0.05) {
    // 5%の確率で画面揺れ
    screenShake();
  } else if (random < 0.15) {
    // 10%の確率で大量の血の雫
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createBloodDrip(), i * 100);
    }
  } else if (random < 0.25) {
    // 10%の確率でグリッチ
    document.body.style.animation = 'glitch 0.5s';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 500);
  }
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
  // カスタムカーソル初期化
  initCustomCursor();
  
  // パーティクル背景初期化
  initParticles();
  
  // パーティクルを定期的に生成
  setInterval(createParticle, 200);
  
  // 赤い雨を定期的に生成
  setInterval(createBloodRain, 300);
  
  // ホラー効果を定期実行
  setInterval(addHorrorEffects, 5000);
  
  // ランダムイベントを定期実行
  setInterval(triggerRandomEvent, 10000);
  
  // 初回スクロールチェック
  setTimeout(revealOnScroll, 500);
  
  // 初期ロードアニメーション
  const storySection = document.querySelector('.story-section');
  if (storySection) {
    storySection.style.opacity = '0';
    setTimeout(() => {
      storySection.style.transition = 'opacity 1.5s ease';
      storySection.style.opacity = '1';
    }, 300);
  }
});

// ページ離脱前の警告（オプション）
window.addEventListener('beforeunload', (e) => {
  // 必要に応じてコメントアウトを外す
  // e.preventDefault();
  // e.returnValue = '本当にこの部屋から出ますか？';
});