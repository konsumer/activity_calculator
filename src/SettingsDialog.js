import React from 'react'
import { connect } from 'react-redux'

import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'

export const SettingsDialog = ({onCancelClick, onSetClick, onWeightChange, setWeight}) => (
  <div className='SettingsDialog'>
    <div>
      <Input onChange={onWeightChange} value={setWeight} label='Weight (Lbs)' floatingLabel />
      <Button onClick={onCancelClick} color='danger'><i className='material-icons'>cancel</i> cancel</Button>
      <Button onClick={onSetClick} color='primary'><i className='material-icons'>save</i> set</Button>
    </div>
  </div>
)

export default connect(state => state, dispatch => ({
  onCancelClick: () => dispatch({type: 'set', payload: {showSettingsDialog: false}}),
  onSetClick: () => dispatch({type: 'set_weight'}),
  onWeightChange: e => dispatch({type: 'set', payload: {setWeight: e.target.value}})
}))(SettingsDialog)
