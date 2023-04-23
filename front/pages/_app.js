import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const ReactSns = ({Component}) =>{
    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>react-sns</title>
            </Head>
            <Component></Component>
        </>
    )
};

ReactSns.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(ReactSns);
