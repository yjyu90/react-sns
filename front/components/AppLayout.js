import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Menu, Input, Row, Col} from 'antd';
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import {useSelector} from "react-redux";
import {createGlobalStyle} from "styled-components";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child{
    padding-left: 0 !important;
  }
  
  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;

const AppLayout = ({children}) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {me} = useSelector((state)=>state.user);

    const menuItems = [
        {
            label: <Link href="/"><a>sns</a></Link>,
            key: "sns",
        },
        {
            label: <Link href="/profile"><a>프로필</a></Link>,
            key: "profile",
        },
        {
            label: <SearchInput enterButton />,
            key: "enter",
        },
        {
            label: <Link href="/signup"><a>회원가입</a></Link>,
            key: "signup",
        }
    ];

    return (
        <div>
            <Global />
            <Menu mode="horizontal" items={menuItems}>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile ></UserProfile> : <LoginForm ></LoginForm>}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/youngjin-yu" target="_blank" rel="noreferrer noopener"> Made by yjyu</a>
                </Col>
            </Row>

        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,

};

export default AppLayout;
