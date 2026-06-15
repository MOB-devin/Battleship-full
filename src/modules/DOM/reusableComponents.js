import Typed from 'typed.js'
import agent from '../../assets/images/agent.png'
import enemy from '../../assets/images/evilCaptain.png'
import helper from './helper'
import { SHIP_CONFIG } from '../utils/shipConfig'
import { SHIP_IMAGES } from '../utils/shipImages'

/* eslint-disable no-restricted-syntax */
const Component = (() => {
  const images = { agent, enemy }

  function createMessageSection(classNamesArray) {
    const section = helper.create('section', { className: 'message' })
    classNamesArray.forEach((el) => section.classList.add(el))
    const character = classNamesArray[1]

    const image = helper.create('img', { className: 'message-image' })
    const imageName =
      classNamesArray[1] === 'agent' || classNamesArray[1] === 'agent-win'
        ? 'agent'
        : 'enemy'
    image.src = images[imageName]

    section.appendChild(image)
    section.appendChild(createMessage(character))

    return section
  }

  function createMessage(character) {
    const container = helper.create('div', {
      id: 'message-container',
      className: 'message-container',
    })

    const text = helper.create('div', {
      id: `message-${character}`,
      className: `message-${character}`,
    })

    container.appendChild(text)

    return container
  }

  function addTypeWriterMessage(element, stringArray) {
    const typed = new Typed(element, {
      strings: stringArray,
      typeSpeed: 10,
    })
  }

  function createShipCard(shipName) {
    const config = SHIP_CONFIG[shipName]
    if (!config) return helper.create('div', { className: 'ship-card' })

    const card = helper.create('div', {
      className: 'ship-card',
      draggable: 'true',
    })
    const content = helper.create('div', { className: 'ship-content' })
    const image = helper.create('img', { className: 'ship-image' })
    const name = helper.create('p', { className: 'ship-name' })

    card.dataset.shipName = config.name
    card.dataset.shipLength = config.length
    image.src = SHIP_IMAGES[shipName]
    name.textContent = config.label

    helper.appendAll(content, [image, name])

    card.appendChild(content)

    return card
  }

  function createGitHubButton() {
    const container = helper.create('div', { className: 'button-container' })

    const button = helper.create('a', {
      id: 'github-button',
      className: 'github-button',
      textContent: 'GITHUB',
      href: 'https://github.com/lovrozagar',
      target: 'blank',
    })

    container.appendChild(button)

    return container
  }

  return {
    createMessageSection,
    addTypeWriterMessage,
    createShipCard,
    createGitHubButton,
  }
})()

export default Component
