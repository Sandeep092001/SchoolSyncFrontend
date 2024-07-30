"use client"
import React, { useEffect } from "react";

const Logout = ()=>{
  useEffect(()=>{
        localStorage.removeItem('jwtToken');
        window.location.href="/auth/signin";
  })
}
export default Logout;