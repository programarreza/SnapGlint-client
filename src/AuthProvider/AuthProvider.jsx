import { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:details"))
  );

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user:details")
  };

  const authInfo = {
    user,
    logout
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
