import React, { useState } from "react";
import axios from "axios";

function Signup({
  setGate,
  username,
  setUsername,
  password,
  setPassword,
  setTableName,
}) {
  const [exists, setExists] = useState(null);
  const [userinput, setUserinput] = useState(true);
  const [keyinput, setKeyinput] = useState(true);

  const userSignup = async () => {
    if (username.length <= 2) {
      setUserinput(false);
    }
    if (password.length <= 7) {
      setKeyinput(false);
    }

    if (userinput && keyinput) {
      const newTableName = `${username}${password}`;
      setTableName(newTableName);
      try {
        const ans = await axios.get(
          `http://localhost:4000/check-table?tbname=${encodeURIComponent(
            newTableName
          )}`
        );
        setExists(ans.data.exists);
        if (!exists) {
          const response = await axios.post(
            `http://localhost:4000/create-table?tbname=${encodeURIComponent(
              newTableName
            )}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            alert(response.data.message);
          } else {
            alert("User already exist");
          }
        }

        setGate(0);
      } catch (error) {
        alert("User already exists.");
      }
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
      <h1>Sign Up</h1>
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
      <button onClick={() => userSignup()}>Sign Up</button>
      <p className="gate_switch" onClick={() => setGate(0)}>
        Already have an account? Click here!
      </p>
    </div>
  );
}

export default Signup;
