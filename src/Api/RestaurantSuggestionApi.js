import axios from 'axios';

const BASE_URL = 'http://localhost:8080/Restaurants';

const restaurantSuggestionApi = {
  findTop3: async (latitude, longitude) => {
    try {
      const response = await axios.get(`${BASE_URL}/find-top-three`, {
        params: {
          latitude: latitude,
          longitude: longitude
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top 3 restaurants:', error);
      throw error;
    }
  }
};

export default restaurantSuggestionApi;
