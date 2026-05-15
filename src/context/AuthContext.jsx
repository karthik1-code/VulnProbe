import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  /*
    USER STATE
  */

  const [user, setUser] =
    useState(null);

  /*
    AUTH LOADING
  */

  const [loading, setLoading] =
    useState(true);

  /*
    LOAD USER SESSION
  */

  useEffect(() => {
    try {
      /*
        STORAGE
      */

      const storedUser =
        localStorage.getItem(
          "user"
        );

      const storedToken =
        localStorage.getItem(
          "token"
        );

      /*
        RESTORE SESSION
      */

      if (
        storedUser &&
        storedToken
      ) {
        setUser(
          JSON.parse(
            storedUser
          )
        );
      }
    } catch (error) {
      console.log(error);

      /*
        CLEAR BROKEN STORAGE
      */

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /*
    LOGIN
  */

  const login =
    async ({
      username,
      password,
    }) => {
      try {
        const response =
          await api.post(
            "/auth/login",

            {
              username,
              password,
            }
          );

        const data =
          response.data;

        /*
          SAVE TOKEN
        */

        localStorage.setItem(
          "token",

          data.token
        );

        /*
          SAVE USER
        */

        localStorage.setItem(
          "user",

          JSON.stringify(data)
        );

        /*
          UPDATE STATE
        */

        setUser(data);

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,

          message:
            error.response?.data
              ?.message ||
            "Login failed",
        };
      }
    };

  /*
    REGISTER
  */

  const register =
    async ({
      name,
      username,
      password,
    }) => {
      try {
        const response =
          await api.post(
            "/auth/register",

            {
              name,
              username,
              password,
            }
          );

        const data =
          response.data;

        /*
          SAVE TOKEN
        */

        localStorage.setItem(
          "token",

          data.token
        );

        /*
          SAVE USER
        */

        localStorage.setItem(
          "user",

          JSON.stringify(data)
        );

        /*
          UPDATE STATE
        */

        setUser(data);

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,

          message:
            error.response?.data
              ?.message ||
            "Register failed",
        };
      }
    };

  /*
    LOGOUT
  */

  const logout = () => {
    /*
      CLEAR STORAGE
    */

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    /*
      CLEAR STATE
    */

    setUser(null);

    /*
      REDIRECT
    */

    window.location.href =
      "/login";
  };

  /*
    LOADING SCREEN
  */

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,

        login,

        register,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}