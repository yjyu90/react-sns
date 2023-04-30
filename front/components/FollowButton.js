import React, {useCallback} from 'react';
import {Button} from 'antd';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {FOLLOW_REQUEST, UNFOLLOW_REQUEST} from "../reducers/user";

const FollowButton = ({post}) => {
    const dispatch = useDispatch();
    const {me, followLoading, unfollowLoading} = useSelector(state => state.user);
    const isFollowing = me?.Followings.find((v)=>v.id === post.User.id);
    const onClickButton = useCallback(()=>{
        if(isFollowing){
            dispatch({
               type: UNFOLLOW_REQUEST,
                data: post.User.id
            });
        }else{
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id
            });
        }
    }, [isFollowing]);

    if (post.User.id === me.id) {//게시글의 작성자 id === 내 id 이면 팔로우, 언팔로우 버튼 보이지 않도록 반영
        return null;
    }

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    )
};

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
};

export default FollowButton;