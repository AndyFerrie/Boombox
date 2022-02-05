const rewind = document.getElementById('rewind');
const play = document.getElementById("play");
const fastforward = document.getElementById('fastforward');
const stop = document.getElementById('stop');
const pause = document.getElementById('pause');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const title = document.getElementById('title');

// Tracks

const track = ['Adam F - Circles (Album Edit)', 'Blind Faith ft. Liam Bailey - Chase and Status (No More Idols)', 'Boymerang - Soul Beat Runna', 'LTJ Bukem - Music', 'Severity - Lady']

let trackIndex = 0

// Load track

loadTrack(track[trackIndex])

// Track Details

function loadTrack(track) {
    title.innerText = track
    audio.src = `music/${track}.mp3`
}

function playTrack() {
    audio.play()
}

function pauseTrack() {
    audio.pause()
}

function stopTrack() {
    audio.currentTime = 0;
    audio.pause();
}

function prevTrack() {
    trackIndex--

    if(trackIndex < 0) {
        trackIndex = track.length - 1
    }

    loadTrack(track[trackIndex])
    playTrack()
    playAnimation()
}

function nextTrack() {
    trackIndex++

    if(trackIndex > track.length - 1) {
        trackIndex = 0
    }

    loadTrack(track[trackIndex])
    playTrack()
    playAnimation()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

function playAnimation () {
    var allElements = document.querySelectorAll(".animate");
    for (i=0; i<allElements.length; i++) {
        allElements[i].classList.add('play');
    }
}

function stopAnimation () {
    var allElements = document.querySelectorAll(".animate");
    for (i=0; i<allElements.length; i++) {
        allElements[i].classList.remove('play');
    }
}

// Event Listeners

play.addEventListener("click", function play() {
    playAnimation();
    playTrack();
})

stop.addEventListener("click", function stop() {
    stopAnimation();
    stopTrack();
})

pause.addEventListener("click", function pause() {
    stopAnimation();
    pauseTrack();
})

// Rewind & FF

rewind.addEventListener("click", prevTrack)
fastforward.addEventListener("click", nextTrack)

audio.addEventListener("timeupdate",  updateProgress)

progressContainer.addEventListener("click", setProgress)

audio.addEventListener("ended", nextTrack)