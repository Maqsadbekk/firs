// script.js - TO‘LIQ TOZALANGAN VA ISHLAYDIGAN VERSIYA (IT TESTI QO‘SHILGAN)

document.addEventListener("DOMContentLoaded", function() {
  initializeApp();
});

function initializeApp() {
  // Hamburger menu
  initHamburgerMenu();

  // Test sahifalarini tekshirish
  if (document.getElementById('mathTest')) initMathTest();
  if (document.getElementById('englishTest')) initEnglishTest();
  if (document.getElementById('itTest')) initITTest();

  // Natija sahifasini tekshirish
  if (document.querySelector('.result-container')) initResultPage();

  // Progress barlarni yangilash
  initProgressBars();

  // Radio buttonlarni tanlanganda labelni ajratib ko‘rsatish
  initRadioLabels();

  // Smooth scroll
  initSmoothScroll();
}

// Hamburger menu
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Tashqariga bosganda yopish
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
}

// Matematika testi
function initMathTest() {
  const form = document.getElementById('mathTest');
  const progressFill = document.getElementById('progressFill');
  const currentQ = document.getElementById('currentQ');
  const progressPercent = document.getElementById('progressPercent');

  if (form) {
    form.addEventListener('change', function() {
      updateProgress(form, progressFill, currentQ, progressPercent);
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      calculateScore('math', form);
    });
  }
}

// Ingliz tili testi
function initEnglishTest() {
  const form = document.getElementById('englishTest');
  const progressFill = document.getElementById('progressFillEng');
  const currentQ = document.getElementById('currentQEng');
  const progressPercent = document.getElementById('progressPercentEng');

  if (form) {
    form.addEventListener('change', function() {
      updateProgress(form, progressFill, currentQ, progressPercent);
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      calculateScore('english', form);
    });
  }
}

// IT testi
function initITTest() {
  const form = document.getElementById('itTest');
  const progressFill = document.getElementById('progressFillIT');
  const currentQ = document.getElementById('currentQIT');
  const progressPercent = document.getElementById('progressPercentIT');

  if (form) {
    form.addEventListener('change', function() {
      updateProgress(form, progressFill, currentQ, progressPercent);
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      calculateScore('it', form);
    });
  }
}

// Progress barlarni yangilash
function updateProgress(form, progressFill, currentQ, progressPercent) {
  const totalQuestions = 25;
  const answered = form.querySelectorAll('input[type="radio"]:checked').length;
  const percent = Math.round((answered / totalQuestions) * 100);

  if (progressFill) progressFill.style.width = percent + '%';
  if (currentQ) currentQ.textContent = answered;
  if (progressPercent) progressPercent.textContent = percent + '%';
}

// Test natijasini hisoblash (YANGILANGAN - IT TESTI QO‘SHILDI)
function calculateScore(subject, form) {
  const correctAnswers = {
    math: {
      q1: "a", q2: "b", q3: "b", q4: "b", q5: "b",
      q6: "a", q7: "c", q8: "c", q9: "b", q10: "a",
      q11: "b", q12: "c", q13: "c", q14: "b", q15: "a",
      q16: "b", q17: "a", q18: "c", q19: "a", q20: "a",
      q21: "a", q22: "a", q23: "a", q24: "c", q25: "a"
    },
    english: {
      q1: "b", q2: "a", q3: "a", q4: "b", q5: "a",
      q6: "b", q7: "b", q8: "b", q9: "a", q10: "b",
      q11: "b", q12: "b", q13: "b", q14: "b", q15: "b",
      q16: "b", q17: "b", q18: "b", q19: "a", q20: "b",
      q21: "a", q22: "a", q23: "a", q24: "b", q25: "b"
    },
    it: {
      q1: "a", q2: "c", q3: "b", q4: "b", q5: "b",
      q6: "d", q7: "a", q8: "a", q9: "a", q10: "b",
      q11: "d", q12: "a", q13: "a", q14: "d", q15: "a",
      q16: "a", q17: "a", q18: "a", q19: "a", q20: "a",
      q21: "a", q22: "a", q23: "a", q24: "a", q25: "a"
    }
  };

  const answers = correctAnswers[subject];
  let score = 0;
  const total = Object.keys(answers).length;

  for (let i = 1; i <= total; i++) {
    const questionName = `q${i}`;
    const selected = form.querySelector(`input[name="${questionName}"]:checked`);
    if (selected && selected.value === answers[questionName]) {
      score++;
    }
  }

  localStorage.setItem('testResult', JSON.stringify({
    subject: subject,
    score: score,
    total: total,
    percentage: Math.round((score / total) * 100)
  }));

  window.location.href = 'result.html';
}

