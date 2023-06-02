import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from "./ImageGallery.module.css"



const ImageGallery = ({ images, onItemClick }) => {
    return (
        <ul className={css.ImageGallery}>
            {images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    image={image}
                    onItemClick={onItemClick}
                />
            ))}
        </ul>
    )
}

export default ImageGallery

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ).isRequired,
    onItemClick: PropTypes.func.isRequired,
};