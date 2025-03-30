import { useState } from 'react';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import "./App.css";
//import Transfers from './pages/Transfers';

const App = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);

  const handleLogin = (token, username) => {
    setToken(token);
    localStorage.setItem('auth-token', token);
    setUsername(username)
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('auth-token');
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header username={username} onLogout={handleLogout} />
        </>
      )}
    </div>
  );
};

export default App;
