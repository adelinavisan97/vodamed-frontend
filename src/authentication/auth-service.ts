import axios from "axios";

const API_URL = "http://localhost:5555/api";

export const signUp = async (
  email: string,
  password: string,
  givenName: string,
  familyName: string
) => {
  const response = await axios.post(`${API_URL}/users/signup`, {
    email,
    password,
    givenName,
    familyName,
  });
  return response.data;
};

export const confirmSignUp = async (email: string, code: string) => {
  const response = await axios.post(`${API_URL}/users/confirm`, {
    email,
    code,
  });
  return response.data;
};

export const signIn = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/signin`, {
    email,
    password,
  });
  return response.data;
};

export const getProtectedData = async () => {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(`${API_URL}/protected-route`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getChatGPTResponse = async (prompt: string) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found");
  }
  const response = await axios.post(
    `${API_URL}/api/chatgpt`,
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem("authToken");
  await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  localStorage.removeItem("authToken");
};
