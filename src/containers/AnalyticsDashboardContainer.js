import React from 'react'
import { AnalyticsDashboardPage } from 'components'
import { connect } from 'react-redux'

let AnalyticsDashboardContainer = props => <AnalyticsDashboardPage {...props} />

AnalyticsDashboardContainer = connect()(AnalyticsDashboardContainer)

export default AnalyticsDashboardContainer

