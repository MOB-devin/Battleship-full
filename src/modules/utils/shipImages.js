import carrierUSA from '../../assets/images/carrierUSA.svg'
import battleshipUSA from '../../assets/images/battleshipUSA.svg'
import cruiserUSA from '../../assets/images/cruiserUSA.svg'
import submarineUSA from '../../assets/images/submarineUSA.svg'
import destroyerUSA from '../../assets/images/destroyerUSA.svg'

import carrierIJN from '../../assets/images/carrierIJN.svg'
import battleshipIJN from '../../assets/images/battleshipIJN.svg'
import cruiserIJN from '../../assets/images/cruiserIJN.svg'
import submarineIJN from '../../assets/images/submarineIJN.svg'
import destroyerIJN from '../../assets/images/destroyerIJN.svg'

const USA_SHIP_IMAGES = {
  carrier: carrierUSA,
  battleship: battleshipUSA,
  cruiser: cruiserUSA,
  submarine: submarineUSA,
  destroyer: destroyerUSA,
}

const IJN_SHIP_IMAGES = {
  carrier: carrierIJN,
  battleship: battleshipIJN,
  cruiser: cruiserIJN,
  submarine: submarineIJN,
  destroyer: destroyerIJN,
}

// SHIP_IMAGES kept for backward compatibility — setup cards always show USN
const SHIP_IMAGES = USA_SHIP_IMAGES

function loadShipImage(shipName, identity = 'player') {
  const images = identity === 'cpu' ? IJN_SHIP_IMAGES : USA_SHIP_IMAGES
  return images[shipName] || ''
}

export { SHIP_IMAGES, USA_SHIP_IMAGES, IJN_SHIP_IMAGES, loadShipImage }
