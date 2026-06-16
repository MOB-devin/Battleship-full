// VIEWS
import pregame from './pregame'
import setup from './setup'
import helper from './helper'
import DragDrop from './dragDrop'
import Sound from '../utils/sound'
import Game from '../factories/game'

const view = (() => {
  function loadContent() {
    helper.deleteAppContent()
    pregame.loadCard()
    initPlayButton()
  }

  function initPlayButton() {
    const button = document.getElementById('play-now-button')
    button.addEventListener('click', loadSetup)

    const nameInput = document.getElementById('name-input')
    nameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') loadSetup()
    })
  }

  function loadSetup() {
    setPlayerName()
    helper.deleteAppContent()
    setup.loadSetupContent()
    DragDrop.initDraggableFields()
    // UNMUTE SOUND ON IOS WITH 1S SILENCE SO THAT WEB AUDIO API CAN BE USED
    Sound.BackgroundOnFirstTouch()
  }

  function setPlayerName() {
    const name = document.getElementById('name-input').value.toString().trim()
    if (name) Game.getState().getPlayer().setName(`Captain ${name}`)
  }

  return { loadContent }
})()

export default view
