import './App.css';
import Navigation from './Navigation';
import { AuthProvider } from './Auth';


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
