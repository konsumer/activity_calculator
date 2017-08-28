import React from 'react'
import { connect } from 'react-redux'

import Button from 'muicss/lib/react/button'
import Dropdown from 'muicss/lib/react/dropdown'
import DropdownItem from 'muicss/lib/react/dropdown-item'

import './AddDialog.css'

import mets from './mets.json'

export const AddDialog = ({minutes, mets, categories, category, activity, onCategoryChange, onActivityChange, onCancelClick, onAddClick}) => {
  const activityName = activity && mets[activity] ? mets[activity].activity : 'Activity'
  return (
    <div className='AddDialog'>
      <div>
        <Dropdown color='primary' label={category || 'Category'}>
          {categories.map(cat => <DropdownItem key={cat} onClick={onCategoryChange(cat)}>{cat}</DropdownItem>)}
        </Dropdown>
      </div>
      <div>
        { category && (
        <Dropdown color='primary' label={activityName}>
          {Object.values(mets)
            .filter(met => met.category === category)
            .map(met => (
              <DropdownItem key={met.id} onClick={onActivityChange(met.id)}>{met.activity}</DropdownItem>
            ))
          }
        </Dropdown>
      ) }
      </div>
      <div>
        <Button onClick={onCancelClick} color='danger'><i className='material-icons'>cancel</i> cancel</Button>
        <Button disabled={!activity} onClick={onAddClick} color='primary'><i className='material-icons'>add_circle_outline</i> add</Button>
      </div>
    </div>
  )
}

export default connect(state => state, dispatch => ({
  onActivityChange: activity => e => dispatch({type: 'set', payload: {activity}}),
  onCategoryChange: category => e => dispatch({type: 'set', payload: {category, activity: null}}),
  onCancelClick: () => dispatch({type: 'set', payload: {showAddDialog: false}}),
  onAddClick: () => dispatch({type: 'add_log'})
}))(AddDialog)
