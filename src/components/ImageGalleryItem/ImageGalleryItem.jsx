import css from "./ImageGalleryItem.module.css"
import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onItemClick }) => {
    const handleClick = () => {
        onItemClick(image);
      };
    return (
        <li className={css.ImageGalleryItem} onClick = {handleClick}>
            <img src={image.webformatURL} alt={image.tags} className={css.ImageGalleryItem_image}/>
        </li>
    )
}


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
