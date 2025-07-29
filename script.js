document.addEventListener('DOMContentLoaded', () => {
    console.log("Website siap!");

    // =====================================================================
    // BAGIAN 1: DEFINISI VARIABEL & DATA
    // =====================================================================

    const scheduledMessages = [
        { date: '2025-08-17', title: 'Happy Anniversary ke-3! 🎉', message: 'Tiga tahun yang luar biasa telah kita lewati bersama. Terima kasih untuk setiap tawa, dukungan, dan cinta. Aku tidak sabar untuk melewati tahun-tahun berikutnya bersamamu. Love you!' },
        { date: '2025-10-04', title: 'Happy Birthday Ferra! 🎉', message: 'Selamat ulang tahun bocik Ferra sayang. Yeaayy sekarang sudah 20 wowowowow. Semoga semakin cantik, semakin pintar, semakin dewasa, semakin sayang sama aku. Love you!' },
        { date: '2026-02-14', title: 'Happy Valentine! ❤️', message: 'Buat perempuan tercinta paling luar biasa. Semoga harimu penuh dengan cinta dan kebahagiaan, seperti yang selalu kamu berikan padaku. Love you!' }
    ];
    const quizQuestions = [
        { question: "Di mana kita pertama kali ngedate?", options: ["Nasi Goreng Tenar", "Mbah Mandor", "Bakso Alex", "Torys Grill"], answer: "Mbah Mandor" },
        { question: "Siapa nama kucing pertama yang aku kenal di rumahmu?", options: ["Oyen", "Mochi", "Naina", "Meow", "Sherly"], answer: "Naina" },
        { question: "Apa barang pertama yang aku kasih ke kamu?", options: ["Boneka", "Permen", "Cincin", "Bantal", "Scrap Book"], answer: "Permen" },
        { question: "Apa judul film pertama yang kita tonton bersama?", options: ["Mencuri Raden Saleh", "Guardian of The Galaxy 3", "Inside Out 2", "Doctor Strange: Multiverse of Madness", "Pengabdi Setan 2"], answer: "Pengabdi Setan 2" }
    ];
    const reasonsToLove = [
        "Karena tamu bocil.", "Karena tamu selalu tahu cara bikin aju senang walaupun aju elek.", "Karena tamu orang yang masih mau sabar sama aju sampai sejauh ini.", "Karena kita bisa menjadi 'aneh' bersama-sama.", "Karena tamu selalu mendukung mimpiku.", "Karena di matamu, aju melihat rumah.", "Karena masakanmu (atau usahamu memasak) selalu spesial.", "Karena tamu tidak pernah capek dengerin yapping-an ku.", "Karena tamu bocil paling cantik di dunia.", "Karena tamu kesayanganku.", "Karena aju suka sama tamu", "Karena tamu mau pukpuk aju", "Karena tamu kasih aju semuanya", "Karena tamu bocil pintar", "Karena tamu bisa bikin aju jatuh cinta pandangan pertama", "Karena alobu bocil", "Karena ayo kita nikah", "Karena tamu yang terbaik dibanding semuanya di dunia ini"
    ];
    const specialDates = [
        { date: '2025-08-17', title: 'Menuju Anniversary ke-3 Kita!' },
        { date: '2025-10-04', title: 'Menuju Ulang Tahun Ferra Bocil Yeaayyyy!' },
        { date: '2026-01-01', title: 'Menuju Tahun Baru Bersama!' },
        { date: '2026-02-14', title: 'Menuju Happy Valentine!' },
        { date: '2026-04-10', title: 'Menuju Ulang Tahun Randysta Hehe!' }
    ];

    // --- Seleksi Elemen DOM ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const daysElement = document.getElementById('days-together');
    const levelElement = document.getElementById('relationship-level');
    const catImage = document.getElementById('cat-age-image');
    const progressBar = document.getElementById('relationship-progress');
    const goalElement = document.getElementById('next-anniversary-goal');
    const dateElement = document.getElementById('next-anniversary-date');
    const titleElement = document.getElementById('greeting-title');
    const messageElement = document.getElementById('greeting-message');
    const semuaTombolEmoji = document.querySelectorAll('.reaction-emoji');
    const pesanReaksi = document.getElementById('reaction-message');
    const startScreen = document.getElementById('quiz-start-screen');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultScreen = document.getElementById('quiz-result-screen');
    const startBtn = document.getElementById('start-quiz-btn');
    const restartBtn = document.getElementById('restart-quiz-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackText = document.getElementById('quiz-feedback');
    const scoreText = document.getElementById('quiz-score');
    const totalText = document.getElementById('quiz-total');
    const resultMessageText = document.getElementById('quiz-result-message');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryPage = document.getElementById('gallery');
    const reasonTextElement = document.getElementById('reason-text');
    const newReasonBtn = document.getElementById('new-reason-btn');
    const musicPlayer = document.getElementById('our-song-player');
    const musicBtn = document.getElementById('music-toggle-btn');
    const playIcon = musicBtn ? musicBtn.querySelector('.play-icon') : null;
    const pauseIcon = musicBtn ? musicBtn.querySelector('.pause-icon') : null;
    const messageInput = document.getElementById('guestbook-message');
    const submitButton = document.getElementById('submit-message-btn');
    const entriesContainer = document.getElementById('guestbook-entries');
    const logoElement = document.querySelector('.site-header .logo');
    const secretOverlay = document.getElementById('secret-message-overlay');
    const closeSecretBtn = document.getElementById('close-secret-btn');
    const preloader = document.getElementById('preloader');
    const resetPuzzleBtn = document.getElementById('reset-puzzle-btn');
    const restartPuzzleBtn = document.getElementById('restart-puzzle-btn');
    const undoPuzzleBtn = document.getElementById('undo-puzzle-btn');
    const gamesPage = document.getElementById('games');
    
    // --- Variabel State ---
    let currentQuestionIndex = 0;
    let score = 0;
    let puzzleMoveHistory = [];
    let messages = [];
    let logoClickCount = 0;
    const clicksNeeded = 3;
    let clickResetTimer = null;
    const puzzleImageSrc = 'images/games/puzzle_photo.jpg';
    const puzzleSize = 4;
    const pieceSize = 80;


    // =====================================================================
    // BAGIAN 2: DEFINISI FUNGSI
    // =====================================================================
    
    function applyTimeBasedTheme() {
        const currentHour = new Date().getHours();
        if (currentHour >= 18 || currentHour < 6) {
            document.body.classList.add('theme-night');
        } else {
            document.body.classList.add('theme-day');
        }
    }

    function checkScheduledMessages() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayString = `${year}-${month}-${day}`;
        const todaysMessage = scheduledMessages.find(item => item.date === todayString);
        if (todaysMessage && titleElement && messageElement) {
            titleElement.textContent = todaysMessage.title;
            messageElement.textContent = todaysMessage.message;
        }
    }

    function updateRelationshipCounter() {
        if (!daysElement || !levelElement || !catImage || !progressBar || !goalElement || !dateElement) return;
        const startDate = new Date('2022-08-17T00:00:00');
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        daysElement.textContent = totalDays;
        let yearsPassed = now.getFullYear() - startDate.getFullYear();
        const anniversaryThisYear = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
        if (now < anniversaryThisYear) yearsPassed--;
        const currentLevel = yearsPassed + 1;
        levelElement.textContent = `Level ${currentLevel}`;
        catImage.src = `images/cats/cat_level_${currentLevel}.png`;
        catImage.alt = `Kucing Level ${currentLevel}`;
        const lastAnniversary = new Date(startDate.getFullYear() + yearsPassed, startDate.getMonth(), startDate.getDate());
        const nextAnniversary = new Date(startDate.getFullYear() + yearsPassed + 1, startDate.getMonth(), startDate.getDate());
        const totalDurationForLevel = nextAnniversary - lastAnniversary;
        const progressInLevel = now - lastAnniversary;
        const progressPercentage = (progressInLevel / totalDurationForLevel) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        goalElement.textContent = `Menuju Anniversary ke-${currentLevel}`;
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = nextAnniversary.toLocaleDateString('id-ID', options);
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        startScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        feedbackText.textContent = '';
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectAnswer(option, button));
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedOption, button) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        optionsContainer.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
        if (selectedOption === currentQuestion.answer) {
            score++;
            button.classList.add('correct');
            feedbackText.textContent = "Benar! Kamu hebat!";
            feedbackText.style.color = "#22c55e";
        } else {
            button.classList.add('wrong');
            feedbackText.textContent = `Salah, jawaban yang benar adalah "${currentQuestion.answer}"`;
            feedbackText.style.color = "#ef4444";
        }
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) showQuestion();
            else showResult();
        }, 2000);
    }

    function showResult() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        scoreText.textContent = score;
        totalText.textContent = quizQuestions.length;
        const percentage = (score / quizQuestions.length) * 100;
        if (percentage === 100) {
            resultMessageText.textContent = "🤩 SEMPURNA! Aku bangga banget kamu ingat semua detail kecil tentang kita. Kamu memang yang terbaik! 💖";
        } else if (percentage >= 75) {
            resultMessageText.textContent = "🥰 Hebat! Hampir semua benar. Aku seneng banget kamu masih simpan momen-momen itu di hati.";
        } else if (percentage >= 50) {
            resultMessageText.textContent = "😊 Keren! Lebih dari separuh kamu jawab benar. Nggak semua harus diingat, yang penting kita jalaninya bareng.";
        } else {
            resultMessageText.textContent = "😂 Hehe, nggak apa-apa kalau ada yang lupa. Justru ini jadi alasan buat kita ngobrolin lagi kenangan lama dan bikin yang baru!";
        }
    }

    function closeLightbox() {
        if(lightbox) lightbox.classList.add('hidden');
    }

    function showNewReason() {
        if (!reasonTextElement) return;
        const randomIndex = Math.floor(Math.random() * reasonsToLove.length);
        const randomReason = reasonsToLove[randomIndex];
        reasonTextElement.style.opacity = 0;
        setTimeout(() => {
            reasonTextElement.textContent = randomReason;
            reasonTextElement.style.opacity = 1;
        }, 300);
    }

    function toggleMusic() {
        if (musicPlayer.paused) {
            musicPlayer.play();
            if (playIcon) playIcon.classList.add('hidden');
            if (pauseIcon) pauseIcon.classList.remove('hidden');
        } else {
            musicPlayer.pause();
            if (playIcon) playIcon.classList.remove('hidden');
            if (pauseIcon) pauseIcon.classList.add('hidden');
        }
    }

    function displayMessages() {
        if (!entriesContainer) return;
        entriesContainer.innerHTML = '';
        if (messages.length === 0) {
            entriesContainer.innerHTML = '<p style="text-align: center; color: #a1a1aa;">Belum ada catatan...</p>';
            return;
        }
        messages.forEach(msg => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('guestbook-entry');
            entryDiv.innerHTML = `
                <p class="message-text">${msg.text}</p>
                <p class="message-date">${msg.date}</p>
            `;
            entriesContainer.prepend(entryDiv);
        });
    }

    function submitMessage() {
        if (!messageInput) return;
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            messages.push({ text: messageText, date: formattedDate });
            messageInput.value = '';
            displayMessages();
        }
    }

    function updateCountdown() {
        const now = new Date();
        const countdownContainer = document.getElementById('countdown-container');
        let nextSpecialDate = null;
        for (const event of specialDates) {
            const eventDate = new Date(event.date);
            if (eventDate > now) {
                nextSpecialDate = event;
                break;
            }
        }
        if (!nextSpecialDate) {
            if(countdownContainer) countdownContainer.style.display = 'none';
            return;
        }
        if(countdownContainer) countdownContainer.style.display = 'block';
        document.getElementById('countdown-title').textContent = nextSpecialDate.title;
        const targetDate = new Date(nextSpecialDate.date);
        const totalSeconds = (targetDate - now) / 1000;
        const days = Math.floor(totalSeconds / 3600 / 24);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds) % 60;
        document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
        document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    function setupPuzzle() {
        puzzleMoveHistory = [];
        const pieceContainer = document.getElementById('piece-container');
        const boardContainer = document.getElementById('board-container');
        const winScreen = document.getElementById('puzzle-win-screen');
        if (!pieceContainer || !boardContainer || !winScreen) return;

        pieceContainer.innerHTML = '';
        boardContainer.innerHTML = '';
        winScreen.classList.add('hidden');
        boardContainer.style.gridTemplateColumns = `repeat(${puzzleSize}, 1fr)`;

        let pieces = [];
        for (let i = 0; i < puzzleSize * puzzleSize; i++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.draggable = true;
            piece.style.backgroundImage = `url('${puzzleImageSrc}')`;
            const row = Math.floor(i / puzzleSize);
            const col = i % puzzleSize;
            piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
            piece.dataset.id = i.toString();
            pieces.push(piece);
            const slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.dataset.id = i.toString();
            boardContainer.appendChild(slot);
        }

        pieces.forEach(piece => {
            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                setTimeout(() => e.target.style.visibility = 'hidden', 0);
            });
            piece.addEventListener('dragend', (e) => {
                e.target.style.visibility = 'visible';
            });
        });

        const allSlots = boardContainer.querySelectorAll('.puzzle-slot');
        allSlots.forEach(slot => {
            slot.addEventListener('dragover', (e) => e.preventDefault());
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                const pieceId = e.dataTransfer.getData('text/plain');
                const draggedPiece = document.querySelector(`.puzzle-piece[data-id='${pieceId}']`);
                if (!draggedPiece) return;
                const sourceContainer = draggedPiece.parentElement;
                const targetSlot = e.currentTarget;
                const existingPiece = targetSlot.children.length > 0 ? targetSlot.children[0] : null;
                puzzleMoveHistory.push({
                    piece: draggedPiece,
                    from: sourceContainer,
                    to: targetSlot,
                    swappedPiece: existingPiece
                });
                if (existingPiece) {
                    sourceContainer.appendChild(existingPiece);
                }
                targetSlot.appendChild(draggedPiece);
                checkWinCondition();
            });
        });
        
        pieceContainer.addEventListener('dragover', (e) => e.preventDefault());
        pieceContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            const pieceId = e.dataTransfer.getData('text/plain');
            const draggedPiece = document.querySelector(`.puzzle-piece[data-id='${pieceId}']`);
            if (!draggedPiece) return;
            const sourceContainer = draggedPiece.parentElement;
            puzzleMoveHistory.push({ piece: draggedPiece, from: sourceContainer, to: pieceContainer, swappedPiece: null });
            pieceContainer.appendChild(draggedPiece);
        });

        pieces.sort(() => Math.random() - 0.5);
        pieces.forEach(p => pieceContainer.appendChild(p));
    }

    function checkWinCondition() {
        const slots = document.querySelectorAll('#board-container .puzzle-slot');
        const isWin = Array.from(slots).every(slot => 
            slot.children.length > 0 && slot.children[0].dataset.id === slot.dataset.id
        );
        if (isWin) {
            const winScreen = document.getElementById('puzzle-win-screen');
            if (winScreen) winScreen.classList.remove('hidden');
        }
    }

    function undoPuzzleMove() {
        if (puzzleMoveHistory.length === 0) return;
        const lastMove = puzzleMoveHistory.pop();
        lastMove.from.appendChild(lastMove.piece);
        if (lastMove.swappedPiece) {
            lastMove.to.appendChild(lastMove.swappedPiece);
        }
    }

    // =====================================================================
    // BAGIAN 3: EVENT LISTENERS & PEMANGGILAN FUNGSI AWAL
    // =====================================================================

    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.page;
            pages.forEach(page => page.classList.remove('active'));
            navLinks.forEach(navLink => navLink.classList.remove('active-link'));
            document.getElementById(targetId).classList.add('active');
            link.classList.add('active-link');
        });
    });

    if (semuaTombolEmoji.length > 0 && pesanReaksi) {
        semuaTombolEmoji.forEach(tombol => {
            tombol.addEventListener('click', () => {
                const emojiYangDiklik = tombol.textContent;
                let feedbackMessage = "";
                switch (emojiYangDiklik) {
                    case '😠': feedbackMessage = "Yah, maaf ya kalau websitenya elek. Aku perbaiki lagi. Menurutmu, apa yang paling kurang dari website ini?"; break;
                    case '😐': feedbackMessage = "Hehe, maaf ya kalau aneh atau websitenya ngebosenin. Menurutmu, apa yang bisa aku tambahin biar lebih seru?"; break;
                    case '😊': feedbackMessage = "Okeey bocil! Aku masih belajar bikin web, hehe. Kamu mau kasih saran fitur apa biar jadi lebih bagus?"; break;
                    case '🤩': feedbackMessage = "Kerennnn! Makasih ya udah mau explore webnya. Semoga kamu suka sama hadiah kecil ini."; break;
                    case '🥰': feedbackMessage = "Alobu! Makasih banyak ya udah mau cobain semua fitur di website ini. Aku seneng banget kamu suka! Love you bocikk!"; break;
                    default: feedbackMessage = "Terima kasih atas reaksimu!";
                }
                pesanReaksi.textContent = feedbackMessage;
                pesanReaksi.style.opacity = 1;
                setTimeout(() => { pesanReaksi.style.opacity = 0; }, 5000);
            });
        });
    }

    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', startQuiz);

    if (galleryPage) {
        galleryPage.addEventListener('click', e => {
            if (e.target.tagName === 'IMG' && e.target.closest('.month-photos')) {
                lightbox.classList.remove('hidden');
                lightboxImg.src = e.target.src;
                lightboxCaption.textContent = e.target.alt;
            }
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    if (newReasonBtn) newReasonBtn.addEventListener('click', showNewReason);
    if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
    if (submitButton) submitButton.addEventListener('click', submitMessage);

    if (logoElement) {
        logoElement.addEventListener('click', () => {
            logoClickCount++;
            clearTimeout(clickResetTimer);
            clickResetTimer = setTimeout(() => { logoClickCount = 0; }, 2000);
            if (logoClickCount === clicksNeeded) {
                if (secretOverlay) secretOverlay.classList.remove('hidden');
                logoClickCount = 0;
            }
        });
    }
    if (closeSecretBtn) {
        closeSecretBtn.addEventListener('click', () => {
            if (secretOverlay) secretOverlay.classList.add('hidden');
        });
    }

    if (restartPuzzleBtn) restartPuzzleBtn.addEventListener('click', setupPuzzle);
    if (resetPuzzleBtn) resetPuzzleBtn.addEventListener('click', setupPuzzle);
    if (undoPuzzleBtn) undoPuzzleBtn.addEventListener('click', undoPuzzleMove);
    if (gamesPage) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class' && gamesPage.classList.contains('active')) {
                    setupPuzzle();
                }
            });
        });
        observer.observe(gamesPage, { attributes: true });
    }

    // --- Panggilan Fungsi Awal Saat Halaman Dimuat ---
    applyTimeBasedTheme();
    updateRelationshipCounter();
    checkScheduledMessages();
    showNewReason();
    displayMessages();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});