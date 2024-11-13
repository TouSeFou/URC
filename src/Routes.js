// Routes.js
import { Routes, Route } from 'react-router-dom';
import { Login } from './user/Login'; // Import de ton composant Login
import {SignupForm} from './user/SignUp';
function AppRoutes() {
  return (
    <Routes>
      {/* Route pour la page de connexion */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      
      
      
      
    </Routes>
  );
}

export default AppRoutes;
