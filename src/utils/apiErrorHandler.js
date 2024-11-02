export class ApiError extends Error {
    constructor(message, status, data) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.data = data;
    }
  }
  
  export const handleApiError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new ApiError(
        error.response.data?.message || 'An error occurred',
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new ApiError(
        'No response received from server',
        0,
        { type: 'network_error' }
      );
    } else {
      // Something happened in setting up the request
      throw new ApiError(
        error.message || 'An error occurred',
        0,
        { type: 'request_setup_error' }
      );
    }
  };
  
  export const getErrorMessage = (error) => {
    if (error instanceof ApiError) {
      return error.message;
    }
    
    if (error.response?.data) {
      if (typeof error.response.data === 'string') {
        return error.response.data;
      }
      if (typeof error.response.data === 'object') {
        return Object.values(error.response.data)[0];
      }
    }
    
    return error.message || 'An unexpected error occurred';
  };