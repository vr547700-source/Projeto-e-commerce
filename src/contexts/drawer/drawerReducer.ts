import type { DrawerState, DrawerAction } from '../../types/drawer'

export const initialDrawerState: DrawerState = {
  leftOpen: false,
  rightOpen: false,
  rightTab: 'cart',
}

export function drawerReducer(state: DrawerState, action: DrawerAction): DrawerState {
  switch (action.type) {
    case 'OPEN_LEFT':
      return { ...state, leftOpen: true }
    case 'CLOSE_LEFT':
      return { ...state, leftOpen: false }
    case 'TOGGLE_LEFT':
      return { ...state, leftOpen: !state.leftOpen }
    case 'OPEN_RIGHT':
      return { ...state, rightOpen: true, rightTab: action.tab ?? state.rightTab }
    case 'CLOSE_RIGHT':
      return { ...state, rightOpen: false }
    case 'TOGGLE_RIGHT':
      return { ...state, rightOpen: !state.rightOpen }
    case 'SET_RIGHT_TAB':
      return { ...state, rightTab: action.tab }
    case 'CLOSE_ALL':
      return { ...state, leftOpen: false, rightOpen: false }
    default:
      return state
  }
}
