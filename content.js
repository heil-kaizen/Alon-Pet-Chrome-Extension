/**
 * Alon Pet v2.5 - Content Script
 * Handles Animations, Idle Sleep, and Random Reactions.
 */

class PetController {
    constructor() {
        this.state = 'walking'; // walking, sleeping, jumping, eating
        this.idleTimer = null;
        this.randomTimer = null;
        this.animationTimer = null;

        // Configuration
        this.GIFS = {
            walk: chrome.runtime.getURL('alon.gif'),
            sleep: chrome.runtime.getURL('alon-sleep.gif'),
            jump: chrome.runtime.getURL('alon-jump.gif'),
            money: chrome.runtime.getURL('alon-money.gif')
        };
        
        this.IDLE_THRESHOLD = 120000; // 2 minutes (120,000 ms)
        this.ANIMATION_DURATION = 8000; // 8 seconds per action GIF
    }

    init() {
        this.createDOM();
        this.startIdleTracker();
        this.scheduleNextRandomAction();
        this.setupMessageListener();
    }

    createDOM() {
        // Create Container
        this.container = document.createElement('div');
        this.container.id = 'alon-container';

        // Bubble
        this.bubble = document.createElement('div');
        this.bubble.id = 'alon-bubble';

        // Wrapper (for flipping)
        this.wrapper = document.createElement('div');
        this.wrapper.id = 'alon-wrapper';

        // Sprite
        this.sprite = document.createElement('img');
        this.sprite.id = 'alon-sprite';
        this.sprite.src = this.GIFS.walk;

        // Assemble
        this.wrapper.appendChild(this.sprite);
        this.container.appendChild(this.bubble);
        this.container.appendChild(this.wrapper);
        document.body.appendChild(this.container);
    }

    // --- FEATURE 1: IDLE SLEEP LOGIC ---
    startIdleTracker() {
        // Reset timer on any mouse movement
        document.addEventListener('mousemove', () => this.resetIdleTimer());
        document.addEventListener('keydown', () => this.resetIdleTimer());
        document.addEventListener('scroll', () => this.resetIdleTimer());

        // Start the initial timer
        this.resetIdleTimer();
    }

    resetIdleTimer() {
        // If he was sleeping, WAKE UP immediately
        if (this.state === 'sleeping') {
            this.setWalking();
        }

        // Clear existing timer
        if (this.idleTimer) clearTimeout(this.idleTimer);

        // Set new timer for 2 minutes
        this.idleTimer = setTimeout(() => {
            this.setSleeping();
        }, this.IDLE_THRESHOLD);
    }

    // --- FEATURE 2: RANDOM REACTIONS ---
    scheduleNextRandomAction() {
        // Random time between 60s (60000ms) and 120s (120000ms)
        const delay = Math.floor(Math.random() * (120000 - 60000 + 1) + 60000);

        if (this.randomTimer) clearTimeout(this.randomTimer);

        this.randomTimer = setTimeout(() => {
            // Only trigger if we are currently just walking
            if (this.state === 'walking') {
                // 50/50 chance for Jump or Money
                Math.random() > 0.5 ? this.playAnimation('jump') : this.playAnimation('money');
            }
            // Recursively schedule the next one
            this.scheduleNextRandomAction();
        }, delay);
    }

    // --- STATE & ANIMATION MANAGER ---
    setWalking() {
        console.log("Alon: Returning to Walk");
        this.state = 'walking';
        this.sprite.src = this.GIFS.walk;
        
        // Remove 'paused' so he starts moving across screen again
        this.container.classList.remove('paused');
        this.wrapper.classList.remove('paused');
    }

    setSleeping() {
        if (this.state === 'sleeping') return; // Already sleeping
        console.log("Alon: Going to Sleep (Idle)");
        
        this.state = 'sleeping';
        this.sprite.src = this.GIFS.sleep;
        
        // Add 'paused' to stop sliding movement
        this.container.classList.add('paused');
        this.wrapper.classList.add('paused');
    }

    playAnimation(type) {
        if (this.state === 'sleeping') return; // Don't interrupt sleep for random actions
        console.log(`Alon: Playing ${type}`);

        this.state = type; // 'jump' or 'money'
        this.sprite.src = this.GIFS[type];

        // Pause movement so he performs action in place
        this.container.classList.add('paused');
        this.wrapper.classList.add('paused');

        // Reset back to walking after 8 seconds
        if (this.animationTimer) clearTimeout(this.animationTimer);
        this.animationTimer = setTimeout(() => {
            this.setWalking();
        }, this.ANIMATION_DURATION);
    }

    // --- MESSAGING SYSTEM ---
    setupMessageListener() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            // 1. Manual Triggers
            if (request.action === "trigger_jump") this.playAnimation('jump');
            if (request.action === "trigger_money") this.playAnimation('money');
            if (request.action === "trigger_sleep") this.setSleeping();
            
            // 2. Quote System (Legacy Support)
            if (request.action === "show_quote") this.showQuote();
        });
    }

    showQuote() {
        const quotes = ["You've got this!", "Keep clicking", "Alon is proud of you.", "Touch grass.", "Take a break!", "You'r HIM"];
        const text = quotes[Math.floor(Math.random() * quotes.length)];
        this.bubble.textContent = text;
        this.bubble.style.display = 'block';
        setTimeout(() => { this.bubble.style.display = 'none'; }, 5000);
    }
}

// Initialize
const alonPet = new PetController();
alonPet.init();
