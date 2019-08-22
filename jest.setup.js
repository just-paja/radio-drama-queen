import Adapter from 'enzyme-adapter-react-16'

import { configure } from 'enzyme'

configure({ adapter: new Adapter() })

console.error = err => {
  throw err
}

// Required for workerpool to switch to node mode
global.Window = undefined
global.postMessage = null
