// Routes.js
import { Routes, Route } from 'react-router-dom';
import { Login } from './user/Login'; // Import de ton composant Login
import {SignupForm} from './user/SignUp';
import ChatApp from './messages/ChatApp';
function AppRoutes() {
  return (
    <Routes>
      {/* Route pour la page de connexion */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/chatApp" element={<ChatApp />} />
      {/* <Route path="/messages/user/:user_id" element={<ChatApp />}/> */}
      <Route path="/messages/user/:userId" element={<ChatApp />} />

      
      
    </Routes>
  );
}

export default AppRoutes;
