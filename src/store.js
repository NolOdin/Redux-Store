import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger';
import rootReduser from './redusers';


export default () => {

   const store = createStore(rootReduser, applyMiddleware(logger))

   return store;


}

