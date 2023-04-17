import shortId from 'shortid';
import {act} from "react-dom/test-utils";
import produce from "immer";

export const initialState = {
    mainPosts:[{
        id:1,
        User: {
            id:1,
            nickname:'테스트이름1',
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images:[{
            id: shortId.generate(),
            src:'https://cms-cdn.placeholder.co/Home_page1_76f0b1d7ab.png?width=3840'
        }, {
            id: shortId.generate(),
            src:'https://mblogthumb-phinf.pstatic.net/MjAxOTExMDJfMzEg/MDAxNTcyNjQ3NTYwNzY0.OSSBhYdhOiVK-3Mjf4nG5L9Cxet1aMqAhgxprtotcg4g.w3yD5w7s0K0DSarrjCNxR9gMWuwJYGCY8C1i68r34Zog.PNG.hadaboni80/screenshot-www.w3schools.com-2019.11.02-07_32_21.png?type=w800'
        }, {
            id: shortId.generate(),
            src:'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'
        }],
        Comments:[{
            id: shortId.generate(),
            User:{
                id: shortId.generate(),
                nickname:'hero1'
            },
            content:'커맨트 내용입니다.1'
        }, {
            id: shortId.generate(),
            User:{
                id: shortId.generate(),
                nickname:'hero2'
            },
            content:'커맨트 내용입니다.2'
        }]
    }],
    imagePaths:[],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';


export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type : ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type : ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data)=> ({
    id: data.id,
    content: data.content,
    User:{
        id:1,
        nickname:'테스트닉네임3'
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data)=> ({
    id: shortId.generate(),
    content: data,
    User:{
        id: 1,
        nickname:'테스터'
    }
});

//reducer 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성은 지키면서)
const reducer = (state = initialState, action) => {

    return produce(state, (draft) => {
        switch(action.type) {
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts = [dummyPost(action.data), ...draft.mainPosts];
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:{
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
                /*const postIndex = state.mainPosts.findIndex((v)=> v.id === action.data.postId);
                const post = {...state.mainPosts[postIndex]};
                post.Comments = [dummyComment(action.data.content), ...post.Comments];
                const mainPosts = [...state.mainPosts];
                mainPosts[postIndex] = post;

                return {
                    ...state,
                    mainPosts,
                    addCommentLoading: false,
                    addCommentDone: true
                };*/
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                break;
                //return state;
        }
    });
};

export default reducer;
