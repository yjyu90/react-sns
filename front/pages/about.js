import React, {useEffect} from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import {useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import {LOAD_USER_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";
import {END} from "redux-saga";

const About = () => {

    const { me } = useSelector((state) => state.user);

    return (
        <>
            <Head>
                <title>내 프로필</title>
            </Head>
            {me ?
            <AppLayout>
                <NicknameEditForm />
            </AppLayout>
                : null
            }
        </>);
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
    context.store.dispatch({
        type: LOAD_USER_REQUEST,//특정한 사용자 정보 조회
        data: 1
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default About;
