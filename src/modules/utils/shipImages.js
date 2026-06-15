import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'

const SHIP_IMAGES = { carrier, battleship, cruiser, submarine, destroyer }

function loadShipImage(shipName) {
  return SHIP_IMAGES[shipName] || ''
}

export { SHIP_IMAGES, loadShipImage }
