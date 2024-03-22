import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+={}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="border-secondary bg-secondary p-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className="btn btn-info" type="button" id="button-addon2" onClick={copyPasswordToClipboard}>
            copy
          </button>
        </div>

        <br />

        <div className="container text-center">
          <div className="row">
            <div className="col-4">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => setlength(e.target.value)}
                className="mx-2"
              />
              <label>Length ({length})</label>
            </div>
            <div className="col-4">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className="mx-2"
              />
              <label className="">Number</label>
            </div>
            <div className="col-4">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                className="mx-2"
              />
              <label className="">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
