import Gameboard from '../../factories/gameboard'
import Ship from '../../factories/ship'

describe('Gameboard additional methods', () => {
  let board

  beforeEach(() => {
    board = Gameboard.createMap()
  })

  describe('getAxis / setAxis', () => {
    test('default axis is X', () => {
      expect(board.getAxis()).toBe('X')
    })

    test('setAxisY changes axis to Y', () => {
      board.setAxisY()
      expect(board.getAxis()).toBe('Y')
    })

    test('setAxisX changes axis back to X', () => {
      board.setAxisY()
      board.setAxisX()
      expect(board.getAxis()).toBe('X')
    })
  })

  describe('getFleet', () => {
    test('fleet is initially empty', () => {
      expect(board.getFleet()).toEqual([])
    })

    test('fleet grows after placing ships', () => {
      board.placeX(Ship.createShip('carrier', 5), [0, 0])
      expect(board.getFleet().length).toBe(1)
    })
  })

  describe('setFleetEmpty', () => {
    test('empties the fleet', () => {
      board.placeX(Ship.createShip('carrier', 5), [0, 0])
      board.setFleetEmpty()
      expect(board.getFleet()).toEqual([])
    })
  })

  describe('getShipOnDrag / setShipOnDrag', () => {
    test('default shipOnDrag has empty values', () => {
      const drag = board.getShipOnDrag()
      expect(drag.name).toBe('')
      expect(drag.length).toBe(0)
    })

    test('setShipOnDrag updates the values', () => {
      board.setShipOnDrag({ name: 'carrier', length: 5 })
      const drag = board.getShipOnDrag()
      expect(drag.name).toBe('carrier')
      expect(drag.length).toBe(5)
    })
  })

  describe('getShip', () => {
    test('returns the correct ship by name', () => {
      board.placeX(Ship.createShip('carrier', 5), [0, 0])
      board.placeX(Ship.createShip('destroyer', 2), [2, 0])
      const ship = board.getShip('carrier')
      expect(ship.getName()).toBe('carrier')
      expect(ship.getLength()).toBe(5)
    })
  })

  describe('areAllShipsFound', () => {
    test('returns false when fewer than 5 ships placed', () => {
      board.placeX(Ship.createShip('carrier', 5), [0, 0])
      expect(board.areAllShipsFound()).toBe(false)
    })

    test('returns true when 5 ships are placed', () => {
      board.placeX(Ship.createShip('carrier', 5), [0, 0])
      board.placeX(Ship.createShip('battleship', 4), [2, 0])
      board.placeX(Ship.createShip('cruiser', 3), [4, 0])
      board.placeX(Ship.createShip('submarine', 3), [6, 0])
      board.placeX(Ship.createShip('destroyer', 2), [8, 0])
      expect(board.areAllShipsFound()).toBe(true)
    })
  })

  describe('setAllShipsNotFound', () => {
    test('resets found status on all fleet ships', () => {
      board.placeX(Ship.createShip('carrier', 5), [0, 0])
      board.placeX(Ship.createShip('destroyer', 2), [2, 0])
      board.getFleet().forEach((ship) => ship.found())
      board.setAllShipsNotFound()
      board.getFleet().forEach((ship) => {
        expect(ship.getFound()).toBe(false)
      })
    })
  })
})
