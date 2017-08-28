/* global localStorage */
import { compose, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

import mets from './mets.json'

const defaultState = {
  mets: {},
  categories: [],
  showAddDialog: false,
  showSettingsDialog: false,
  log: [],
  category: null,
  action: null,
  currentTime: Date.now(),
  weight: undefined,
  setWeight: localStorage['reduxPersist:weight'] ? localStorage['reduxPersist:weight'] : '180'
}

const composeEnhancers =
  typeof window === 'object' &&
  process && process.env && process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = createStore(
  (state = {}, action) => {
    const log = state.log ? state.log.slice() : []
    if (action.type === 'set') return {...state, ...action.payload}
    if (action.type === 'add_log') {
      log.push({start: Date.now(), running: true, activity: state.activity})
      return {...state, showAddDialog: false, log}
    }
    if (action.type === 'remove_log') {
      log.splice(action.payload, 1)
      return {...state, log}
    }
    if (action.type === 'stop_log') {
      log[action.payload].running = false
      log[action.payload].end = Date.now()
      return {...state, log}
    }
    if (action.type === 'set_weight') {
      return {...state, showSettingsDialog: false, weight: parseFloat(state.setWeight)}
    }
    return state
  },
  defaultState,
  composeEnhancers(
    autoRehydrate()
  )
)

const categories = Object.values(mets)
  .map(m => m.category)
  .filter((v, i, cats) => cats.indexOf(v) === i)
store.dispatch({type: 'set', payload: {mets, categories}})

setInterval(() => store.dispatch({type: 'set', payload: {currentTime: Date.now()}}), 1000)

persistStore(store, {blacklist: ['mets', 'categories', 'currentTime']})

export default store
