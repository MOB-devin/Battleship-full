const SHIP_CONFIG = {
  carrier: { name: 'carrier', length: 5, label: 'Carrier (5f)' },
  battleship: { name: 'battleship', length: 4, label: 'Battleship (4f)' },
  cruiser: { name: 'cruiser', length: 3, label: 'Cruiser (3f)' },
  submarine: { name: 'submarine', length: 3, label: 'Submarine (3f)' },
  destroyer: { name: 'destroyer', length: 2, label: 'Destroyer (2f)' },
}

const FLEET_ORDER = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

export { SHIP_CONFIG, FLEET_ORDER }