// Natija sahifasi
function initResultPage() {
  const result = JSON.parse(localStorage.getItem('testResult'));

  if (!result) {
    window.location.href = 'index.html';
    return;
  }

  displayResults(result);
  initCertificateSystem(result);
}

// Natijalarni ko‘rsatish
function displayResults(result) {
  const scoreElement = document.getElementById('resultScore');
  const titleElement = document.getElementById('resultTitle');
  const textElement = document.getElementById('resultText');
  const correctElement = document.getElementById('correctAnswers');
  const wrongElement = document.getElementById('wrongAnswers');

  const percentage = result.percentage;
  const subjectNames = {
    'math': 'Matematika',
    'english': 'Ingliz Tili',
    'it': 'IT & Dasturlash'
  };
  const subjectName = subjectNames[result.subject] + ' Test';

  if (scoreElement) scoreElement.textContent = percentage + '%';
  if (correctElement) correctElement.textContent = result.score;
  if (wrongElement) wrongElement.textContent = result.total - result.score;

  let message = '';
  let title = '';

  if (percentage >= 90) {
    title = 'Ajoyib Natija! 🎉';
    message = `Siz ${subjectName} fanidan ${result.score}/${result.total} savolga to‘g‘ri javob berdingiz. Mukammal!`;
  } else if (percentage >= 70) {
    title = 'Yaxshi Natija! 👍';
    message = `Siz ${subjectName} fanidan ${result.score}/${result.total} savolga to‘g‘ri javob berdingiz. Juda yaxshi!`;
  } else if (percentage >= 50) {
    title = 'Qoniqarli Natija! 😊';
    message = `Siz ${subjectName} fanidan ${result.score}/${result.total} savolga to‘g‘ri javob berdingiz. Yana bir oz mashq qilishingiz kerak.`;
  } else {
    title = 'Davom Eting! 💪';
    message = `Siz ${subjectName} fanidan ${result.score}/${result.total} savolga to‘g‘ri javob berdingiz. Ko‘proq mashq qilishingiz kerak.`;
  }

  if (titleElement) titleElement.textContent = title;
  if (textElement) textElement.textContent = message;
}

// Sertifikat tizimi
function initCertificateSystem(result) {
  const generateBtn = document.getElementById('generateCert');
  const downloadBtn = document.getElementById('downloadCert');
  const certificate = document.getElementById('certificate');

  if (generateBtn) {
    generateBtn.addEventListener('click', function() {
      const studentName = document.getElementById('studentName').value.trim();

      if (!studentName) {
        alert('Iltimos, ism va familiyangizni kiriting!');
        return;
      }

      generateCertificate(studentName, result);
      if (certificate) {
        certificate.style.display = 'block';
        certificate.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      downloadCertificate();
    });
  }
}

// Sertifikat yaratish
function generateCertificate(name, result) {
  const certName = document.getElementById('certStudentName');
  const certSubject = document.getElementById('certSubject');
  const certScore = document.getElementById('certScore');
  const certDate = document.getElementById('certDate');

  const subjectNames = {
    'math': 'Matematika',
    'english': 'Ingliz Tili',
    'it': 'IT & Dasturlash'
  };
  const subjectName = subjectNames[result.subject] + ' Test';
  const today = new Date().toLocaleDateString('uz-UZ');

  if (certName) certName.textContent = name;
  if (certSubject) certSubject.textContent = subjectName;
  if (certScore) certScore.textContent = `${result.score}/${result.total} (${result.percentage}%)`;
  if (certDate) certDate.textContent = today;
}

// Sertifikatni yuklab olish
function downloadCertificate() {
  const element = document.getElementById('certificate');

  if (!element) {
    alert('Sertifikat topilmadi!');
    return;
  }

  document.body.classList.add('pdf-export');

  const opt = {
    margin: 10,
    filename: 'Maqsadbek_Academy_Sertifikati.pdf',
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: { scale: 3, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    document.body.classList.remove('pdf-export');
  }).catch(error => {
    console.error('PDF yuklab olishda xato:', error);
    document.body.classList.remove('pdf-export');
    alert('Sertifikatni yuklab olishda xato yuz berdi. Iltimos, qaytadan urinib ko‘ring.');
  });
}

// Progress barlarni ishga tushirish
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach(bar => {
    bar.style.width = '0%';
  });
}

// Radio buttonlarni tanlanganda labelni ajratib ko‘rsatish
function initRadioLabels() {
  document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
      const parent = e.target.closest('.quiz-card');
      if (parent) {
        const labels = parent.querySelectorAll('label');
        labels.forEach(label => label.classList.remove('selected'));
        const selectedLabel = e.target.closest('label');
        if (selectedLabel) selectedLabel.classList.add('selected');
      }
    }
  });
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Global functions
window.calculateScore = calculateScore;
window.downloadCertificate = downloadCertificate;
window.generateCertificate = generateCertificate;
