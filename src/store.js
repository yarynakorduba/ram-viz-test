import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./redux/reducers";
import sagas from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});

const configureStore = () => {
  const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore();
