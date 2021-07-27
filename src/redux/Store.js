import {applyMiddleware, createStore, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import rootSaga from './saga' 
import rootReducer from './reducers' 
import {sagaMonitor} from './Config'

const persistConfig = {
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
export const Persistor = persistStore(Store)

sagaMiddleware.run(rootSaga)
