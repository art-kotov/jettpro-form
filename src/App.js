import React, { useEffect, useState } from 'react';
import './App.css';
import WorkOrder from "./forms/WorkOrder";
import { address, api } from "./api";
import camelcaseKeys from "camelcase-keys";

const App = () => {
  useEffect(() => {
    const login = async () => {
      const response = await fetch(`${address}core/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          username: "nsoft",
          password: "samurai1234"
        })
      });
      const {token} = await response.json();
      localStorage.setItem('token', token);
    };

    login();
    return () => {
    };
  }, []);
  return (
    <div className="App">
      <WorkOrder />
    </div>
  );
}

export default App;
