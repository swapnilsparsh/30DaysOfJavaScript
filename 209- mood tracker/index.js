const moodHistory = [];

function trackMoodButtonHandler() {
    const moodSelector = document.getElementById('mood');
    const selectedMood = moodSelector.value;

    if (selectedMood) {
        trackMood(selectedMood);
    }
}

function trackMood(mood) {
    moodHistory.push(mood);
    displayMoodHistory();
}

function displayMoodHistory() {
    const moodHistoryElement = document.getElementById('moodHistory');
    moodHistoryElement.innerHTML = `<strong>Your Mood History:</strong><br>${moodHistory.map(mood => getMoodEmoji(mood)).join(' ')}`;
}

function getMoodEmoji(mood) {
    const emojis = {
        happy: '😊',
        sad: '😢',
        angry: '😠',
        calm: '😌',
        excited: '🎉',
        // Add more emojis as needed
    };

    return `${emojis[mood]} ${mood}`;
}

// Pure functional component for the "Track Mood" button
function TrackMoodButton() {
    const button = document.createElement('button');
    button.textContent = 'Track Mood';
    button.className = 'track-button';
    button.onclick = trackMoodButtonHandler;
    return button;
}

// Append the button to the mood selector div
const moodSelectorDiv = document.querySelector('.mood-selector');
moodSelectorDiv.appendChild(TrackMoodButton());
