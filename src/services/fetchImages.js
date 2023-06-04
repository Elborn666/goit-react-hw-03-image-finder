import axios from 'axios';
import {toast} from 'react-toastify';


const fetchImages = ( query, page ) => {
  const API_KEY = '35466076-08e8024219c108266a372e8b8';

  // this.setState({ isLoading: true });

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
  });
}


export default fetchImages