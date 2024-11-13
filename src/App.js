import './App.css';
import { BrowserRouter as Router, Route, Link , Routes} from 'react-router-dom';
import AppRoutes from './Routes';
function App() {

  return (
    <Router>
      <AppRoutes /> 
    </Router>
    
  );
}

export default App;
