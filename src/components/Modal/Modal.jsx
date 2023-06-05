import css from './Modal.module.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Modal extends Component {
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);    
    }
  
    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  
    handleKeyDown = event => {
      if (event.code === 'Escape') {
        this.props.onClose();
      }
    };
  
    handleClick = event => {
      if (event.target === event.currentTarget) {
        this.props.onClose();
      }
    };
  
    render() {
      const { largeImageURL, alt } = this.props;
  
      return (
        <div className={css.Overlay} onClick={this.handleClick}>
          <div className={css.Modal}>
            <img src={largeImageURL} alt={ alt } />
          </div>
        </div>
      );
    }
  }
  
  Modal.propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };
  

export default Modal 