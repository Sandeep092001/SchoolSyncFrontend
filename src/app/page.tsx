"use client"
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";
import { useEffect } from "react";

// export const metadata: Metadata = {
//   title:
//     "SchoolSync",
//   description: "Students Management",
// };

export default function Home() {
  useEffect(() => {
    var token = localStorage.getItem("jwtToken");
    console.log(token)

    const currentTime = Date.now() / 1000;
    var exp=0;
    if (token) {
      exp = JSON.parse(atob(token.split('.')[1])).exp;
    }
    if (currentTime > exp) {
      window.location.href = "/../../auth/signin";
    }
  }, [])
  return (
    <>
      <SignIn />

    </>
  );
}
