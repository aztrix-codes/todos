import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainPage from "./Components/MainPage";

function App() {
  const [islogged, setIslogged] = useState(false);
  const [gate, setGate] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tableName, setTableName] = useState("");

  return (
    <div className="App">
      {!islogged ? (
        gate === 0 ? (
          <Login
            setGate={setGate}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setIslogged={setIslogged}
            setTableName={setTableName}
          />
        ) : (
          <Signup
            setGate={setGate}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setTableName={setTableName}
          />
        )
      ) : (
        <MainPage tableName={tableName} />
      )}
    </div>
  );
}

export default App;
