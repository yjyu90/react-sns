import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from "../reducers/index";
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
//redux-thunk : redux 가 비동기 action을 dispatch 할 수 있도록 도와주는 역할
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    //store.dispatch({
    //    type: 'CHANGE_NICKNAME',
    //    data: 'test23434'
    //});
    return store;
};

const wrapper = createWrapper(configureStore,{debug:process.env.NODE_ENV === 'development'});

export default wrapper;
