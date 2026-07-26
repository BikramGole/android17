import React from 'react'
import { Provider } from 'react-redux'
import { Background, OverLay } from 'components/background'
import Home from 'containers/home'
import { loadSettings } from 'store/actions/index'
import store from 'store'
import 'components/main.scss'

export default function AndroidApp() {
  React.useEffect(() => {
    if (!window.onstart) {
      window.onstart = loadSettings()
    }
  }, [])

  return (
    <Provider store={store}>
      <div className="App" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <div className="appwrap" style={{ width: '100%', height: '100%' }}>
          <Background />
          <Home />
          <OverLay />
        </div>
      </div>
    </Provider>
  )
}
