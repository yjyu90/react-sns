import PropTypes from "prop-types";
import {useCallback, useState} from "react";

const PostImages = ({images}) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback((e) => {
        setShowImagesZoom(true);
    },[]);
    if(images.length === 1){
        return (
            <>
                <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
            </>
        )
    }
    return (
        <div></div>
    )
}

PostImages.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;
