import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";

/* Pages */

import Home from "./pages/Home";

import Scanner from "./pages/Scanner";

import Dashboard from "./pages/Dashboard";

import Reports from "./pages/Reports";

import About from "./pages/About";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Profile from "./pages/Profile";

import Settings from "./pages/Settings";

/* Protected */

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        
        {/* MAIN */}

        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                {/* PUBLIC */}

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/about"
                  element={<About />}
                />

                {/* PROTECTED */}

                <Route
                  path="/scanner"
                  element={
                    <ProtectedRoute>
                      <Scanner />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;