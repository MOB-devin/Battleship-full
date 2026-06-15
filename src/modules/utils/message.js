import Game from '../factories/game'

const Message = (() => {
  const messages = {
    welcome: [
      'All hands on deck, sailor',
      'Drag your fleet into formation.',
    ],
    battleStartPlayer: [
      "All guns loaded, Admiral. Let's give 'em hell!",
    ],
    battleStartEnemy: [
      "You have challenged the storm; do not be surprised when it consumes you.",
    ],
    enemyHit: [
      "They're taking on heavy water, sir!",
      "This battle is a tidal wave of victory!",
      "The enemy ship is losing boiler pressure, sir.",
      "We've got them in our sights, Admiral - keep the main battery firing!",
      "That was textbook, Admiral. Their bulkheads are collapsing.",
      "Target hit. Enemy vessel has sustained significant hull damage.",
      "Admiral, we have successfully landed a blow on the enemy flagship.",
      "That hit was right on the money, Admiral. We've got them dead in the water.",
      "BOOM! Enemy ship hit hard! Their magazine is cooking off!",
      "Direct hit achieved. Enemy vessel's combat effectiveness is significantly reduced."
    ],
    enemySunk: [
      "Admiral, the enemy vessel is breaking apart. She's going down fast!",
      "Sir, that was a hit for the history books! The enemy ship has been sunk.",
      "She's slipping under, Admiral! They won't be troubling our fleet anymore.",
      "Admiral, we've delivered the knockout blow! Confirmed sinking of the enemy vessel.",
      "We've just sent that raider straight to the bottom, Admiral. Job well done.",
      "Lookout reports the enemy hull has vanished from the horizon. Target vanquished!",
      "That was the decisive blow, Admiral! The enemy ship has met its watery grave.",
      "Direct hit to the magazine, Admiral! The enemy ship is now resting on the ocean floor.",
      "The enemy vessel has been completely put out of commission and swallowed by the sea.",
      "We've just given them a one-way ticket to Ironbottom Sound, Admiral!"
    ],
    playerMiss: [
      "Splash in the water, Admiral. No damage to the enemy line.",
      "Our deflection is off, Admiral. Readjusting range finders.",
      "Negative on that salvo, Admiral. Shells landed wide.",
      "No hit, Admiral. Keep the batteries fighting.",
      "That was a clean miss, sir. Kicking up ocean spray.",
      "No contact on that sector. Requesting new coordinates, Admiral!",
      "The enemy fleet is proving to be elusive, sir.",
      "Looks like we need to adjust our elevation, Admiral.",
      "Spotting tower recommends we recalibrate our range finders, sir.",
      "We're not making much headway, Admiral. Standing by for your next firing order."
    ],
    playerHit: [
      "Your fate was sealed before you left port.",
      "Your good fortune has run its course, Admiral.",
      "Prepare your soul for the fierce wind.",
      "That was merely the prelude to your destruction.",
      "Your steel will soon rest upon the ocean floor.",
      "Our torpedoes do not miss their destiny.",
      "Predictable maneuvers. You waste my ammunition.",
      "You now taste the resolve of the Emperor’s fleet.",
      "The vast Pacific offers no harbor for your errors.",
      "A fair strike. And now I expect your retaliation."
     ],
    playerSunk: [
      "Your steel breaks, and the sea claims its tribute.",
      "You fought with honor, but your tactical errors dictated this end.",
      "Your flagship was simply no match for our superior firepower.",
      "Another vessel strikes her colors and descends into the abyss.",
      "Your demise was inevitable. The Pacific accepts no weakness.",
      "A foolish deployment. Did you truly believe you could breach our line?",
      "It is a tragedy of war that your fine ship could not withstand our might.",
      "The ocean belongs to the relentless. Your fleet is weighed and found wanting.",
      "A grave miscalculation, Admiral. Your sacrifice changes nothing.",
      "You should have retreated while the fog of war allowed. Rest in the depths."
    ],
    enemyMiss: [
      "A momentary reprieve, Admiral. My spotters are correcting the range.",
      "Our next salvo will not be so forgiving.",
      "A clean miss. Enjoy the brief silence before the next barrage.",
      "You maneuver skillfully, but the ocean eventually runs out of room.",
      "You cannot escape the reach of the Imperial Navy forever.",
      "Your good fortune merely delays an unalterable conclusion.",
      "Our torpedoes will find their mark in due time. Steady the course.",
      "You have evaded the first wave. Prepare yourself for the second.",
      "Consider that a calibration of our optical range finders, Admiral.",
      "A minor miscalculation. My gunners possess an abundance of ammunition."
    ],
    noComment: ['...'],
    playerWin: [
      'Mission accomplished, Admiral! You have secured the Pacific theater.',
    ],
    enemyWin: [
      "The ledger of history is balanced, and the Pacific belongs to the Emperor.",
    ],
  }

  function getWelcomeMessage() {
    messages.welcome[0] += ` ${Game.getState().getPlayer().getName()}!`
    return messages.welcome
  }

  function getBattleStartMessage() {
    return [
      `${Game.getState().getPlayer().getName()} ${
        messages.battleStartPlayer[0]
      }`,
    ]
  }

  function getNewEnemyBattleStartMessage() {
    return messages.battleStartEnemy
  }

  function getNewEnemyHitMessage(previousMessage) {
    let newMessage = previousMessage
    let attempts = 0

    while (newMessage === previousMessage) {
      newMessage = messages.enemyHit[randomZeroToNine()]
      attempts += 1
      if (attempts > 50) break
    }

    return newMessage || messages.enemyHit[0]
  }

  function getNewEnemySunkMessage(previousMessage) {
    let newMessage = previousMessage
    let attempts = 0

    while (newMessage === previousMessage) {
      newMessage = messages.enemySunk[randomZeroToNine()]
      attempts += 1
      if (attempts > 50) break
    }

    return newMessage || messages.enemySunk[0]
  }

  function getNewPlayerMissMessage(previousMessage) {
    let newMessage = previousMessage
    let attempts = 0

    while (newMessage === previousMessage) {
      newMessage = messages.playerMiss[randomZeroToNine()]
      attempts += 1
      if (attempts > 50) break
    }

    return newMessage || messages.playerMiss[0]
  }

  function getNewPlayerHitMessage(previousMessage) {
    let newMessage = previousMessage
    let attempts = 0

    while (newMessage === previousMessage) {
      newMessage = messages.playerHit[randomZeroToNine()]
      attempts += 1
      if (attempts > 50) break
    }

    return newMessage || messages.playerHit[0]
  }

  function getNewPlayerSunkMessage(previousMessage) {
    let newMessage = previousMessage
    let attempts = 0

    while (newMessage === previousMessage) {
      newMessage = messages.playerSunk[randomZeroToNine()]
      attempts += 1
      if (attempts > 50) break
    }

    return newMessage || messages.playerSunk[0]
  }

  function getNewEnemyMissMessage(previousMessage) {
    let newMessage = previousMessage
    let attempts = 0

    while (newMessage === previousMessage) {
      newMessage = messages.enemyMiss[randomZeroToNine()]
      attempts += 1
      if (attempts > 50) break
    }

    return newMessage || messages.enemyMiss[0]
  }

  function getNoCommentMessage() {
    return messages.noComment
  }

  function getPlayerWinMessage() {
    return messages.playerWin
  }

  function getEnemyWinMessage() {
    return messages.enemyWin
  }

  function randomZeroToNine() {
    return Math.floor(Math.random() * 10)
  }

  return {
    getWelcomeMessage,
    getBattleStartMessage,
    getNewEnemyBattleStartMessage,
    getNewEnemyHitMessage,
    getNewEnemySunkMessage,
    getNewPlayerMissMessage,
    getNewPlayerHitMessage,
    getNewPlayerSunkMessage,
    getNewEnemyMissMessage,
    getNoCommentMessage,
    getPlayerWinMessage,
    getEnemyWinMessage,
  }
})()

export default Message
