// ASSETS
import shotSound from '../../assets/sounds/shot.mp3'
import hitSound from '../../assets/sounds/hit.mp3'
import missSound from '../../assets/sounds/miss.mp3'

const Sound = (() => {
  // Play audio with Web Audio API to avoid delay
  function playSound(soundUrl) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

      const request = new XMLHttpRequest()
      request.open('GET', soundUrl, true)
      request.responseType = 'arraybuffer'
      request.onerror = () => {
        console.error(`Failed to load sound: ${soundUrl}`)
      }
      request.onload = () => {
        audioCtx.decodeAudioData(
          request.response,
          (buffer) => {
            const source = audioCtx.createBufferSource()
            source.buffer = buffer
            source.connect(audioCtx.destination)
            source.start(0)
          },
          (err) => {
            console.error(`Failed to decode audio: ${soundUrl}`, err)
          }
        )
        audioCtx.resume()
      }
      request.send()
    } catch (err) {
      console.error('Audio playback failed:', err)
    }
  }

  function shot() {
    playSound(shotSound)
  }

  function hit() {
    playSound(hitSound)
  }

  function miss() {
    playSound(missSound)
  }

  // LOAD BACKGROUND AUDIO ASYNCHRONOUSLY
  async function background() {
    try {
      const audioModule = await import('../../assets/sounds/backgroundOcean.mp3')
      const audio = new Audio(audioModule.default)
      audio.loop = true
      await audio.play()
    } catch (err) {
      console.warn('Background audio failed to play:', err)
    }
  }
  // PLAY BACKGROUND AUDIO ON FIRST CLICK/TAP
  function BackgroundOnFirstTouch() {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      document.addEventListener('touchstart', background, { once: true })
    } else {
      document.addEventListener('click', background, { once: true })
    }
  }

  return { shot, hit, miss, BackgroundOnFirstTouch }
})()

export default Sound
