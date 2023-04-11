import {Avatar, Button, Card, Comment, List, Popover} from "antd";
import {HeartOutlined, MessageOutlined, RetweetOutlined, EllipsisOutlined, HeartTwoTone} from "@ant-design/icons";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import PostImages from "./PostImages";
import {useCallback, useState} from "react";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
//jsx 안에
const PostCard = ({post}) => {
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);

    const {me} = useSelector(state => state.user);
    const onToggleLike = useCallback((e) => {
        setLiked((prev) => !prev);
    },[]);
    const onToggleComment = useCallback((e) => {
        setCommentFormOpened((prev)=> !prev);
    },[]);
    const id = me?.id;

    return (
        <div style={{marginBottom:20}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet"/>,
                    liked ? <HeartTwoTone twoToneColor="#eb2f96" key="twotone" onClick={onToggleLike}></HeartTwoTone> : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ? (
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
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}>
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                </Comment>
                            </li>
                        )}
                    />
                </div>
            )}
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
