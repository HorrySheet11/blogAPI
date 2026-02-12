import  { createContext, useState, useEffect } from "react";
import axios from "axios"; 

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const currentUser = axios.get(`${import.meta.env.VITE_API_URL}/user`);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          withCredentials: true
        });
        const currentUser = response.data;
        setUser(currentUser);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
