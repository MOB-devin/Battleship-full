import Gameboard from '../../factories/gameboard'
import Ship from '../../factories/ship'

describe('Gameboard receiveAttack', () => {
  let board

  beforeEach(() => {
    board = Gameboard.createMap()
    board.placeX(Ship.createShip('carrier', 5), [0, 0])
    board.placeX(Ship.createShip('battleship', 4), [2, 0])
    board.placeX(Ship.createShip('cruiser', 3), [3, 3])
    board.placeY(Ship.createShip('submarine', 3), [7, 9])
    board.placeX(Ship.createShip('destroyer', 2), [4, 2])
  })

  test('hitting a carrier cell registers a hit', () => {
    board.receiveAttack([0, 0])
    expect(board.getShip('carrier').getSunk()).toBe(false)
  })

  test('sinking the carrier after 5 hits', () => {
    for (let i = 0; i < 5; i++) board.receiveAttack([0, i])
    expect(board.getShip('carrier').getSunk()).toBe(true)
  })

  test('hitting battleship tail', () => {
    board.receiveAttack([2, 3])
    expect(board.getShip('battleship').getSunk()).toBe(false)
  })

  test('sinking the destroyer after 2 hits', () => {
    board.receiveAttack([4, 2])
    board.receiveAttack([4, 3])
    expect(board.getShip('destroyer').getSunk()).toBe(true)
  })

  test('missing an empty cell records miss', () => {
    board.receiveAttack([5, 5])
    expect(board.getBoard()[5][5]).toBe('miss')
  })

  test('sinking a vertically placed submarine', () => {
    board.receiveAttack([7, 9])
    board.receiveAttack([8, 9])
    board.receiveAttack([9, 9])
    expect(board.getShip('submarine').getSunk()).toBe(true)
  })
})

describe('Gameboard isEveryShipSunk', () => {
  let board

  beforeEach(() => {
    board = Gameboard.createMap()
    board.placeX(Ship.createShip('carrier', 5), [0, 0])
    board.placeX(Ship.createShip('battleship', 4), [2, 0])
    board.placeX(Ship.createShip('cruiser', 3), [3, 3])
    board.placeY(Ship.createShip('submarine', 3), [7, 9])
    board.placeX(Ship.createShip('destroyer', 2), [4, 2])
  })

  test('returns false when not all ships are sunk', () => {
    board.receiveAttack([0, 0])
    expect(board.isEveryShipSunk()).toBe(false)
  })

  test('returns true when all ships are sunk', () => {
    // Sink carrier
    for (let i = 0; i < 5; i++) board.receiveAttack([0, i])
    // Sink battleship
    for (let i = 0; i < 4; i++) board.receiveAttack([2, i])
    // Sink cruiser
    for (let i = 3; i < 6; i++) board.receiveAttack([3, i])
    // Sink submarine
    for (let i = 7; i < 10; i++) board.receiveAttack([i, 9])
    // Sink destroyer
    board.receiveAttack([4, 2])
    board.receiveAttack([4, 3])

    expect(board.isEveryShipSunk()).toBe(true)
  })
})
