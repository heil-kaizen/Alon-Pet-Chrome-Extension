// 1. Setup Elements
const container = document.createElement('div');
container.id = 'alon-container';

const bubble = document.createElement('div');
bubble.id = 'alon-bubble';
container.appendChild(bubble);

const sprite = document.createElement('img');
sprite.id = 'alon-sprite';
sprite.src = chrome.runtime.getURL('alon.gif'); // Use the alon.gif filename
container.appendChild(sprite);

document.body.appendChild(container);

// 2. Motivational Library
const quotes = [
    "Keep going, Alon believes in you!",
    "Don't stop until you're proud!",
    "Glory of the latter will be greater than the former.",
    "You are doing a great job, keep it up!",
    "Bugs are just unplanned features. 🐛",
    "Keep clicking ur just one trade away from freedom!",
    "Drink some water and stay hydrated! 💧"
];

// 3. Interaction Logic
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "show_quote") {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    bubble.textContent = quote;
    bubble.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => { bubble.style.display = 'none'; }, 5000);
  }
});