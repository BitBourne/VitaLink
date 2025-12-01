import { useAxiosPrivate } from '../api/useAxiosPrivate';

export const createUserService = () => {
  const axiosPrivate = useAxiosPrivate();
  
  return {
    //  PERFIL protegido
    getProfile: () => 
      axiosPrivate.get("/auth/profile"),

    updateProfile: (userData) => 
      axiosPrivate.put("/users/profile", userData),

    changePassword: (currentPassword, newPassword) => 
      axiosPrivate.put("/users/change-password", { 
        currentPassword, 
        newPassword 
      }),

    // SESIONES protegidas
    getSessions: () => 
      axiosPrivate.get("/auth/sessions"),

    logoutSession: (sessionId) => 
      axiosPrivate.delete(`/auth/sessions/${sessionId}`),

    // ADMIN: gestión de usuarios
    getUsers: (params = {}) => 
      axiosPrivate.get("/users", { params }),

    getUserById: (id) => 
      axiosPrivate.get(`/users/${id}`),

    updateUser: (id, userData) => 
      axiosPrivate.put(`/users/${id}`, userData),

    deleteUser: (id) => 
      axiosPrivate.delete(`/users/${id}`)
  };
};

export const useUserService = () => createUserService();