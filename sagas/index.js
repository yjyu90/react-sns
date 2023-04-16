import {all, fork, take, call, put} from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';



export default function* rootSaga(){
    yield all([
       fork(postSaga), // fork, call 차이점 : fork는 비동기 실행, call은 동기 실행
        fork(userSaga),
    ]);
}
