import {Button, Form, Input} from "antd";
import {useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useInput from "../hooks/useinput";
import {addPost} from "../reducers/post";

const PostForm = () => {
    const {imagePaths} = useSelector(state => state.post);
    const imageInput = useRef();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const onChangeText = useCallback((e)=> {
        setText(e.target.value);
    },[]);
    const onSubmit = useCallback((e) => {
        dispatch(addPost);
        setText('');
    }, []);

    const onClickImageUpload = useCallback((e)=>{
        imageInput.current.click();
    }, [imageInput.current]);

    return(
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 일이 있었나요?">
            </Input.TextArea>
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit">작성</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={v} style={{width: '200px'}} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default PostForm;
