import { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import Header from './components/Header';
import "./App.css";
import Transfers from './pages/Transfers/Transfers';

const App = () => {
  const [username, setUsername] = useState("");
  const [idUser, setIdUser] = useState("");
  const [token, setToken] = useState(null);
  const [isSuperUser, setIsSuperUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const id_user = localStorage.getItem('id-user');
    const name = localStorage.getItem('username');
    const is_superuser = localStorage.getItem('is-superuser') === 'true';

    if(token){
      setToken(token);
    }
    if(id_user){
      setIdUser(id_user);
    }
    if(name){
      setUsername(name);
    }
    if(is_superuser !== null && is_superuser !== undefined){
      setIsSuperUser(is_superuser);
    }
  }, [])

  const handleLogin = (id, username, is_superuser, token) => {
    setToken(token);
    localStorage.setItem('auth-token', token);
    setUsername(username);
    setIdUser(id);
    setIsSuperUser(is_superuser);
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
          <Header id_user={idUser} username={username} is_superuser={isSuperUser} onLogout={handleLogout} />
          <Transfers is_superuser={isSuperUser} id_user={idUser} />
        </>
      )}
    </div>
  );
};

export default App;
