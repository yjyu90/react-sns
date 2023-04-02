import React from 'react';
import {Button, Card, List} from 'antd';
import {StopOutlined} from "@ant-design/icons";
//아이콘과는 상관없고요. 리액트에서 배열 안에 jsx를 쓸때는 key를 붙여주어야합니다.
const FollowList = ({header,data}) => {
    return(
        <List
            style={{marginBottom: 20}}
            grid={{gutter:4, xs:2, md:3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{textAlign: 'center', margin:'10px 0'}}><Button>더 보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{marginTop:20}}>
                    <Card actions={[<StopOutlined key="stop" />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        >

        </List>
    )
}

export default FollowList;
