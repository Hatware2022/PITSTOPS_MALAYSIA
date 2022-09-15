import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import LoginReducer from "./reducers/LoginReducer";
import UserReducer from "./reducers/UserReducer";
import WorklistReducer from "./reducers/WorklistReducer";
import ProfileReducer from "./reducers/ProfileReducer";
import TasklistReducer from "./reducers/TasklistReducer";
import WorklistFilterReducer from "./reducers/WorklistFilterReducer";
import TasklistFilterReducer from "./reducers/TasklistFilterReducer";
import SavedReducer from './reducers/SavedReducer';
import OfflineReducer from "./reducers/OfflineReducer";
import ActivityLogReducer from "./reducers/ActivityLogReducer";
import WorkshopReducer from "./reducers/WorkshopReducer";

const rootReducer = combineReducers({
    user: UserReducer,
})

const AuthReducer = combineReducers({
    login: LoginReducer
})

const PitsReducer = combineReducers({
    root: rootReducer,
    auth: AuthReducer,
    worklist: WorklistReducer,
    activityLog: ActivityLogReducer,
    profile: ProfileReducer,
    tasklist: TasklistReducer,
    worklistFilter: WorklistFilterReducer,
    tasklistFilter: TasklistFilterReducer,
    saved: SavedReducer,
    offline: OfflineReducer,
    workshop: WorkshopReducer,
})

// Middleware : Redux Persist Config
const persistConfig = {
    key: 'pitstop',
    storage: AsyncStorage,
    //Save specific Reducers
    whitelist: [
        'root',
        'worklist',
        'tasklist',
        'offline'
    ],
    // Don't save specific Reducers
    blacklist: [],
};

//Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, PitsReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

//Middleware: Redux Persist Persister
let persistor = persistStore(store);

export { store, persistor };

