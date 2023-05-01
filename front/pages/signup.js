import AppLayout from "../components/AppLayout";
import Head from "next/head";
import {useCallback, useEffect, useState} from "react";
import useInput from "../hooks/useinput";
import {Button, Checkbox, Form, Input} from "antd";
import styled from "styled-components";
import {LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST} from "../reducers/user";
import {useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import wrapper from "../store/configureStore";
import axios from "axios";
import {END} from "redux-saga";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
    const dispatch = useDispatch();
    const {signUpLoading, signUpDone, signUpError, me} = useSelector(state => state.user);
    /*const [id, setId] = useState('');
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);*/

    useEffect(()=>{
        if(me && me.id){
            Router.replace('/');
        }
    }, [me && me.id]);

    useEffect(()=>{
        if(signUpDone){
            Router.replace('/');
        }
    },[signUpDone]);

    useEffect(()=>{
        if(signUpError){
            alert(signUpError);
        }
    },[signUpError]);

    const [email, onChangeEmail] = useInput('');

    /*const [nick, setNick] = useState('');
    const onChangeNick = useCallback((e) => {
        setNick(e.target.value);
    }, []);*/
    const [nickname, onChangeNickname] = useInput('');

    /*const [password, setPassword] = useState('');
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);*/
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');

    const [passwordError, setPasswordError] = useState(false);

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    },[]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);


    const onSubmit = useCallback(() => {
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        console.log(email, nickname, password);
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {email, password, nickname},
        });
    }, [email, password, passwordCheck, term]);

    return (
        <AppLayout>
            <Head>
                <title>회원가입</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br/>
                    <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br/>
                    <Input name="user-nick" value={nickname} onChange={onChangeNickname} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                    <br/>
                    <Input name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}> 이용약관에 동의합니다.</Checkbox>
                    {termError && <ErrorMessage>이용약관에 동의하셔야 합니다.</ErrorMessage>}
                </div>
                <div style={{marginTop:10}}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </div>
            </Form>
        </AppLayout>);
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

export default Signup;
