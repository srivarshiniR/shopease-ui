// Set Token
export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      console.log('stored token---->',token);
      
    } else {
      localStorage.removeItem('token');
    }
  };
  
  // Get Token
  export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  // Clear Token
  export const clearAuthToken = () => {
    localStorage.removeItem('token');
  };
  