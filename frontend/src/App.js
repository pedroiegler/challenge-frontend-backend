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
    const id_user = localStorage.getItem('id-user');
    const name = localStorage.getItem('username');

    if(token){
      setToken(token);
    }
    if(id_user){
      setIdUser(id_user);
    }
    if(name){
      setUsername(name);
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
