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
  const [userinput, setUserinput] = useState(false);
  const [keyinput, setKeyinput] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userinput2, setUserinput2] = useState(true);
  const [keyinput2, setKeyinput2] = useState(true);
  const userLogin = async () => {
    if (username.trim() === "") {
      setUserinput(true);
    }
    if (password.trim() === "") {
      setKeyinput(true);
    }

    if (username.length < 3 && username.length > 0) {
      setUserinput2(false);
    }
    if (password.length < 9 && password.length > 0) {
      setKeyinput2(false);
    }

    if (userinput && keyinput && userinput2 && keyinput2) {
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
            username.length < 3 && username.length > 0 ? "red" : null,
        }}
      />
      <p className="msg">{userinput ? "Username cannot be empty" : null}</p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        style={{
          borderColor:
            password.length < 9 && password.length > 0 ? "red" : null,
        }}
      />
      <p className="msg">{keyinput ? "Password cannot be empty" : null}</p>
      <button onClick={() => userLogin()}>Login</button>
      <p className="gate_switch" onClick={() => setGate(1)}>
        New user? click here!
      </p>
    </div>
  );
}

export default Login;
