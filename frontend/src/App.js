import { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import "./App.css";
//import Transfers from './pages/Transfers';

const App = () => {
  const [username, setUsername] = useState("");
  const [idUser, setIdUser] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if(token){
      setToken(token);
    }
  })

  const handleLogin = (id, username, token) => {
    setToken(token);
    localStorage.setItem('auth-token', token);
    setUsername(username);
    setIdUser(id)
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
          <Header id_user={idUser} username={username} onLogout={handleLogout} />
        </>
      )}
    </div>
  );
};

export default App;
