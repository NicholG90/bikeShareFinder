import './App.css';
import Navigation from './components/Navigation';
import { AuthProvider } from './components/Auth';


function App() {

  return (
    <AuthProvider>
      <div>
        <Navigation />
      </div>
    </AuthProvider>
  );
}

export default App;
