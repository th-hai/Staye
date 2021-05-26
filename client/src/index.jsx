import React,  { Suspense } from 'react'
import dayjs from 'dayjs'
import ReactDOM from 'react-dom'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Provider } from 'react-redux'
import App from './containers/App/App'
import history from 'utils/history'
import { ConnectedRouter } from 'connected-react-router'
import configureStore from './configureStore'
import './assets/css/tailwind.output.css'
import { SidebarProvider } from './context/SidebarContext'
import ThemedSuspense from 'components/ThemedSuspense'
import { Windmill } from '@windmill/react-ui'

dayjs.extend(relativeTime)

const initialState = {};
const store = configureStore(initialState, history)
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences>
          <App />
        </Windmill>
      </Suspense>
      </SidebarProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
