import { createContext, useContext, useState } from "react";
import { logout } from "../helpers/authService";

type AuthContextType = {
  user: User | null;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);
type ChildrenType = {
  children: React.ReactNode;
};
type User = {
  id: number;
  email: string;
};
export function AuthProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = (user: User) => {
    setUser(user);
  };
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value == null) {
    throw new Error("useAuth has to be used within <AuthProvider />");
  }
  return value;
};
