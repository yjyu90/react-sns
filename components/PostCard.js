import {Card} from "antd";
import {HeartOutlined, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
const PostCard = (post) => {
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined />,
                    <HeartOutlined />,
                    <MessageOutlined />,
                ]}
            >
                <Image>

                </Image>
                <Content>

                </Content>
                <Button>

                </Button>
            </Card>
        </div>
    );
};

export default PostCard;
