import {all, fork, take, call, put} from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data){
    return axios.post('/api/login', data);
}

function logOutAPI(){
    return axios.post('/api/logout');
}

function addPostAPI(data){
    return axios.post('/api/addPost', data);
}

function* logIn(action){
    try{
        const result = yield call(logInAPI, action.data);
        yield put({
            type : 'LOG_IN_SUCCESS',
            data : result.data
        });
    }catch(err){
        yield put({
            type : 'LOG_IN_FAILURE',
            data : err.response.data
        })
    }
}

function* logOut(){
    try{
        const result = yield call(logOutAPI());
        yield put({
            type : 'LOG_OUT_SUCCESS',
            data : result.data
        });
    }catch (err){
        yield put({
           type : 'LOG_OUT_FAILURE',
           data : err.response.data,
        });
    }
}

function* addPost(action){
    try{
        const result = yield call(addPostAPI, action.data);
        yield put({
            type : 'ADD_POST_SUCCESS',
            data : result.data
        });
    }catch (err){
        yield put({
            type : 'ADD_POST_FAILURE',
            data : err.response.data,
        });
    }
}

function* watchLogIn(){
    yield take('LOG_IN_REQUEST', logIn);
}

function* watchLogOut(){
    yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost(){
    yield take('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga(){
    yield all([
       fork(watchLogIn), // fork, call 차이점 : fork는 비동기 실행, call은 동기 실행
        fork(watchLogOut),
        fork(watchAddPost),
    ]);
}
