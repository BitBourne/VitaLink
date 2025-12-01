import axiosPublic from '../api/axiosPublic';

export const authService = {
  // LOGIN Y REGISTRO (
  login: (email, password) => 
    axiosPublic.post("/auth/logIn", { email, password }),

  register: (userData) => 
    axiosPublic.post("/auth/signUp", userData),

  registerPaciente: (userData) => 
    axiosPublic.post("/auth/signUp", { ...userData, roleId: 3 }),

  registerEspecialista: (userData) => 
    axiosPublic.post("/auth/signUp", {
      ...userData,
      roleId: 2,
      medical_license_number: userData.medical_license_number,
      cedula_profesional: userData.cedula_profesional
    }),
  
  confirmAccount: (token) => 
    axiosPublic.post("/auth/signUp/confirm-account", { token }),

  // RESET PASSWORD
  forgotPassword: (email, medical_license = null) => 
    axiosPublic.post("/auth/reset-password", { 
      email, 
      ...(medical_license && { medical_license }) 
    }),

  validateResetToken: (token) => 
    axiosPublic.get(`/auth/reset-password/${token}`),

  resetPassword: (token, newPassword) => 
    axiosPublic.post(`/auth/reset-password/${token}`, { password: newPassword }),

  // SESIONES Y PERFIL
  getProfile: () => 
    axiosPublic.get("/auth/profile"),

  getSessions: () => 
    axiosPublic.get("/auth/sessions"),

  logoutSession: (sessionId) => 
    axiosPublic.delete(`/auth/sessions/${sessionId}`),

  logout: () => 
    axiosPublic.post("/auth/logout")
};

export default authService;