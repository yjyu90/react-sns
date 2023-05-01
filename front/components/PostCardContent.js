import PropTypes from "prop-types";
import Link from 'next/link';
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import useInput from "../hooks/useinput";
import {useCallback, useEffect, useRef} from "react";
import {REMOVE_IMAGE, UPDATE_POST_REQUEST, UPDATE_UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_REQUEST} from "../reducers/post";

const PostCardContent = ({postData, editMode, onChangePost, onCancelUpdate}) => {
    const { imagePaths, updatePostDone } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useInput('');

    useEffect(() => {
        if (updatePostDone) {
            setText('');
        }
    }, [updatePostDone]);

    useEffect(() => {
        if(editMode){
            setText(postData);
        }
    }, [editMode]);

    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });
        formData.append('content', text);
        return dispatch({
            type: UPDATE_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('uploadImage', f);
        });
        dispatch({
            type: UPDATE_UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onRemoveImage = useCallback((index) => () => {//고차함수
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    }, []);

    return(
        editMode ?
            (
                <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
                    <Input.TextArea
                        value={text}
                        onChange={onChangeText}
                        maxLength={140}
                        placeholder="어떤 일이 있었나요?">
                    </Input.TextArea>
                    <div>
                        <input type="file" name="uploadImage" multiple hidden ref={imageInput} onChange={onChangeImages} />
                        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                        <Button type="primary" style={{float:'right'}} htmlType="submit">작성</Button>
                    </div>
                    <div>
                        {imagePaths.map((v, i) => (
                            <div key={v} style={{display:'inline-block'}}>
                                <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                                <div>
                                    <Button onClick={onRemoveImage(i)}>제거</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Form>
                )
         : (<div>
                {postData && postData.split(/(#[^\s#]+)/g).map((v, i) => {
                    if(v.match(/(#[^\s#]+)/)){
                        return <Link key={i} href={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
                    }
                    return v;
                })}
            </div>)
    )
}

PostCardContent.propTypes = {
    postData : PropTypes.string.isRequired,
    editMode : PropTypes.bool,
    onChangePost : PropTypes.func.isRequired,
    onCancelUpdate : PropTypes.func.isRequired,
}

PostCardContent.defaultProps = {
    editMode : false,
}

export default PostCardContent;
