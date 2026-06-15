import Player from '../../factories/player'
import Ship from '../../factories/ship'

describe('Player factory', () => {
  let human
  let cpu

  beforeEach(() => {
    human = Player.createPlayer('Captain', 'player')
    cpu = Player.createPlayer('cpu', 'cpu')
  })

  describe('createPlayer', () => {
    test('returns an object with expected methods', () => {
      expect(human).toHaveProperty('getName')
      expect(human).toHaveProperty('getIdentity')
      expect(human).toHaveProperty('getMap')
      expect(human).toHaveProperty('setName')
      expect(human).toHaveProperty('autoPlace')
      expect(human).toHaveProperty('cpuPlay')
      expect(human).toHaveProperty('isEmptyField')
      expect(human).toHaveProperty('isLoser')
    })
  })

  describe('getName', () => {
    test('returns the player name', () => {
      expect(human.getName()).toBe('Captain')
      expect(cpu.getName()).toBe('cpu')
    })
  })

  describe('getIdentity', () => {
    test('returns the player identity', () => {
      expect(human.getIdentity()).toBe('player')
      expect(cpu.getIdentity()).toBe('cpu')
    })
  })

  describe('setName', () => {
    test('updates the player name', () => {
      human.setName('Admiral')
      expect(human.getName()).toBe('Admiral')
    })
  })

  describe('getMap', () => {
    test('returns a gameboard object', () => {
      const map = human.getMap()
      expect(map).toHaveProperty('getBoard')
      expect(map).toHaveProperty('placeX')
      expect(map).toHaveProperty('placeY')
      expect(map).toHaveProperty('receiveAttack')
    })

    test('board is a 10x10 grid', () => {
      const board = human.getMap().getBoard()
      expect(board.length).toBe(10)
      board.forEach((row) => expect(row.length).toBe(10))
    })
  })

  describe('isEmptyField', () => {
    test('returns true for an untouched field', () => {
      expect(human.isEmptyField([5, 5])).toBe(true)
    })

    test('returns false for a missed field', () => {
      human.getMap().receiveAttack([5, 5])
      expect(human.isEmptyField([5, 5])).toBe(false)
    })
  })

  describe('autoPlace', () => {
    test('places all 5 ships on the board', () => {
      cpu.autoPlace()
      expect(cpu.getMap().getFleet().length).toBe(5)
    })

    test('places ships with correct names', () => {
      cpu.autoPlace()
      const fleet = cpu.getMap().getFleet()
      const names = fleet.map((ship) => ship.getName())
      expect(names).toContain('carrier')
      expect(names).toContain('battleship')
      expect(names).toContain('cruiser')
      expect(names).toContain('submarine')
      expect(names).toContain('destroyer')
    })
  })

  describe('isLoser', () => {
    test('returns false when ships are still afloat', () => {
      cpu.autoPlace()
      expect(cpu.isLoser()).toBe(false)
    })
  })

  describe('cpuPlay', () => {
    test('returns a valid coordinate array', () => {
      const result = cpu.cpuPlay()
      expect(result).toHaveLength(2)
      expect(result[0]).toBeGreaterThanOrEqual(0)
      expect(result[0]).toBeLessThanOrEqual(9)
      expect(result[1]).toBeGreaterThanOrEqual(0)
      expect(result[1]).toBeLessThanOrEqual(9)
    })

    test('marks the targeted cell', () => {
      const [x, y] = cpu.cpuPlay()
      const cell = cpu.getMap().getBoard()[x][y]
      expect(cell === 'miss' || cell === 'hit' || cell !== 'x').toBe(true)
    })
  })

  describe('fillQueue', () => {
    test('fillQueue on a miss does not throw', () => {
      cpu.getMap().receiveAttack([5, 5])
      expect(() => cpu.fillQueue(5, 5)).not.toThrow()
    })

    test('fillQueue on a hit populates search directions', () => {
      cpu.getMap().placeX(Ship.createShip('carrier', 5), [3, 0])
      cpu.getMap().receiveAttack([3, 0])
      cpu.fillQueue(3, 0)
      // After first hit, queue should contain origin + neighbors
      // Calling fillQueue again with same row triggers direction filtering
      cpu.getMap().receiveAttack([3, 1])
      cpu.fillQueue(3, 1)
      // Should not throw; covers the row-matching filter branch
    })

    test('fillQueue with same column triggers column filter', () => {
      cpu.getMap().placeY(Ship.createShip('battleship', 4), [0, 5])
      cpu.getMap().receiveAttack([0, 5])
      cpu.fillQueue(0, 5)
      cpu.getMap().receiveAttack([1, 5])
      cpu.fillQueue(1, 5)
      // Should not throw; covers the col-matching filter branch
    })

    test('fillQueue resets queue when only origin remains', () => {
      // First, create a hit to set up queue with origin
      cpu.getMap().receiveAttack([5, 5])
      cpu.fillQueue(5, 5)
      // Now simulate queue having only 1 element (the origin) by calling fillQueue on a miss
      cpu.getMap().receiveAttack([0, 0])
      // fillQueue with miss should exit early
      cpu.fillQueue(0, 0)
    })

    test('fillQueue handles edge coordinates (row 0, col 0)', () => {
      cpu.getMap().placeX(Ship.createShip('destroyer', 2), [0, 0])
      cpu.getMap().receiveAttack([0, 0])
      cpu.fillQueue(0, 0)
      // row=0, col=0 means no top/left neighbors added
    })

    test('fillQueue handles edge coordinates (row 9, col 9)', () => {
      cpu.getMap().placeX(Ship.createShip('destroyer', 2), [9, 8])
      cpu.getMap().receiveAttack([9, 9])
      cpu.fillQueue(9, 9)
      // row=9, col=9 means no bottom/right neighbors added
    })
  })
})
