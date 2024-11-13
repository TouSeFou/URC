import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import './SignUpCss.css'; // Si tu veux toujours avoir des styles supplémentaires personnalisés
import { signUpUser } from "./signUpApi";
import { CustomError } from "../model/CustomError";
import { useNavigate } from 'react-router-dom';

// Définir l'interface pour les données du formulaire
interface SignupData {
  login: string;
  email: string;
  password: string;
}

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState<SignupData>({ login: '', email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [error2, setError2] = useState({} as CustomError);
  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    e.preventDefault();
    // Vérifier si tous les champs sont remplis
    if (!formData.login || !formData.email || !formData.password) {
      setError('Tous les champs sont obligatoires!');
      return;
    }
    // Si tout est ok, vous pouvez envoyer les données via une API ou autre
    signUpUser(
      {
        user_id: -1,
        email: data.get("email") as string,
        username: data.get("login") as string,
        password: data.get("password") as string,
      },
      (loginError: CustomError) => {
        console.log(loginError);
        setError2(loginError);
        
      },
      navigate
    );
    console.log('Données du formulaire soumises:', formData);
    setError('');
    // Réinitialiser le formulaire après soumission
    setFormData({ login: '', email: '', password: '' });
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 3, 
          border: '1px solid #ddd', 
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          Inscription
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Login"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            required
          />
          <TextField
            label="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            required
          />

          {/* Afficher les erreurs si nécessaires */}
          {error && (
            <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ marginTop: 3 }}
          >
              S&apos;inscrire
          </Button>
        </form>
      </Box>
    </Container>
  );
};
