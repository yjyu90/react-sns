export const initialState = {
    mainPosts:[{
        id:1,
        User: {
            id:1,
            nickname:'테스트이름1',
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images:[{
            src:''
        }],
        Comments:[{
            User:{
                nickname:'hero1'
            },
            content:'커맨트 내용입니다.1'
        }, {
            User:{
                nickname:'hero2'
            },
            content:'커맨트 내용입니다.2'
        }]
    }],
    imagePaths:[],
    postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
    type : ADD_POST,
}

const dummyPost = {
    id: 2,
    content: '테스트 더미 입니다.',
    User:{
        id:1,
        nickname:'테스트닉네임3'
    },
    Images: [],
    Comments: [],
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            }
        default:
            return state;
    }
};

export default reducer;
