class MoodManager {
    constructor() {
        // Load saved mood or default to happy
        this.currentMood = localStorage.getItem('alon_mood') || 'happy';
        this.lastActivity = Date.now();
        
        // Define behaviors for each mood
        this.states = {
            happy: { speed: '20s', opacity: '1', pauseChance: 0.05 },
            bored: { speed: '40s', opacity: '1', pauseChance: 0.3 },
            sleepy: { speed: '60s', opacity: '0.7', pauseChance: 0.7 }
        };

        // Track user activity to determine mood
        this.attachListeners();
        
        // Check mood status every 5 seconds
        setInterval(() => this.updateMood(), 5000);
    }

    attachListeners() {
        ['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
            document.addEventListener(event, () => this.resetActivity());
        });
    }

    resetActivity() {
        this.lastActivity = Date.now();
        // If he was sleepy, wake him up immediately
        if (this.currentMood === 'sleepy') {
            this.updateMood();
        }
    }

    updateMood() {
        const idleTime = (Date.now() - this.lastActivity) / 1000; // in seconds
        let newMood = 'happy';

        if (idleTime > 300) { // 5 mins idle
            newMood = 'sleepy';
        } else if (idleTime > 60) { // 1 min idle
            newMood = 'bored';
        }

        if (newMood !== this.currentMood) {
            this.setMood(newMood);
        }
    }

    setMood(mood) {
        this.currentMood = mood;
        localStorage.setItem('alon_mood', mood);
        console.log(`Alon mood changed to: ${mood}`);
        
        // Notify content.js to update graphics
        window.dispatchEvent(new CustomEvent('moodChange', { detail: mood }));
    }

    // Called when user pets Alon
    pet() {
        this.resetActivity();
        this.setMood('happy');
    }

    getState() {
        return this.states[this.currentMood];
    }
}