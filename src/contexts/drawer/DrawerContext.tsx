import { createContext, useReducer, useCallback } from 'react'
import type { ReactNode } from 'react'
import { drawerReducer, initialDrawerState } from './drawerReducer'
import type { DrawerState, DrawerAction, RightDrawerTab } from '../../types/drawer'

interface DrawerContextValue {
  state: DrawerState
  dispatch: React.Dispatch<DrawerAction>
  openLeft: () => void
  closeLeft: () => void
  toggleLeft: () => void
  openRight: (tab?: RightDrawerTab) => void
  closeRight: () => void
  toggleRight: () => void
  closeAll: () => void
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(drawerReducer, initialDrawerState)

  const openLeft = useCallback(() => dispatch({ type: 'OPEN_LEFT' }), [])
  const closeLeft = useCallback(() => dispatch({ type: 'CLOSE_LEFT' }), [])
  const toggleLeft = useCallback(() => dispatch({ type: 'TOGGLE_LEFT' }), [])
  const openRight = useCallback(
    (tab?: RightDrawerTab) => dispatch({ type: 'OPEN_RIGHT', tab }),
    []
  )
  const closeRight = useCallback(() => dispatch({ type: 'CLOSE_RIGHT' }), [])
  const toggleRight = useCallback(() => dispatch({ type: 'TOGGLE_RIGHT' }), [])
  const closeAll = useCallback(() => dispatch({ type: 'CLOSE_ALL' }), [])

  return (
    <DrawerContext.Provider
      value={{ state, dispatch, openLeft, closeLeft, toggleLeft, openRight, closeRight, toggleRight, closeAll }}
    >
      {children}
    </DrawerContext.Provider>
  )
}
