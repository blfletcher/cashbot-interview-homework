import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'

import { AnalyticsDashboardContainer } from 'containers'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = () => {
  return (
    <div align="center">
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js.map" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore.js" />
        <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js" />
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js" />
        <script src="/js/canvasjs.react.js" />
        <script src="/js/canvasjs.min.js" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={ AnalyticsDashboardContainer } exact />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App
