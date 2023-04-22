import {all, fork, takeLatest, call, put, throttle} from 'redux-saga/effects';
import axios from "axios";
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS, generateDummyPost, LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";
import shortId from "shortid";

function loadPostsAPI(data){
    return axios.get('/api/posts', data);
}

function addPostAPI(data){
    return axios.post('/api/addPost', data);
}

function addCommentAPI(data){
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function removePostAPI(data){
    return axios.delete('/api/removePost', data);
}

function* loadPosts(action){
    try{
        //const result = yield call(addPostAPI, action.data);
        console.log(action);
        const id = shortId.generate();

        yield put({
            type : LOAD_POSTS_SUCCESS,
            data : generateDummyPost(10),
        });
    }catch (err){
        yield put({
            type : LOAD_POSTS_FAILURE,
            data : err.response.data,
        });
    }
}

function* addPost(action){
    try{
        //const result = yield call(addPostAPI, action.data);
        console.log(action);
        const id = shortId.generate();

        yield put({
            type : ADD_POST_SUCCESS,
            data : {
                id,
                content : action.data
            }//result.data
        });
        yield put({
            type : ADD_POST_TO_ME,
            data : id,//result.data
        });
    }catch (err){
        yield put({
            type : ADD_POST_FAILURE,
            data : err.response.data,
        });
    }
}

function* removePost(action){
    try{
        //const result = yield call(addPostAPI, action.data);
        console.log(action);
        const id = shortId.generate();

        yield put({
            type : REMOVE_POST_SUCCESS,
            data : action.data
        });
        yield put({
            type : REMOVE_POST_OF_ME,
            data : action.data
        });
    }catch (err){
        yield put({
            type : REMOVE_POST_FAILURE,
            data : err.response.data,
        });
    }
}

function* addComment(action){
    try{
        //const result = yield call(addCommentAPI, action.data);
        yield put({
            type : ADD_COMMENT_SUCCESS,
            data : action.data//result.data
        });
    }catch (err){
        yield put({
            type : ADD_COMMENT_FAILURE,
            data : err.response.data,
        });
    }
}


function* watchLoadPosts(){
    yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchRemovePost),
        fork(watchAddComment)
    ])
}