// ==========================
// VARIABLES
// ==========================

let sessionDuration = 30
let time = sessionDuration
let running = false

const timerEl = document.getElementById("timer")
const startBtn = document.getElementById("startBtn")

const candle = document.querySelector(".candle")
const flame = document.querySelector(".flame")

const lightning = document.querySelector(".lightning")
const scene = document.querySelector(".scene")

const rainSound = document.getElementById("rainSound")
const thunderSound = document.getElementById("thunderSound")

let sessionInterval = null

// ==========================
// START BUTTON
// ==========================

startBtn.addEventListener("click", startSession)

function startSession(){

if(running) return

running = true

startBtn.innerText = "Acendendo..."

setTimeout(()=>{

flame.style.opacity = "1"

rainSound.volume = 0.35
rainSound.play()

startBtn.innerText = "Session Running"

sessionInterval = setInterval(updateSession,1000)

},800)

}

// ==========================
// SESSION LOOP
// ==========================

function updateSession(){

time--

updateTimer()
updateCandle()

if(time <= 0){

endSession()

}

}

// ==========================
// TIMER
// ==========================

function updateTimer(){

let minutes = String(Math.floor(time/60)).padStart(2,'0')
let seconds = String(time % 60).padStart(2,'0')

timerEl.innerText = `${minutes}:${seconds}`

}

// ==========================
// CANDLE MELTING
// ==========================

function updateCandle(){

const originalHeight = 120
const minHeight = originalHeight * 0.3

let progress = time / sessionDuration

let newHeight =
minHeight + (originalHeight - minHeight) * progress

candle.style.height = newHeight + "px"

}

// ==========================
// END SESSION
// ==========================

function endSession(){

clearInterval(sessionInterval)

flame.style.opacity = "0"

timerEl.innerText = "Sessão concluída"

startBtn.innerText = "Start Again"

rainSound.pause()

running = false

time = sessionDuration

setTimeout(()=>{

candle.style.height = "120px"

},1500)

}

// ==========================
// LIGHTNING SYSTEM
// ==========================

function lightningFlash(){

let delay = Math.random()*8000 + 4000

setTimeout(()=>{

lightning.style.opacity = 0.9
scene.classList.add("flash")

thunderSound.volume = 0.3
thunderSound.play()

setTimeout(()=>{

lightning.style.opacity = 0
scene.classList.remove("flash")

},120)

lightningFlash()

},delay)

}

lightningFlash()

// ==========================
// RAIN PARTICLES
// ==========================

const canvas = document.getElementById("rainCanvas")
const ctx = canvas.getContext("2d")

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

let rainDrops = []

for(let i=0;i<200;i++){

rainDrops.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
length:10+Math.random()*20,
speed:4+Math.random()*4

})

}

function drawRain(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.strokeStyle="rgba(255,255,255,0.15)"
ctx.lineWidth=1

for(let drop of rainDrops){

ctx.beginPath()

ctx.moveTo(drop.x,drop.y)
ctx.lineTo(drop.x+2,drop.y+drop.length)

ctx.stroke()

drop.y+=drop.speed
drop.x+=0.5

if(drop.y>canvas.height){

drop.y=-20
drop.x=Math.random()*canvas.width

}

}

requestAnimationFrame(drawRain)

}

drawRain()
