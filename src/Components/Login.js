import React, { useEffect, useState } from "react";
import axios from "axios";

function Login({
  setGate,
  username,
  setUsername,
  password,
  setPassword,
  setIslogged,
  setTableName,
}) {
  const [exists, setExists] = useState(null);
  const [userinput, setUserinput] = useState(true);
  const [keyinput, setKeyinput] = useState(true);
  const [toggle, setToggle] = useState(false);
  const userLogin = async () => {
    if (username.length <= 2) {
      setUserinput(false);
    }
    if (password.length <= 7) {
      setKeyinput(false);
    }

    if (userinput && keyinput) {
      const newTableName = `${username}${password}`;
      setTableName(newTableName);
      const response = await axios.get(
        `http://localhost:4000/check-table?tbname=${encodeURIComponent(
          newTableName
        )}`
      );
      setToggle(!toggle);

      setExists(response.data.exists);
      if (exists) {
        setIslogged(true);
      } else window.alert("Invalid username or password");
    } else window.alert("Username or password to short");
  };

  const handleUsernameChange = (e) => {
    const valueWithoutSpaces = e.replace(/\s/g, "");
    setUsername(valueWithoutSpaces);
  };

  const handlePasswordChange = (e) => {
    const valueWithoutSpaces = e.replace(/\s/g, "");
    setPassword(valueWithoutSpaces);
  };

  return (
    <div className="gate_box">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => handleUsernameChange(e.target.value)}
        style={{
          borderColor:
            username.length >= 1 && username.length <= 2 ? "red" : null,
        }}
      />
      <p className="msg">{!userinput ? "Username cannot be empty" : null}</p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        style={{
          borderColor:
            password.length >= 1 && password.length <= 7 ? "red" : null,
        }}
      />
      <p className="msg">{!keyinput ? "Password cannot be empty" : null}</p>
      <button onClick={() => userLogin()}>Login</button>
      <p className="gate_switch" onClick={() => setGate(1)}>
        New user? click here!
      </p>
    </div>
  );
}

export default Login;
