import React from 'react'
import { connect } from 'react-redux'

export const TotalCalories = () => (<div>TOTAL CALORIES HERE</div>)

export default connect(state => state, dispatch => ({}))(TotalCalories)
