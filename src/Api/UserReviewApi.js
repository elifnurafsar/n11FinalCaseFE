const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

const UserReviewApi = {
  getAllUserReviews: async () => {
    const response = await fetch(`${API_URL}/Review`);
    return response.json();
  },

  getUserReviewById: async (id) => {
    const response = await fetch(`${API_URL}/Review/find-by-id?id=${id}`);
    return response.json();
  },

  getUserReviewsByUserId: async (userId) => {
    const response = await fetch(`${API_URL}/Review/find-all-by-user-id?userId=${userId}`);
    return response.json();
  },

  getUserReviewsByRestaurantId: async (restaurantId) => {
    const response = await fetch(`${API_URL}/Review/find-all-by-restaurant-id?restaurantId=${restaurantId}`);
    return response.json();
  },

  createUserReview: async (userReviewRequest) => {
    const response = await fetch(`${API_URL}/Review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userReviewRequest),
    });
    return response.json();
  },

  editUserReview: async (editUserReviewRequest) => {
    const response = await fetch(`${API_URL}/Review`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editUserReviewRequest),
    });
    return response.json();
  },

  deleteUserReview: async (id) => {
    const response = await fetch(`${API_URL}/Review?id=${id}`, {
      method: 'DELETE',
    });
    return response.status === 200;
  },
};

export default UserReviewApi;
