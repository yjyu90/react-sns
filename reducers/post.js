export const initialState = {
    mainPosts:[{
        id:1,
        User: {
            id:1,
            nickname:'테스트이름1',
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images:[{
            src:'https://cms-cdn.placeholder.co/Home_page1_76f0b1d7ab.png?width=3840'
        }, {
            src:'https://mblogthumb-phinf.pstatic.net/MjAxOTExMDJfMzEg/MDAxNTcyNjQ3NTYwNzY0.OSSBhYdhOiVK-3Mjf4nG5L9Cxet1aMqAhgxprtotcg4g.w3yD5w7s0K0DSarrjCNxR9gMWuwJYGCY8C1i68r34Zog.PNG.hadaboni80/screenshot-www.w3schools.com-2019.11.02-07_32_21.png?type=w800'
        }, {
            src:'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'
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
