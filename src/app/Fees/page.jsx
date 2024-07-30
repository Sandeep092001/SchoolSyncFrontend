"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
// import TableTwo from "@/components/Tables/TableTwo";

// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FeesForm from "./Feesform";
import { useEffect } from "react";


const Fees = () => {
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
    <DefaultLayout>
      <Breadcrumb pageName="Deposit Fees" />

      <div className="flex flex-col gap-10">
        <FeesForm />
      </div>
    </DefaultLayout>
  );
};

export default Fees;
