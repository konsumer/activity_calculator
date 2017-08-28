import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Panel from 'muicss/lib/react/panel'
import Button from 'muicss/lib/react/button'

import mets from './mets.json'

import {titleCase, calories} from './utils'

import './LogItem.css'

export const LogItem = ({item, weight, onStopClick, onRemoveClick}) => {
  const classes = ['LogItem']
  if (item.running) {
    classes.push('running')
  }
  return (
    <Panel className={classes.join(' ')}>
      <div className='LogItemHeader'>
        <h3>{titleCase(mets[item.activity].category)}</h3>
        <div>{item.running ? `started ${moment(item.start).toNow(true)} ago` : `${moment(item.start).calendar()} - ${moment(item.end).calendar()}`}</div>
        <div style={{marginLeft: 30}}>{calories(weight, mets[item.activity].mets, item.start, item.end)} calories</div>
      </div>
      <div className='LogItemHeader'>
        <h4>{mets[item.activity].activity}</h4>
        {item.running && <Button onClick={onStopClick(item.id)} color='accent'><i className='material-icons'>stop</i> stop</Button>}
        <Button onClick={onRemoveClick(item.id)} color='danger'><i className='material-icons'>remove_circle_outline</i> remove</Button>
      </div>
    </Panel>
  )
}

export default connect(state => state, dispatch => ({
  onStopClick: payload => e => dispatch({type: 'stop_log', payload}),
  onRemoveClick: payload => e => dispatch({type: 'remove_log', payload})
}))(LogItem)
