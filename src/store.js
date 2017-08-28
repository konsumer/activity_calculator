/* global localStorage */
import { createStore } from 'redux'

import mets from './mets.json'

const categories = Object.values(mets)
  .map(m => m.category)
  .filter((v, i, cats) => cats.indexOf(v) === i)

const weight = localStorage.weight && parseFloat(localStorage.weight)

const defaultState = {
  mets,
  categories,
  showAddDialog: false,
  showSettingsDialog: false,
  log: localStorage.log ? JSON.parse(localStorage.log) : [],
  category: null,
  action: null,
  currentTime: Date.now(),
  weight,
  setWeight: weight || ''
}

const store = createStore(
  (state = defaultState, action) => {
    if (action.type === 'set') return {...state, ...action.payload}
    if (action.type === 'add_log') {
      const log = state.log.slice()
      log.push({start: Date.now(), running: true, activity: state.activity})
      localStorage.log = JSON.stringify(log)
      return {...state, showAddDialog: false, log}
    }
    if (action.type === 'remove_log') {
      const log = state.log.slice()
      log.splice(action.payload, 1)
      localStorage.log = JSON.stringify(log)
      return {...state, log}
    }
    if (action.type === 'stop_log') {
      const log = state.log.slice()
      log[action.payload].running = false
      log[action.payload].end = Date.now()
      localStorage.log = JSON.stringify(log)
      return {...state, log}
    }
    if (action.type === 'set_weight') {
      localStorage.weight = state.setWeight
      return {...state, showSettingsDialog: false, weight: parseFloat(state.setWeight)}
    }
    return state
  },
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

setInterval(() => store.dispatch({type: 'set', payload: {currentTime: Date.now()}}), 1000)

export default store
