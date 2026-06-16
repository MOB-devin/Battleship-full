import bgAudioSrc from '../../assets/sounds/North_Sea_Vigil.mp3'

const Sound = (() => {
  let audioCtx = null
  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    return audioCtx
  }

  function playNavalGunfire() {
    const ctx = getAudioCtx()
    const now = ctx.currentTime

    // Low-frequency triangle oscillator blast
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(80, now)
    osc.frequency.linearRampToValueAtTime(10, now + 0.4)

    const oscGain = ctx.createGain()
    oscGain.gain.setValueAtTime(1.5, now)
    oscGain.gain.linearRampToValueAtTime(0.01, now + 0.5)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.5)

    // White noise burst
    const bufferSize = ctx.sampleRate * 0.1
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.8, now)
    noiseGain.gain.linearRampToValueAtTime(0.01, now + 0.15)

    noise.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 0.15)
  }

  function playShipExplosion() {
    const ctx = getAudioCtx()
    const now = ctx.currentTime

    // White noise through lowpass filter
    const bufferSize = ctx.sampleRate * 2.5
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer

    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(300, now)
    lowpass.frequency.linearRampToValueAtTime(40, now + 1.8)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(2.0, now)
    noiseGain.gain.linearRampToValueAtTime(0.001, now + 2.2)

    noise.connect(lowpass)
    lowpass.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 2.5)

    // Sawtooth oscillator metal creak
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(140, now)
    osc.frequency.linearRampToValueAtTime(90, now + 1.0)

    const oscGain = ctx.createGain()
    oscGain.gain.setValueAtTime(0, now)
    oscGain.gain.linearRampToValueAtTime(0.2, now + 0.3)
    oscGain.gain.linearRampToValueAtTime(0, now + 1.6)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 1.6)
  }

  function playWaterSplash() {
    const ctx = getAudioCtx()
    const now = ctx.currentTime

    // White noise through bandpass filter
    const bufferSize = ctx.sampleRate * 1.2
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(450, now)
    bandpass.frequency.linearRampToValueAtTime(180, now + 0.8)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(1.2, now)
    noiseGain.gain.linearRampToValueAtTime(0.01, now + 1.1)

    noise.connect(bandpass)
    bandpass.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 1.2)
  }

  function shot() { playNavalGunfire() }
  function hit() { playShipExplosion() }
  function miss() { playWaterSplash() }

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

  return { shot, hit, miss, BackgroundOnFirstTouch }
})()

export default Sound
