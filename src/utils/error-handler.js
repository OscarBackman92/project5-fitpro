export const handleNetworkError = (error) => {
    if (error.response) {
      return error.response.data.message || 'Server error occurred';
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    } else {
      return error.message || 'An error occurred';
    }
  };
  
  export const getErrorMessage = (error) => {
    if (error.response?.data) {
      if (typeof error.response.data === 'string') {
        return error.response.data;
      }
      if (typeof error.response.data === 'object') {
        return Object.values(error.response.data)[0] || 'An error occurred';
      }
    }
    return handleNetworkError(error);
  };