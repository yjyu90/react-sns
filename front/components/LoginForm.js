import React, {useCallback, useState, useMemo, useEffect} from 'react';
import useInput from '../hooks/useinput';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {loginRequestAction} from "../reducers/user";

const ButtonWrapper = styled.div`
  margin-top:10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () =>{
    const dispatch = useDispatch();
    const {logInLoading, logInError} = useSelector((state)=>(state.user));
    /*const [id, setId] = useState('');
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);*/
    const [id, onChangeId] = useInput('');
    const [email, onChangeEmail] = useInput('');
    /*const [password, setPassword] = useState('');
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);*/
    const [password, onChangePassword] = useInput('');

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }
    }, [logInError]);
    //const style = useMemo(() => ({marginTop: 10}), []);

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        //setIsLoggedIn(true);
        dispatch(loginRequestAction({email, password}));
    }, [email, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br/>
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
}

/*LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
}*/

export default LoginForm;
