//LIBRARIES
import {applyMiddleware, createStore, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
//ASSETS
import rootSaga from './saga' // List of Sagas
import rootReducer from './reducers' // List of Reducers
import {sagaMonitor} from './Config'

const persistConfig = {
  // blacklist: ['Auth'],
  key: 'root',
  storage: AsyncStorage,
}
const Reducers = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware({sagaMonitor})
const middlewares = []
const enhancers = []
middlewares.push(sagaMiddleware, logger)
enhancers.push(applyMiddleware(...middlewares))

export const Store = createStore(Reducers, compose(...enhancers))
//persistStore contains all the data from store
export const Persistor = persistStore(Store)

sagaMiddleware.run(rootSaga)
