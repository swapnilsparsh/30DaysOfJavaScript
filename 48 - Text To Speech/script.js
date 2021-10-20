const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const textInput = document.getElementById('text')
const speedInput = document.getElementById('speed')
voiceSelectInput = document.getElementById('voiceSelectInput');

let currentCharacter

playButton.addEventListener('click', () => {
  playText(textInput.value)
})
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)
speedInput.addEventListener('input', () => {
  stopText()
  playText(utterance.text.substring(currentCharacter))
})

synth = window.speechSynthesis;


getVoices = () => {
  //  get all voice name from api
allVoices = synth.getVoices();
allVoices.forEach(voice => {
  option  = document.createElement('option')
  option.textContent = voice.name;
  option.setAttribute('data-voice',voice.name);
  voiceSelectInput.appendChild(option)
}) 
} 

const utterance = new SpeechSynthesisUtterance()

speechSynthesis.onvoiceschanged  = getVoices 
getVoices()

function playText(text) {

  selectedVoice = voiceSelectInput.selectedOptions[0].getAttribute('data-voice');

  allVoices.forEach(voice => {
 if(selectedVoice == voice.name){
    utterance.voice = voice;
 }
 }) 

  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume()
  }
  if (speechSynthesis.speaking) return
  utterance.text = text
  utterance.rate = speedInput.value
  speechSynthesis.speak(utterance)
  
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
  speechSynthesis.resume()
  speechSynthesis.cancel()
}