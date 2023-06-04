import React, { Component } from 'react';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader"
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import css from "./App.module.css";
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getImages} from 'services/getImages';


class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,
    showModal: false,
    selectedImage: null,
    isLastPage: false,
    isButtonShow: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ page: 1, images: [], isButtonShow: false });
      if (nextPage === 1) {
        this.fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage) => {
    this.setState({ loading: true, error: false });
    const { hits, totalHits } = getImages(nextQuery, nextPage);

    const newData = hits.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      })
    );
    const currentData = [...this.state.images, ...newData];

    this.setState(prevState => ({
      images: [...prevState.images, ...newData],
    }));

    if (!totalHits) {
      this.setState({ loading: false, error: true });
      return toast.warn(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (currentData.length >= totalHits) {
      this.setState({
        loading: false,
        isButtonShow: false,
        error: false,
      });
      return;
    }

    this.setState({
      loading: false,
      isButtonShow: true,
      error: false,
    });
  };

  handleSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({ searchQuery: searchQuery, page: 1, images: [], error: null, isLastPage: false });
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  render() {
    const { images, loading, error, showModal, selectedImage, isLastPage } = this.state;

    return (
      <div className={css.App}>
        <ToastContainer transition={Flip} />
        <Searchbar onSubmit={this.handleSubmit} />

        {error && <p>Error: {error}</p>}

        <ImageGallery images={images} onItemClick={this.handleImageClick} />

        {loading && <Loader />}


        {!loading && images.length > 0 && !isLastPage && (
          <Button onClick={this.fetchGalleryItems} />
        )}

        {showModal && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
      </div>
    )
  }
};


export default App