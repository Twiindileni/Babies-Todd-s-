// ABC Game Logic with kid-friendly voice
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let currentLetterIndex = 0;

function playKidVoice(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    // Set voice to be more kid-friendly
    utterance.pitch = 1.5; // Higher pitch
    utterance.rate = 0.8;  // Slightly slower
    utterance.volume = 1;  // Full volume
    
    // Try to use a female voice if available
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('girl'));
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }

    // Add encouraging words for letters
    const words = {
        'A': 'A is for Apple!',
        'B': 'B is for Ball!',
        'C': 'C is for Cat!',
        // ... add more words for each letter
    };

    if (words[text]) {
        utterance.text = words[text];
    }

    speechSynthesis.speak(utterance);
}

function updateLetter() {
    const letter = alphabet[currentLetterIndex];
    document.getElementById('currentLetter').textContent = letter;
    document.getElementById('letterImage').src = `images/games/${letter}.png`;
    document.getElementById('letterImage').alt = `Letter ${letter}`;
}

document.getElementById('prevLetter').addEventListener('click', () => {
    currentLetterIndex = (currentLetterIndex - 1 + 26) % 26;
    updateLetter();
});

document.getElementById('nextLetter').addEventListener('click', () => {
    currentLetterIndex = (currentLetterIndex + 1) % 26;
    updateLetter();
});

document.getElementById('playSound').addEventListener('click', () => {
    const letter = alphabet[currentLetterIndex];
    playKidVoice(letter);
});

// Memory Game Logic with larger emojis and more kid-friendly options
const emojis = ['🦁', '🐘', '🦒', '🐵', '🐰', '🐼', '🦊', '🐸'];
const cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function createMemoryGame() {
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    shuffleCards();
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(this)) return;

    this.textContent = this.dataset.value;
    this.classList.add('flipped');
    flippedCards.push(this);

    // Play fun sound when card is flipped
    playCardFlipSound();

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function playCardFlipSound() {
    const audio = new Audio('sounds/flip.mp3');
    audio.play();
}

function playMatchSound() {
    const audio = new Audio('sounds/match.mp3');
    audio.play();
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        playMatchSound();
        
        // Add celebration animation
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        if (matchedPairs === 8) {
            setTimeout(() => {
                playKidVoice("Congratulations! You won the game!");
                showCelebration();
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 500);
    }
    flippedCards = [];
}

function showCelebration() {
    // Add confetti or celebration animation
    alert("🎉 Yay! You found all the matches! 🎉");
}

document.getElementById('restartMemory').addEventListener('click', () => {
    matchedPairs = 0;
    createMemoryGame();
});

// Color Game Logic with kid-friendly voice
const colors = [
    { name: 'Red', value: '#FF0000', word: 'Red like an apple!' },
    { name: 'Blue', value: '#0000FF', word: 'Blue like the sky!' },
    { name: 'Green', value: '#00FF00', word: 'Green like grass!' },
    { name: 'Yellow', value: '#FFFF00', word: 'Yellow like the sun!' },
    { name: 'Purple', value: '#800080', word: 'Purple like grapes!' },
    { name: 'Orange', value: '#FFA500', word: 'Orange like an orange!' }
];

let currentColorIndex = 0;

function updateColor() {
    const color = colors[currentColorIndex];
    document.getElementById('colorBox').style.backgroundColor = color.value;
    document.getElementById('colorName').textContent = color.name;
}

document.getElementById('prevColor').addEventListener('click', () => {
    currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
    updateColor();
});

document.getElementById('nextColor').addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    updateColor();
});

document.getElementById('playColorSound').addEventListener('click', () => {
    const color = colors[currentColorIndex];
    playKidVoice(color.word);
});

// Initialize games
updateLetter();
createMemoryGame();
updateColor(); 