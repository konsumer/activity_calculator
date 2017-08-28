import React from 'react'
import { connect } from 'react-redux'

import Button from 'muicss/lib/react/button'
import Panel from 'muicss/lib/react/panel'
import Container from 'muicss/lib/react/container'

import AddDialog from './AddDialog'
import SettingsDialog from './SettingsDialog'
import LogItem from './LogItem'
import TotalCalories from './TotalCalories'

import './App.css'

export const App = ({showAddDialog, showSettingsDialog, onAddClick, onSettingsClick, weight, log}) => (
  <div className='App'>
    {showAddDialog && (
      <div id='mui-overlay'>
        <Panel className='AddPanel'>
          <AddDialog />
        </Panel>
      </div>
    )}
    {showSettingsDialog && (
      <div id='mui-overlay'>
        <Panel className='SettingsPanel'>
          <SettingsDialog />
        </Panel>
      </div>
    )}
    <Container>
      <div className='AppContainerButtons'>
        <div><Button onClick={onAddClick} color='primary'><i className='material-icons'>note_add</i> add</Button></div>
        <div><Button onClick={onSettingsClick}><i className='material-icons'>settings</i> settings</Button></div>
      </div>
      {!weight && (<p>Please enter your weight in settings to get calories burned calculated.</p>)}
      {weight && (<TotalCalories />)}
      <div className='log'>
        {log.map((item, id) => (<LogItem key={id} item={{...item, id}} />))}
      </div>
    </Container>
  </div>
)

export default connect(state => state, dispatch => ({
  onAddClick: () => dispatch({type: 'set', payload: {showAddDialog: true}}),
  onSettingsClick: () => dispatch({type: 'set', payload: {showSettingsDialog: true}})
}))(App)
