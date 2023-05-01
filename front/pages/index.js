import AppLayout from "../components/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import {useEffect} from "react";
import {LOAD_POSTS_REQUEST} from "../reducers/post";
import {LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST} from "../reducers/user";
import wrapper from '../store/configureStore';
import axios from "axios";
import {END} from "redux-saga";
const Home = () =>{
    const dispatch = useDispatch();
    const {me} = useSelector(state => state.user);
    const {mainPosts, hasMorePosts, loadPostsLoading, retweetError} = useSelector(state => state.post);

    useEffect(() => {
        if (retweetError) {
            alert(retweetError);
        }
    }, [retweetError]);

    /*useEffect(()=>{
        dispatch({
            type: LOAD_USER_REQUEST,
        });
        console.log(`LOAD_POSTS_REQUEST occured`);
        dispatch({
           type: LOAD_POSTS_REQUEST,
        });
    }, []);*/

    useEffect(()=>{

        function onScroll(){
            //scrollY: 얼마나 내렸는지
            //clientHeight: 화면에 보이는 길이
            //scrollHeight: 총 길이
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                console.log('LOAD_POSTS_REQUEST onScroll occured');
                if(hasMorePosts && !loadPostsLoading){
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePosts, loadPostsLoading, mainPosts]);

console.log(`mainPosts`+ mainPosts);

    return(
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map(post =><PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
}
//getStaticProps  :  언제 접속해도 데이터가 바뀌는 경우가 없을 때
//getServerSideProps  :  접속할 때마다 접속한 상황에 따라서 화면이 바뀌어야 하는 경우에 사용
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);//REQUEST -> SUCCESS 되기 까지 기다린다.
    await context.store.sagaTask.toPromise();
});

export default Home;
