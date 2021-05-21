import React from 'react'
import dayjs from 'dayjs'
import ReactDOM from 'react-dom'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Provider } from 'react-redux'
import App from './App'
import history from './app/utils/history'
import { ConnectedRouter } from 'connected-react-router'
import configureStore from './configureStore'

dayjs.extend(relativeTime)

const initialState = {};
const store = configureStore(initialState, history)
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
