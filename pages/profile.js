import React, {useEffect} from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import {useSelector} from "react-redux";
import Router from "next/router";

const Profile = () => {
    //const followerList = [{nickname: 'qasd'}, {nickname: 'zxcv'}, {nickname: 'tttr'}];
    //const followingList = [{nickname: 'wwww'}, {nickname: 'eeee'}, {nickname: 'rrrr'}];
    const {me} = useSelector(state => state.user);

    useEffect(()=>{
        if(!(me && me.id)){
            Router.push('/');
        }
    }, [me && me.id]);

    if(!me){
        return null;
    }

    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={me.Followings} />
                <FollowList header="팔로워" data={me.Followers} />
            </AppLayout>
        </>);
};

export default Profile;
