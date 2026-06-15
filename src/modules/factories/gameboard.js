import Ship from './ship'
import { SHIP_CONFIG } from '../utils/shipConfig'

const Gameboard = (() => {
  // MAP FACTORY
  const createMap = () => {
    const board = new Array(10).fill('x').map(() => new Array(10).fill('x'))
    const shipOnDrag = { name: '', length: 0 }
    let fleet = []
    let axis = 'X'

    // GETTERS

    function getBoard() {
      return board
    }

    function getFleet() {
      return fleet
    }

    function getAxis() {
      return axis
    }

    function getShipOnDrag() {
      return shipOnDrag
    }

    function getShip(shipName) {
      return fleet.filter((battleship) => battleship.getName() === shipName)[0]
    }

    // SETTERS

    function setAxisX() {
      axis = 'X'
    }

    function setAxisY() {
      axis = 'Y'
    }

    function setShipOnDrag(shipInfoObj) {
      shipOnDrag.name = shipInfoObj.name
      shipOnDrag.length = shipInfoObj.length
    }

    function setAllShipsNotFound() {
      fleet.forEach((ship) => ship.resetFound())
    }

    // FLEET

    function addToFleet(battleship) {
      const name = battleship.getName()
      const config = SHIP_CONFIG[name] || SHIP_CONFIG.destroyer
      fleet.push(Ship.createShip(config.name, config.length))
    }

    function setFleetEmpty() {
      fleet = []
    }

    // PLACEMENT

    function placeX(battleship, start) {
      let shipLength = battleship.getLength()
      const [x, y] = start
      const shipPlacement = []

      if (isOutOfBounds(shipLength, board.length, y)) return false

      for (let j = y; j < board.length; j++) {
        if (board[x][j] !== 'x') return false

        shipPlacement.push([x, j])
        shipLength -= 1
        if (shipLength === 0) {
          break
        }
      }

      shipPlacement.forEach((coordinate) => {
        const [i, j] = coordinate
        board[i][j] = `${battleship.getName()}X`
      })

      addToFleet(battleship)

      return true
    }

    function placeY(battleship, start) {
      let shipLength = battleship.getLength()
      const [x, y] = start
      const shipPlacement = []

      if (isOutOfBounds(shipLength, board.length, x)) return false

      for (let i = x; i < board.length; i++) {
        if (board[i][y] !== 'x') return false

        shipPlacement.push([i, y])
        shipLength -= 1
        if (shipLength === 0) {
          break
        }
      }

      shipPlacement.forEach((coordinate) => {
        const [i, j] = coordinate
        board[i][j] = `${battleship.getName()}Y`
      })

      addToFleet(battleship)

      return true
    }

    function isOutOfBounds(shipLength, boardLength, field) {
      return shipLength > boardLength - field
    }

    // RECORD ATTACKS

    function receiveAttack(coords) {
      const [x, y] = coords
      recordHit(x, y)
    }

    function recordHit(x, y) {
      const cell = board[x][y]
      const shipName = cell.slice(0, -1)
      const ship = getShip(shipName)
      if (ship) {
        ship.hit()
      } else {
        board[x][y] = 'miss'
      }
    }

    // CHECKERS

    function areAllShipsFound() {
      return fleet.length === 5
    }

    function isEveryShipSunk() {
      const sunk = fleet.filter((battleship) => battleship.getSunk() === true)
      return sunk.length === 5
    }

    return {
      getBoard,
      getFleet,
      getShip,
      getAxis,
      getShipOnDrag,
      setAxisX,
      setAxisY,
      setFleetEmpty,
      setAllShipsNotFound,
      setShipOnDrag,
      addToFleet,
      placeX,
      placeY,
      receiveAttack,
      recordHit,
      areAllShipsFound,
      isEveryShipSunk,
    }
  }

  return { createMap }
})()

export default Gameboard
