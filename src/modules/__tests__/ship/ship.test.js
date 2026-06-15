import Ship from '../../factories/ship'

describe('Ship factory', () => {
  let submarine
  let carrier

  beforeEach(() => {
    submarine = Ship.createShip('submarine', 3)
    carrier = Ship.createShip('carrier', 5)
  })

  describe('createShip', () => {
    test('returns an object with the expected methods', () => {
      expect(submarine).toHaveProperty('getName')
      expect(submarine).toHaveProperty('getLength')
      expect(submarine).toHaveProperty('getSunk')
      expect(submarine).toHaveProperty('getFound')
      expect(submarine).toHaveProperty('hit')
      expect(submarine).toHaveProperty('found')
      expect(submarine).toHaveProperty('resetFound')
    })
  })

  describe('getName', () => {
    test('returns the ship name', () => {
      expect(submarine.getName()).toBe('submarine')
      expect(carrier.getName()).toBe('carrier')
    })
  })

  describe('getLength', () => {
    test('returns the ship length', () => {
      expect(submarine.getLength()).toBe(3)
      expect(carrier.getLength()).toBe(5)
    })
  })

  describe('hit', () => {
    test('ship is not sunk after fewer hits than length', () => {
      submarine.hit()
      expect(submarine.getSunk()).toBe(false)
    })

    test('ship is not sunk after length-1 hits', () => {
      submarine.hit()
      submarine.hit()
      expect(submarine.getSunk()).toBe(false)
    })
  })

  describe('getSunk', () => {
    test('ship is sunk after hits equal to length', () => {
      submarine.hit()
      submarine.hit()
      submarine.hit()
      expect(submarine.getSunk()).toBe(true)
    })

    test('carrier is sunk after 5 hits', () => {
      for (let i = 0; i < 5; i++) carrier.hit()
      expect(carrier.getSunk()).toBe(true)
    })

    test('carrier is not sunk after 4 hits', () => {
      for (let i = 0; i < 4; i++) carrier.hit()
      expect(carrier.getSunk()).toBe(false)
    })
  })

  describe('found and getFound', () => {
    test('ship is not found initially', () => {
      expect(submarine.getFound()).toBe(false)
    })

    test('ship is found after calling found()', () => {
      submarine.found()
      expect(submarine.getFound()).toBe(true)
    })
  })

  describe('resetFound', () => {
    test('resets found status to false', () => {
      submarine.found()
      expect(submarine.getFound()).toBe(true)
      submarine.resetFound()
      expect(submarine.getFound()).toBe(false)
    })
  })
})
