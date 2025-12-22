/**
 * Alon Pet v2 - Content Script
 * Manages the visual presence, animations, and interaction logic on the webpage.
 */

// 1. Initialize Mood System (Assumes mood.js is loaded first via manifest)
const moodSystem = new MoodManager();

// 2. DOM Elements Creation
const container = document.createElement('div');
container.id = 'alon-container';

const bubble = document.createElement('div');
bubble.id = 'alon-bubble';

// Wrapper separates the "Flip" animation from the "Jiggle" animation
const wrapper = document.createElement('div');
wrapper.id = 'alon-wrapper';

const sprite = document.createElement('img');
sprite.id = 'alon-sprite';
// Ensures the image is pulled from the extension assets
sprite.src = chrome.runtime.getURL('alon.gif'); 

// Assemble the structure
wrapper.appendChild(sprite);
container.appendChild(bubble);
container.appendChild(wrapper);
document.body.appendChild(container);

// 3. Mood & Movement Application
function applyMood(state) {
    // Set the walk speed via the CSS variable defined in style.css
    container.style.setProperty('--walk-speed', state.speed);
    
    // Adjust opacity for 'sleepy' mood
    container.style.opacity = state.opacity;
    
    // Ensure the flipping direction animation matches the walking speed
    wrapper.style.setProperty('animation-duration', state.speed);
}

// 4. Interaction: Petting/Wake Up Logic
function performPetAction() {
    // Logic: Force mood to 'happy'
    moodSystem.pet();
    
    // Visuals: Trigger the jiggle animation defined in style.css
    sprite.classList.remove('pet-animation');
    void sprite.offsetWidth; // Force DOM reflow to restart animation
    sprite.classList.add('pet-animation');
}

// Click directly on Alon to pet him
sprite.addEventListener('click', (e) => {
    e.stopPropagation();
    performPetAction();
});

// 5. Message Listener (Handles Popup & Background triggers)
let quoteTimer; 
const quotes = [
    "You've got this, Sakin!",
    "ALON believes in your code!",
    "Errors are just part of the journey.",
    "Keep walking toward your goals!",
    "Stay focused and stay awesome!",
    "Success is 1% inspiration and 99% perspiration."
];

chrome.runtime.onMessage.addListener((request) => {
    // Action from "Get Quote" button or Background Timer
    if (request.action === "show_quote") {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        
        // Clear existing timer for consistent 5-second display
        if (quoteTimer) clearTimeout(quoteTimer);

        bubble.textContent = quote;
        bubble.style.display = 'block';
        
        quoteTimer = setTimeout(() => { 
            bubble.style.display = 'none'; 
            quoteTimer = null; 
        }, 5000); 
    }
    
    // Action from "Wake Up" button in Popup
    if (request.action === "pet_alon") {
        performPetAction();
    }
});

// 6. Behavior: Random Pauses (Simulates thinking/idling)
setInterval(() => {
    const state = moodSystem.getState();
    // Roll the dice based on current mood's pause chance
    if (Math.random() < state.pauseChance) {
        container.classList.add('paused');
        wrapper.classList.add('paused'); 
        
        // Stay paused for 2-5 seconds
        setTimeout(() => {
            container.classList.remove('paused');
            wrapper.classList.remove('paused');
        }, 2000 + Math.random() * 3000);
    }
}, 10000);

// 7. Event Listeners for State Updates
window.addEventListener('moodChange', () => {
    applyMood(moodSystem.getState());
});

// Manual close for bubble
bubble.addEventListener('click', () => {
    bubble.style.display = 'none';
    if (quoteTimer) clearTimeout(quoteTimer);
});

// Initial state application on load
applyMood(moodSystem.getState());
