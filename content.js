// 1. Setup Elements
const container = document.createElement('div');
container.id = 'alon-container';

const bubble = document.createElement('div');
bubble.id = 'alon-bubble';
container.appendChild(bubble);

const sprite = document.createElement('img');
sprite.id = 'alon-sprite';
sprite.src = chrome.runtime.getURL('alon.gif'); 
container.appendChild(sprite);

document.body.appendChild(container);

// 2. Quote Library
const quotes = [
    "Keep going, Alon believes in you!",
    "Don't stop until you're proud!",
    "Glory of the latter will be greater than the former.",
    "You are doing a great job, keep it up!",
    "Bugs are just unplanned features. 🐛",
    "Keep clicking ur just one trade away from freedom!",
    "Drink some water and stay hydrated! 💧"

];

// 3. Timing Logic (Consistency Fix)
let quoteTimer; 

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "show_quote") {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Clear existing timer so the 5 seconds is consistent
    if (quoteTimer) {
      clearTimeout(quoteTimer);
    }

    bubble.textContent = quote;
    bubble.style.display = 'block';
    
    // Consistent 5-second visibility
    quoteTimer = setTimeout(() => { 
      bubble.style.display = 'none'; 
      quoteTimer = null; 
    }, 5000); 
  }
});

// 4. Interactive: Click bubble to hide it manually
bubble.addEventListener('click', () => {
    bubble.style.display = 'none';
    if (quoteTimer) clearTimeout(quoteTimer);
});
