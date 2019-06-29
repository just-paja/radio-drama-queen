import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

import { mockStore } from '../mock'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = mockStore({})
  ReactDOM.render(<App store={store} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
