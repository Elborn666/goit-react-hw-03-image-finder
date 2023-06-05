import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35466076-08e8024219c108266a372e8b8';


export async function getImages (searchQuery, page) {
  const OPTIONS = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${OPTIONS.toString()}`);
    return response.data;
  } catch (error) {
    console.error(error.toJSON());
  }
}