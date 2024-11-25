import axios from 'axios';
import apiClient from './apiClient';

/**
 * Sign up a new user.
 * @param email User's email address.
 * @param password User's password.
 * @param givenName User's first name.
 * @param familyName User's last name.
 */
export const signUp = async (
  email: string,
  password: string,
  givenName: string,
  familyName: string
) => {
  const response = await apiClient.post('/users/signup', {
    email,
    password,
    givenName,
    familyName,
  });
  return response.data;
};

/**
 * Confirm user sign-up with a verification code.
 * @param email User's email address.
 * @param code Verification code sent to the user's email.
 */
export const confirmSignUp = async (email: string, code: string) => {
  const response = await apiClient.post('/users/confirm', {
    email,
    code,
  });
  return response.data;
};

/**
 * Sign in an existing user.
 * @param email User's email address.
 * @param password User's password.
 */
export const signIn = async (email: string, password: string) => {
  const response = await apiClient.post('/users/signin', {
    email,
    password,
  });
  return response.data;
};

/**
 * Fetch data from a protected route.
 */
export const getProtectedData = async () => {
  const response = await apiClient.get('/protected-route');
  return response.data;
};

/**
 * Fetch a response from the ChatGPT API.
 * @param prompt The prompt to send to ChatGPT.
 */
export const getChatGPTResponse = async (prompt: string) => {
  const response = await apiClient.post('/gpt', { prompt });
  return response.data;
};

/**
 * Log out the current user by invalidating the token.
 */
export const logout = async () => {
  try {
    await apiClient.post('/logout'); // No headers required; apiClient adds them
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    localStorage.removeItem('authToken'); // Clean up token locally
  }
};

/**
 * Fetch a list of all available medicines.
 */
export const getAllMedicines = async () => {
  const response = await apiClient.get('/medicine/getAllMedicine');
  localStorage.setItem('medicines', JSON.stringify(response.data));
};
