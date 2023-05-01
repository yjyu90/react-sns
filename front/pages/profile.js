import React, {useEffect} from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import {useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from "axios";
import {END} from "redux-saga";

const Profile = () => {
    //const followerList = [{nickname: 'qasd'}, {nickname: 'zxcv'}, {nickname: 'tttr'}];
    //const followingList = [{nickname: 'wwww'}, {nickname: 'eeee'}, {nickname: 'rrrr'}];
    const dispatch = useDispatch();
    const {me} = useSelector(state => state.user);

    useEffect(()=>{
        dispatch({
            type : LOAD_FOLLOWERS_REQUEST,
        });
        dispatch({
            type : LOAD_FOLLOWINGS_REQUEST,
        })
    },[]);

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
                <title>내 프로필</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={me.Followings} />
                <FollowList header="팔로워" data={me.Followers} />
            </AppLayout>
        </>);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});


export default Profile;
