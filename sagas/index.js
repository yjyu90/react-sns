import {all, fork, take, call, put} from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(){
    return axios.post('/api/login');
}

function* logIn(){
    try{
        const result = yield call(logInAPI);
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

function* watchLogIn(){
    yield take('LOG_IN', logIn);
}

function* watchLogOut(){
    yield take('LOG_OUT');
}

function* watchAddPost(){
    yield take('ADD_POST');
}

export default function* rootSaga(){
    yield all([
       fork(watchLogIn), // fork, call 차이점 : fork는 비동기 실행, call은 동기 실행
        fork(watchLogOut),
        fork(watchAddPost),
    ]);
}
