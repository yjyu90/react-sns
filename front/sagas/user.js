import {all, fork, takeLatest, call, put} from 'redux-saga/effects';
import axios from "axios";
import {
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS
} from "../reducers/user";

function followAPI(data){
    return axios.post('/api/follow', data);
}

function unfollowAPI(data){
    return axios.post('/api/unfollow', data);
}

function logInAPI(data){
    return axios.post('/user/login', data);
}


function signUpAPI(data){
    return axios.post('/user', data);
}

function* signUp(action){
    try{
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
            type : SIGN_UP_SUCCESS,
            data : action.data
        });
    }catch(err){
        yield put({
            type : SIGN_UP_FAILURE,
            error : err.response.data
        })
    }
}

function* logIn(action){
    try{
        const result = yield call(logInAPI, action.data);
        console.log(result);
        yield put({
            type : LOG_IN_SUCCESS,
            data : result.data
        });
    }catch(err){
        yield put({
            type : LOG_IN_FAILURE,
            error : err.response.data
        })
    }
}

function logOutAPI() {
    return axios.post('/user/logout');
}

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}


function* follow(action){
    try{
        //const result = yield call(followAPI());
        yield put({
            type : FOLLOW_SUCCESS,
            data : action.data
        });
    }catch (err){
        yield put({
            type : FOLLOW_FAILURE,
            error : err.response.data,
        });
    }
}

function* unfollow(action){
    try{
        //const result = yield call(unfollowAPI());
        yield put({
            type : UNFOLLOW_SUCCESS,
            data : action.data
        });
    }catch (err){
        yield put({
            type : UNFOLLOW_FAILURE,
            error : err.response.data,
        });
    }
}

function loadUserAPI() {
    return axios.get(`/user`);
}

function* loadUser(action) {
    try {
        console.log('loadUser' + action.data);
        const result = yield call(loadUserAPI, action.data);
        console.log('loadUserData', result.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_USER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

/*function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}*/

export default function* userSaga(){
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchLoadUser),
        ])
}
