import {all, fork, take, call, put} from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga(){
    yield all([
       fork(postSaga), // fork, call 차이점 : fork는 비동기 실행, call은 동기 실행
        fork(userSaga),
    ]);
}
