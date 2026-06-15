import Game from '../../factories/game'
import { SHIP_CONFIG, FLEET_ORDER } from '../../utils/shipConfig'

describe('Game factory', () => {
  describe('state', () => {
    test('state object is defined', () => {
      expect(Game.state).toBeDefined()
    })

    test('state has getPlayer method', () => {
      expect(Game.state.getPlayer).toBeDefined()
    })

    test('state has getCPU method', () => {
      expect(Game.state.getCPU).toBeDefined()
    })
  })

  describe('getState', () => {
    test('getState returns the state object', () => {
      const state = Game.getState.call(Game)
      expect(state).toBeDefined()
      expect(state.getPlayer).toBeDefined()
      expect(state.getCPU).toBeDefined()
    })
  })

  describe('players in state', () => {
    test('player has default name Captain', () => {
      const player = Game.state.getPlayer()
      expect(player.getName()).toBe('Captain')
    })

    test('cpu has name cpu', () => {
      const cpu = Game.state.getCPU()
      expect(cpu.getName()).toBe('cpu')
    })

    test('player has identity player', () => {
      const player = Game.state.getPlayer()
      expect(player.getIdentity()).toBe('player')
    })

    test('cpu has identity cpu', () => {
      const cpu = Game.state.getCPU()
      expect(cpu.getIdentity()).toBe('cpu')
    })
  })
})

describe('shipConfig', () => {
  test('FLEET_ORDER has 5 ships', () => {
    expect(FLEET_ORDER).toHaveLength(5)
  })

  test('all fleet ships have config entries', () => {
    FLEET_ORDER.forEach((name) => {
      expect(SHIP_CONFIG[name]).toBeDefined()
      expect(SHIP_CONFIG[name].name).toBe(name)
      expect(SHIP_CONFIG[name].length).toBeGreaterThan(0)
      expect(SHIP_CONFIG[name].label).toBeDefined()
    })
  })

  test('ship lengths match expected values', () => {
    expect(SHIP_CONFIG.carrier.length).toBe(5)
    expect(SHIP_CONFIG.battleship.length).toBe(4)
    expect(SHIP_CONFIG.cruiser.length).toBe(3)
    expect(SHIP_CONFIG.submarine.length).toBe(3)
    expect(SHIP_CONFIG.destroyer.length).toBe(2)
  })
})
