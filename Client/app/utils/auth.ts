import jwt from 'jsonwebtoken';

// This function will check if a token exists in localStorage and whether it's expired
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false; // Ensure we're in the browser
  
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken = jwt.decode(token) as { exp: number }; // Decode the token
    if (!decodedToken || !decodedToken.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return decodedToken.exp > currentTime; // Check if token is still valid
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};


export const fetchUserInfo = (): any => {
    if (typeof window === 'undefined') return false; // Ensure we're in the browser
    
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) return false;
  
    return userInfo
  };
  