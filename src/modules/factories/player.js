import Gameboard from './gameboard'
import Ship from './ship'
import { FLEET_ORDER, SHIP_CONFIG } from '../utils/shipConfig'

const Player = (() => {
  // PLAYER FACTORY
  const createPlayer = (playerName, playerIdentity) => {
    const identity = playerIdentity
    const map = Gameboard.createMap()
    let name = playerName
    let searchQueue = []

    // GETTERS

    function getName() {
      return name
    }

    function getMap() {
      return map
    }

    function getIdentity() {
      return identity
    }

    // SETTERS

    function setName(newName) {
      name = newName
    }

    // CHECKERS

    function isEmptyField(coordinate) {
      const [x, y] = coordinate
      const boardData = getMap().getBoard()
      if (x < 0 || x >= boardData.length || y < 0 || y >= boardData[0].length) {
        return false
      }
      return boardData[x][y] !== 'miss' && boardData[x][y] !== 'hit'
    }

    function isLoser() {
      return getMap()
        .getFleet()
        .every((battleship) => battleship.getSunk() === true)
    }

    // CPU METHODS

    function autoPlace() {
      const remaining = FLEET_ORDER.map((shipName) => SHIP_CONFIG[shipName])

      while (remaining.length) {
        const axis = randomAxis()
        const row = randomCoordinate()
        const col = randomCoordinate()
        const { name: shipName, length } = remaining[0]
        let placed = false

        if (axis === 'x') {
          placed = getMap().placeX(Ship.createShip(shipName, length), [row, col])
        } else {
          placed = getMap().placeY(Ship.createShip(shipName, length), [row, col])
        }

        if (placed) {
          remaining.shift()
        }
      }
    }

    function cpuPlay() {
      let invalidCoordinate = true
      let x
      let y
      const MAX_ATTEMPTS = 200
      let attempts = 0

      while (invalidCoordinate) {
        attempts += 1
        if (attempts > MAX_ATTEMPTS) {
          console.error('CPU exceeded max attempts to find a valid move')
          break
        }
        if (searchQueue.length > 1) [x, y] = getRandomAndRemove(searchQueue)
        else {
          x = randomCoordinate()
          y = randomCoordinate()
        }

        if (isEmptyField([x, y])) {
          invalidCoordinate = false
          getMap().receiveAttack([x, y])
        }
      }

      fillQueue(x, y)
      return [x, y]
    }

    function fillQueue(row, col) {
      // IF ONLY ORIGIN OF FIRST HIT LEFT, EMPTY THE QUEUE
      if (searchQueue.length === 1) {
        searchQueue = []
      }
      // IF ATTACK IS MISS EXIT
      if (getMap().getBoard()[row][col] === 'miss') return
      // IF FIRST HIT IN AN AREA, STORE IT AND USE IT AS A REFERENCE POINT FOR DIRECTION LATER
      let origin = false
      if (searchQueue.length === 0) {
        searchQueue.push([row, col])
        origin = true
      }
      if (row > 0 && row <= 9) {
        searchQueue.push([row - 1, col]) // top
      }
      if (row >= 0 && row < 9) {
        searchQueue.push([row + 1, col]) // bottom
      }
      if (col > 0 && col <= 9) {
        searchQueue.push([row, col - 1]) // left
      }
      if (col >= 0 && col < 9) {
        searchQueue.push([row, col + 1]) // right
      }

      if (searchQueue.length > 1 && !origin) {
        if (row === searchQueue[0][0]) {
          searchQueue = [
            ...searchQueue.slice(0, 1),
            ...searchQueue.slice(1).filter((subArr) => subArr[0] === row),
          ]
        } else if (col === searchQueue[0][1]) {
          searchQueue = [
            ...searchQueue.slice(0, 1),
            ...searchQueue.slice(1).filter((subArr) => subArr[1] === col),
          ]
        }
      }
    }

    return {
      getName,
      getIdentity,
      getMap,
      setName,
      fillQueue,
      cpuPlay,
      autoPlace,
      isEmptyField,
      isLoser,
    }
  }

  // PLAYER HELPERS

  function randomCoordinate() {
    return Math.floor(Math.random() * (9 + 1))
  }

  function randomAxis() {
    const axis = ['x', 'y']
    return axis[Math.round(Math.random())]
  }

  function getRandomAndRemove(array) {
    const randomIndex = Math.floor(Math.random() * (array.length - 1)) + 1
    const randomElement = array[randomIndex]
    array.splice(randomIndex, 1)
    return randomElement
  }

  return { createPlayer }
})()

export default Player
