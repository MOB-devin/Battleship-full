import Message from '../../utils/message'

describe('Message module', () => {
  describe('getNewEnemyBattleStartMessage', () => {
    test('returns an array with one string', () => {
      const result = Message.getNewEnemyBattleStartMessage()
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(1)
      expect(typeof result[0]).toBe('string')
    })
  })

  describe('getNewEnemyHitMessage', () => {
    test('returns a string', () => {
      const result = Message.getNewEnemyHitMessage('')
      expect(typeof result).toBe('string')
    })

    test('returns a different message from the previous one', () => {
      const previous = 'This battle is a tidal wave of victory!'
      const result = Message.getNewEnemyHitMessage(previous)
      expect(result).not.toBe(previous)
    })
  })

  describe('getNewEnemySunkMessage', () => {
    test('returns a string', () => {
      const result = Message.getNewEnemySunkMessage('')
      expect(typeof result).toBe('string')
    })

    test('returns a different message from the previous one', () => {
      const previous =
        'Captain, the enemy vessel is going down. That was one hell of a shot.'
      const result = Message.getNewEnemySunkMessage(previous)
      expect(result).not.toBe(previous)
    })
  })

  describe('getNewPlayerMissMessage', () => {
    test('returns a string', () => {
      const result = Message.getNewPlayerMissMessage('')
      expect(typeof result).toBe('string')
    })

    test('returns a different message from the previous one', () => {
      const previous = 'Close, but no cigar.'
      const result = Message.getNewPlayerMissMessage(previous)
      expect(result).not.toBe(previous)
    })
  })

  describe('getNewPlayerHitMessage', () => {
    test('returns a string', () => {
      const result = Message.getNewPlayerHitMessage('')
      expect(typeof result).toBe('string')
    })

    test('returns a different message from the previous one', () => {
      const previous = 'Your time is up!'
      const result = Message.getNewPlayerHitMessage(previous)
      expect(result).not.toBe(previous)
    })
  })

  describe('getNewPlayerSunkMessage', () => {
    test('returns a string', () => {
      const result = Message.getNewPlayerSunkMessage('')
      expect(typeof result).toBe('string')
    })

    test('returns a different message from the previous one', () => {
      const previous = "Looks like you'll be swimming home. Hehehe."
      const result = Message.getNewPlayerSunkMessage(previous)
      expect(result).not.toBe(previous)
    })
  })

  describe('getNewEnemyMissMessage', () => {
    test('returns a string', () => {
      const result = Message.getNewEnemyMissMessage('')
      expect(typeof result).toBe('string')
    })

    test('returns a different message from the previous one', () => {
      const previous = "I'll get you next time."
      const result = Message.getNewEnemyMissMessage(previous)
      expect(result).not.toBe(previous)
    })
  })

  describe('getNoCommentMessage', () => {
    test('returns an array with "..."', () => {
      const result = Message.getNoCommentMessage()
      expect(result).toEqual(['...'])
    })
  })

  describe('getPlayerWinMessage', () => {
    test('returns an array with a win message', () => {
      const result = Message.getPlayerWinMessage()
      expect(Array.isArray(result)).toBe(true)
      expect(result[0]).toContain('Mission accomplished')
    })
  })

  describe('getEnemyWinMessage', () => {
    test('returns an array with a loss message', () => {
      const result = Message.getEnemyWinMessage()
      expect(Array.isArray(result)).toBe(true)
      expect(result[0]).toContain('no match')
    })
  })

  describe('getWelcomeMessage', () => {
    test('returns an array with 2 elements', () => {
      const result = Message.getWelcomeMessage()
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(2)
    })

    test('welcome message contains the player name', () => {
      const result = Message.getWelcomeMessage()
      expect(result[0]).toContain('Captain')
    })
  })

  describe('getBattleStartMessage', () => {
    test('returns an array with player name', () => {
      const result = Message.getBattleStartMessage()
      expect(Array.isArray(result)).toBe(true)
      expect(result[0]).toContain('Captain')
    })
  })
})
