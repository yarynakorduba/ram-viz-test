import { combineReducers } from "redux";
import pinsInfo from "./pinsInfo.red";
import memory from "./memory.red";
import visualizationSettings from "./visualizationSettings.red";

export default combineReducers({ memory, pinsInfo, visualizationSettings });
