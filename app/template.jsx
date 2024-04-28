"use client";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Template({ children }) {
  const [token, setToken] = useState({ token: null });
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) {
      setToken({ token: tok });
    }
    if (tok == "null") {
      setToken({ token: null });
    }
  }, []);
  return (
    <div>
      <Header token={token} setToken={setToken} />
      {children}
    </div>
  );
}
