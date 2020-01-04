import { createStore } from 'redux'
import reducer from './reducers'

function configureStore() {
  return createStore(reducer)
}

export default configureStore
