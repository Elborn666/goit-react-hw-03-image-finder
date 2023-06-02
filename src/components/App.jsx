import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader"
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import css from "./App.module.css";
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
      images: [],
      isLoading: false,
      error: null,
      query: '',
      page: 1,
      showModal: false,
      selectedImage: null,
      isLastPage: false,
    };

    componentDidUpdate(_prevProps, prevState) { 
      if (prevState.query !== this.state.query) {       
          this.setState({ images: [], page: 1, isLastPage: false }, () => {
      this.fetchImages();
    });
        }  
    }

    fetchImages = () => {
      const { query, page } = this.state;
      const API_KEY = '35466076-08e8024219c108266a372e8b8';
  
      this.setState({ isLoading: true });
  
      axios
        .get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          const { hits, totalHits } = response.data;
  
          if (hits.length === 0) { 
          return toast('Sorry, there are no images matching your request...', {position: toast.POSITION.TOP_CENTER, icon: "🤔"});
          }
  
          const modifiedHits = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL
      }));
  
          this.setState(prevState => ({
            images: [...prevState.images, ...modifiedHits],
            page: prevState.page + 1,
            isLastPage: prevState.images.length + modifiedHits.length >= totalHits,
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    };

    handleSubmit = query => {
      if (this.state.query === query) {
      return;
    }
  this.setState({ query: query, page: 1, images: [], error: null, isLastPage: false });
};

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  render () {

    const { images, isLoading, error, showModal, selectedImage, isLastPage } = this.state;

    return (
      <div className={css.App}>
        <ToastContainer transition={Flip}/>
        <Searchbar onSubmit={this.handleSubmit} />

        {error && <p>Error: {error}</p>}

        <ImageGallery images={images} onItemClick={this.handleImageClick} />

        {isLoading && <Loader />}
        

        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={this.fetchImages} />
        )}

        {showModal && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
};


export default App