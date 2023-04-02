import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const Nodebird = ({Component}) =>{
    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Nodebird</title>
            </Head>
            <Component></Component>
        </>
    )
};

Nodebird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(Nodebird);
