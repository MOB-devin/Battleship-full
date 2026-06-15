import Gameboard from '../../factories/gameboard'
import Ship from '../../factories/ship'

describe('Gameboard placement', () => {
  let board

  beforeEach(() => {
    board = Gameboard.createMap()
  })

  describe('placeX (horizontal)', () => {
    test('places carrier at [0,0]', () => {
      const carrier = Ship.createShip('carrier', 5)
      const result = board.placeX(carrier, [0, 0])
      expect(result).toBe(true)
      expect(board.getBoard()[0][0]).toBe('carrierX')
      expect(board.getBoard()[0][4]).toBe('carrierX')
      expect(board.getBoard()[0][5]).toBe('x')
    })

    test('places battleship at [3,3]', () => {
      const battleship = Ship.createShip('battleship', 4)
      const result = board.placeX(battleship, [3, 3])
      expect(result).toBe(true)
      expect(board.getBoard()[3][3]).toBe('battleshipX')
      expect(board.getBoard()[3][6]).toBe('battleshipX')
    })

    test('places destroyer at [9,8]', () => {
      const destroyer = Ship.createShip('destroyer', 2)
      const result = board.placeX(destroyer, [9, 8])
      expect(result).toBe(true)
      expect(board.getBoard()[9][8]).toBe('destroyerX')
      expect(board.getBoard()[9][9]).toBe('destroyerX')
    })

    test('returns false when out of bounds', () => {
      const submarine = Ship.createShip('submarine', 3)
      const result = board.placeX(submarine, [0, 9])
      expect(result).toBe(false)
      expect(board.getBoard()[0][9]).toBe('x')
    })

    test('returns false when out of bounds by 1', () => {
      const submarine = Ship.createShip('submarine', 3)
      const result = board.placeX(submarine, [2, 8])
      expect(result).toBe(false)
    })

    test('returns false when overlapping another ship', () => {
      const carrier = Ship.createShip('carrier', 5)
      const cruiser = Ship.createShip('cruiser', 3)
      board.placeX(carrier, [0, 0])
      const result = board.placeX(cruiser, [0, 3])
      expect(result).toBe(false)
    })
  })

  describe('placeY (vertical)', () => {
    test('places carrier at [0,0]', () => {
      const carrier = Ship.createShip('carrier', 5)
      const result = board.placeY(carrier, [0, 0])
      expect(result).toBe(true)
      expect(board.getBoard()[0][0]).toBe('carrierY')
      expect(board.getBoard()[4][0]).toBe('carrierY')
      expect(board.getBoard()[5][0]).toBe('x')
    })

    test('places submarine at [7,9]', () => {
      const submarine = Ship.createShip('submarine', 3)
      const result = board.placeY(submarine, [7, 9])
      expect(result).toBe(true)
      expect(board.getBoard()[7][9]).toBe('submarineY')
      expect(board.getBoard()[9][9]).toBe('submarineY')
    })

    test('returns false when out of bounds vertically', () => {
      const carrier = Ship.createShip('carrier', 5)
      const result = board.placeY(carrier, [7, 0])
      expect(result).toBe(false)
    })

    test('returns false when overlapping another ship', () => {
      const carrier = Ship.createShip('carrier', 5)
      const cruiser = Ship.createShip('cruiser', 3)
      board.placeY(carrier, [0, 0])
      const result = board.placeY(cruiser, [3, 0])
      expect(result).toBe(false)
    })
  })

  describe('board initialization', () => {
    test('creates a 10x10 board filled with x', () => {
      const b = board.getBoard()
      expect(b.length).toBe(10)
      b.forEach((row) => {
        expect(row.length).toBe(10)
        row.forEach((cell) => expect(cell).toBe('x'))
      })
    })
  })
})
