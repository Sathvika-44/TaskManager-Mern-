
export const registerUser = async (userData) => {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};


export const loginUser = async (loginData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", loginData);
    
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

