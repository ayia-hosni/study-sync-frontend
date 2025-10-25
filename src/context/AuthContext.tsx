import React, { createContext, useContext, useState } from "react";
import { GraphQLClient } from "graphql-request";
import { LOGIN_MUTATION } from "@/graphql/mutations/login";

const API_URL = "http://studysync.test/graphql";
const client = new GraphQLClient(API_URL);

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("token") != null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const variables = { input: { email, password } };
      const data = await client.request(LOGIN_MUTATION, variables);

      const { token, user } = data.login;

      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);

      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
