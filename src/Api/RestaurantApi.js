const BASE_URL = 'http://localhost:8081/Restaurants';

const restaurantApi = {
  getAllRestaurants: async () => {
    const response = await fetch(BASE_URL);
    return response.json();
  },

  getRestaurantById: async (id) => {
    const response = await fetch(`${BASE_URL}/find-by-id?id=${id}`);
    return response.json();
  },

  searchRestaurantsByName: async (name) => {
    const response = await fetch(`${BASE_URL}/search?name=${name}`);
    return response.json();
  },

  findRestaurantsWithin10Kilometers: async (latitude, longitude) => {
    const response = await fetch(`${BASE_URL}/restaurants/within-10-kilometers/by-params?latitude=${latitude}&longitude=${longitude}`);
    return response.json();
  },

  createRestaurant: async (restaurantData) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(restaurantData)
    });
    return response.json();
  },

  updateRestaurant: async (id, restaurantData) => {
    const response = await fetch(`${BASE_URL}?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(restaurantData)
    });
    return response.json();
  },

  updateRestaurantScore: async (scoreData) => {
    const response = await fetch(`${BASE_URL}/score`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scoreData)
    });
    return response.json();
  },

  deleteRestaurant: async (id) => {
    const response = await fetch(`${BASE_URL}?id=${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

export default restaurantApi;
