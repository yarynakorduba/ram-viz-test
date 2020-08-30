import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducers from "./redux/reducers";

const configureStore = () => {
  return createStore(reducers, devToolsEnhancer({}));
};

export default configureStore();
