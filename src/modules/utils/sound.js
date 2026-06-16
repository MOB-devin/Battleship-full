import bgAudioSrc from '../../assets/sounds/final-waltz-matt-stewart-evans-main-version-42725-02-03.mp3'
import hitAudioSrc from '../../assets/sounds/hit.mp3'
import missAudioSrc from '../../assets/sounds/miss.mp3'
import shotAudioSrc from '../../assets/sounds/cannon-blast-from-ship-epic-stock-media-1-00-04.mp3'

const Sound = (() => {
  function shot() {
    const audio = new Audio(shotAudioSrc)
    audio.play().catch(() => {})
  }
  function hit() {
    const audio = new Audio(hitAudioSrc)
    audio.play().catch(() => {})
  }
  function miss() {
    const audio = new Audio(missAudioSrc)
    audio.play().catch(() => {})
  }

  // LOAD BACKGROUND AUDIO ASYNCHRONOUSLY
  async function background() {
    try {
      const audio = new Audio(bgAudioSrc)
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

  function playBackground() {
    background()
  }

  return { shot, hit, miss, BackgroundOnFirstTouch, playBackground }
})()

export default Sound
