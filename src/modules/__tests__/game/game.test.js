import Game from '../../factories/game'

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
