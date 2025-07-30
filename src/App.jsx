// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./context/AuthContext";
import MembersPage from "./pages/Members";
import EventsPage from "./pages/MyEvents";
function App() {
  const { user } = useAuth();
  const ProtectedRoute = ({ children }) => {

    if (!user) {
      return <Navigate to="/" />;
    }

    return children;
  };

  console.log("User in App.jsx:", user);
  return (
    <BrowserRouter>
      <Routes>
        {
          user ? <>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/members" element={<ProtectedRoute><MembersPage /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
          </> : <>
            <Route path="/"  element={user?<Home />:<Login />} />
          </>
        }
        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
