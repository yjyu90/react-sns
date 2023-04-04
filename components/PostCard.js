import {Button, Card, Popover} from "antd";
import {HeartOutlined, MessageOutlined, RetweetOutlined, EllipsisOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
//jsx 안에
const PostCard = ({post}) => {
    const {me} = useSelector(state => state.user);
    const id = me?.id;

    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet"/>,
                    <HeartOutlined key="heart" />,
                    <MessageOutlined key="comment" />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ?(
                                <>
                                    <Button>수정</Button>
                                    <Button type="danger">삭제</Button>
                                </>
                                ) :
                            <Button>신고</Button>}
                        </Button.Group>
                    )}>
                        <EllipsisOutlined></EllipsisOutlined>
                    </Popover>
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

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    })
}

export default PostCard;
