const Ship = (() => {
  // SHIP FACTORY
  const createShip = (shipName, shipLength) => {
    if (!shipName || typeof shipName !== 'string') {
      throw new Error(`Invalid ship name: ${shipName}`)
    }
    if (!Number.isInteger(shipLength) || shipLength <= 0) {
      throw new Error(`Invalid ship length for "${shipName}": ${shipLength}`)
    }

    const name = shipName
    const length = shipLength
    let timesHit = 0
    let isSunk = false
    let isFound = false

    // GETTERS

    function getName() {
      return name
    }

    function getFound() {
      return isFound
    }

    function getSunk() {
      return isSunk
    }

    function getLength() {
      return length
    }

    // SHIP STATE MODIFIERS

    function found() {
      isFound = true
    }

    function hit() {
      if (isSunk) {
        console.warn(`Ship "${name}" is already sunk, ignoring hit`)
        return
      }
      timesHit += 1
      if (timesHit === length) sunk()
    }

    function sunk() {
      isSunk = true
    }

    function resetFound() {
      isFound = false
    }

    return {
      getName,
      getLength,
      getSunk,
      getFound,
      hit,
      sunk,
      found,
      resetFound,
    }
  }

  return { createShip }
})()

export default Ship
