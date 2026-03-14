import api from "./index";

export const updateUserProfile = async (formData) => {
  // Tambahkan _method untuk Laravel method spoofing
  formData.append("_method", "PUT");

  const response = await api.post("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const changeUserPassword = async (data) => {
  const response = await api.put("/profile/password", data);
  return response.data;
};
