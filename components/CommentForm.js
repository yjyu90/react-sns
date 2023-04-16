import {Button, Form, Input} from "antd";
import {useCallback, useEffect} from "react";
import useInput from "../hooks/useinput";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {ADD_COMMENT_REQUEST, addComment, addPost} from "../reducers/post";

const CommentForm = ({post}) => {
    const dispatch = useDispatch();
    const id = useSelector(state => state.user.me?.id);
    const {addCommentDone, addCommentLoading} = useSelector(state => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if(addCommentDone){
            setCommentText('');
        }
    },[addCommentDone]);

    const onSubmitComment = useCallback((e) => {
        console.log(post.id, commentText);
        /*dispatch({
            type : ADD_COMMENT_REQUEST,
            data : {
                content : commentText,
                postId : post.id,
                userId : id
            }
        });*/
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText, id]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position:'relative', margin:0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}>
                </Input.TextArea>
                <Button style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }} type="primary" htmlType="submit" loading={addCommentLoading}>제출</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,

}

export default CommentForm;
