import axios from "axios";

const API_URL = "http://localhost:4000/api/users"; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error.response?.data || { message: "Error desconocido" };
  }
};
