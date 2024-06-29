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
  const [userinput, setUserinput] = useState(false);
  const [keyinput, setKeyinput] = useState(false);
  const [userinput2, setUserinput2] = useState(true);
  const [keyinput2, setKeyinput2] = useState(true);

  const userSignup = async () => {
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
      <button onClick={() => userSignup()}>Sign Up</button>
      <p className="gate_switch" onClick={() => setGate(0)}>
        Already have an account? Click here!
      </p>
    </div>
  );
}

export default Signup;
