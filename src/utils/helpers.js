export const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };
  
  export const formatTime = (minutes) => {
    if (!minutes) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  export const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  export const validateFileSize = (file, maxSizeMB = 5) => {
    return file.size <= maxSizeMB * 1024 * 1024;
  };
  
  export const validateImageType = (file) => {
    return file.type.startsWith('image/');
  };
  
  export const getErrorMessage = (error) => {
    if (error.response?.data) {
      if (typeof error.response.data === 'string') {
        return error.response.data;
      }
      if (typeof error.response.data === 'object') {
        return Object.values(error.response.data)[0];
      }
    }
    return error.message || 'An error occurred';
  };