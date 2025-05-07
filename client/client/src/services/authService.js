const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};


export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, loginData);
    
    const { token, user } = response.data; // Ensure backend returns user details

    // Store token & user details
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user._id);  // ✅ Store userId correctly
    localStorage.setItem("userName", user.name);

    return response.data;
  } catch (error) {
    console.error("🔥 Login Failed:", error.response?.data?.message || error.message);
    throw error;
  }
};

