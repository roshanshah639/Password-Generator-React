import React, { useState, useCallback, useEffect, useRef } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
   
  };

  return (
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-6 mb-12  bg-zinc-800">
      <h1 className="text-3xl mb-4 text-center text-cyan-400">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          className="w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none"
          type="text"
          value={password}
          readOnly
          placeholder="Your Password"
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2  focus:outline-none focus:shadow-outline text-center"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer "
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            name=""
            id="Length"
          />
          <label className="cursor-pointer text-white" htmlFor="Length">
            Length {length}
          </label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer "
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            type="checkbox"
            name=""
            id="number"
          />
          <label className="cursor-pointer text-white" htmlFor="number">
            Numbers
          </label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer "
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            type="checkbox"
            name=""
            id="charInput"
          />
          <label className="cursor-pointer text-white" htmlFor="charInput">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
