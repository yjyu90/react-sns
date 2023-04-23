import React, {useCallback} from 'react';
import {Card, Avatar, Button} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {logoutRequestAction} from "../reducers/user";

const UserProfile = () =>{
    const dispatch = useDispatch();

    const {me, logOutLoading} = useSelector(state => state.user);

    const onLogOut = useCallback(() =>{
        //setIsLoggedIn(false);
        dispatch(logoutRequestAction());
    }, []);

    return(
        <Card
            actions={[
                <div key="twit">tweet<br />{me?.Posts?.length}</div>,
                <div key="followings">팔로잉<br />{me?.Followings?.length}</div>,
                <div key="follower">팔로워<br />{me?.Followers?.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me?.nickname ? me?.nickname[0] : ''}</Avatar>}
                title={me?.nickname}
            />
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;
