import AppLayout from "../components/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import {useEffect} from "react";
import {LOAD_POST_REQUEST, LOAD_POSTS_REQUEST} from "../reducers/post";
import {LOAD_USER_REQUEST} from "../reducers/user";
const Home = () =>{
    const dispatch = useDispatch();
    const {me} = useSelector(state => state.user);
    const {mainPosts, hasMorePosts, loadPostsLoading} = useSelector(state => state.post);

    useEffect(()=>{
        dispatch({
            type: LOAD_USER_REQUEST,
        });
        console.log(`LOAD_POSTS_REQUEST occured`);
        dispatch({
           type: LOAD_POSTS_REQUEST,
        });
    }, []);

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
    }, [hasMorePosts, loadPostsLoading]);

console.log(`mainPosts`+ mainPosts);

    return(
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map(post =><PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
}

export default Home;
