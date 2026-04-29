export type RightDrawerTab = 'cart' | 'wishlist'

export interface DrawerState {
  leftOpen: boolean
  rightOpen: boolean
  rightTab: RightDrawerTab
}

export type DrawerAction =
  | { type: 'OPEN_LEFT' }
  | { type: 'CLOSE_LEFT' }
  | { type: 'TOGGLE_LEFT' }
  | { type: 'OPEN_RIGHT'; tab?: RightDrawerTab }
  | { type: 'CLOSE_RIGHT' }
  | { type: 'TOGGLE_RIGHT' }
  | { type: 'SET_RIGHT_TAB'; tab: RightDrawerTab }
  | { type: 'CLOSE_ALL' }
