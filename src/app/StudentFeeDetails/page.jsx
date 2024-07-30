"use client"
import React, { useEffect, useState, useCallback, useRef } from "react";
import next from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const StudentFeeDeatils = () => {
    const username = localStorage.getItem('username');
    const [formData, setFormData] = useState({
        student_fname: '',
        student_lname: '',
        guradian_fname: '',
        guradian_lname: '',
        email: '',
        standard: '',
        address: ''
    });

    const [feeData, setfeeData] = useState({
        s_id: '',
        january: 'Unpaid',
        february: 'Unpaid',
        march: 'Unpaid',
        april: 'Unpaid',
        may: 'Unpaid',
        june: 'Unpaid',
        july: 'Unpaid',
        august: 'Unpaid',
        september: 'Unpaid',
        october: 'Unpaid',
        november: 'Unpaid',
        december: 'Unpaid'

    });

    const [dataFound, setDataFound] = useState(false);
    const [showPaymentButton, setshowPaymentButton] = useState(true);
    const studentDataTosubmitFees = useRef({
        s_id: '',
        username: username
    });

    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        showModal ? setShowModal(false) : setShowModal(true);
    }
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
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const roll_no = queryParams.get('roll_no');
        
        const dataStudent = {
            s_id: roll_no,
            username: username
        }

        studentDataTosubmitFees.current = dataStudent;
        // console.log(studentDataTosubmitFees.current)

        const fetchingData = async () => {
            try {
                const response = await fetch(`http://localhost:8086/getStudentDetail/${studentDataTosubmitFees.current.s_id}/${studentDataTosubmitFees.current.username}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setDataFound(true);
                        setFormData(data);
                        console.log("data fetched ", data);
                    }

                } else {
                    throw new Error("error in fetching data");
                }
            } catch (error) {
                console.log("there is some error", error);
            }

            try {
                const response = await fetch(`http://localhost:8087/getFeesDetails/${studentDataTosubmitFees.current.s_id}/${studentDataTosubmitFees.current.username}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        // setDataFound(true);
                        setfeeData(data);
                        console.log("data fetched ", data);
                    }

                } else {
                    throw new Error("error in fetching data");
                }
            } catch (error) {
                console.log("there is some error", error);
            }

        }

        if (roll_no) {
            fetchingData();
        }
    }, []);

    // const [Razorpay] = useRazorpay();

    // const handlePayment = useCallback(async () => {
    //   console.log(studentDataTosubmitFees.current)
    //   const options = {
    //     key: "rzp_test_MMms4eYt4lWxXo",
    //     amount: "3000",
    //     currency: "INR",
    //     name: "School Sync",
    //     description: "Monthly Fees Payment",
    //     image: "https://example.com/your_logo",

    //     handler: async (res) => {

    //       if (res.razorpay_payment_id) {
    //         studentDataTosubmitFees.current = {
    //           ...studentDataTosubmitFees.current,
    //           payment_status: "Paid"
    //         };
    //         console.log(studentDataTosubmitFees.current)
    //         try {
    //           const response = await fetch('http://localhost:8087/submitFeesData', {
    //             method: 'PUT',
    //             headers: {
    //               'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(studentDataTosubmitFees.current)
    //           });
    //           if(response.ok){
    //             console.log(response)
    //             window.location.reload();
    //           }
    //         } catch (error) {
    //           console.log(error)
    //         }
    //       }
    //     },
    //     prefill: {
    //       name: "Sandeep Singh",
    //       email: "sandeep28102000@gmail.com",
    //       contact: "6261884243",
    //     },
    //     notes: {
    //       address: "Razorpay Corporate Office",
    //     },
    //     theme: {
    //       color: "#3399cc",
    //     },
    //   };

    //   const rzpay = new Razorpay(options);
    //   rzpay.open();
    // }, [Razorpay]);

    // const submitFeesPayment = async () => {
    //     var payment_status = document.getElementById("transactionId").value;
    //     studentDataTosubmitFees.current = {
    //         ...studentDataTosubmitFees.current,
    //         payment_status: payment_status
    //     };
    //     console.log(studentDataTosubmitFees.current)
    //     try {
    //         const response = await fetch('http://localhost:8087/submitFeesData', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(studentDataTosubmitFees.current)
    //         });
    //         if (response.ok) {
    //             console.log(response)
    //             window.location.reload();
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <DefaultLayout>
            {
                dataFound ?
                    <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
                            <h3 className="font-medium text-black dark:text-white">Student Fee Details</h3>
                        </div>

                        <div className="p-4 sm:p-6 xl:p-9">
                            <div className="mb-10 flex flex-wrap items-center justify-end gap-3.5">
                                <button className="inline-flex items-center gap-2.5 rounded bg-meta-3 px-4 py-[7px] font-medium text-white hover:bg-opacity-90">
                                    <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.3566 4.07803V1.96865C15.3566 1.15303 14.6816 0.478027 13.866 0.478027H4.10664C3.29102 0.478027 2.61602 1.15303 2.61602 1.96865V4.07803C1.82852 4.10615 1.18164 4.75303 1.18164 5.54053V9.59053C1.18164 10.378 1.82852 11.0249 2.61602 11.053V16.0312C2.61602 16.8468 3.29102 17.5218 4.10664 17.5218H13.8941C14.7098 17.5218 15.3848 16.8468 15.3848 16.0312V11.053C16.1723 11.0249 16.8191 10.378 16.8191 9.59053V5.54053C16.791 4.75303 16.1441 4.10615 15.3566 4.07803ZM3.90977 1.96865C3.90977 1.85615 3.99414 1.74365 4.13477 1.74365H13.9223C14.0348 1.74365 14.1473 1.82803 14.1473 1.96865V4.07803H3.90977V1.96865ZM14.091 16.0312C14.091 16.1437 14.0066 16.2562 13.866 16.2562H4.10664C3.99414 16.2562 3.88164 16.1718 3.88164 16.0312V11.053H14.091V16.0312V16.0312ZM15.5254 9.59053C15.5254 9.70303 15.441 9.81553 15.3004 9.81553H2.67227C2.55977 9.81553 2.44727 9.73115 2.44727 9.59053V5.54053C2.44727 5.42803 2.53164 5.31553 2.67227 5.31553H15.3004C15.4129 5.31553 15.5254 5.3999 15.5254 5.54053V9.59053V9.59053Z" fill=""></path>
                                        <path d="M6.89102 13.2186H11.1098C11.4473 13.2186 11.7566 12.9373 11.7566 12.5717C11.7566 12.2061 11.4754 11.9248 11.1098 11.9248H6.89102C6.55352 11.9248 6.24414 12.2061 6.24414 12.5717C6.24414 12.9373 6.55352 13.2186 6.89102 13.2186Z" fill=""></path>
                                        <path d="M14.0629 6.5249H11.9535C11.616 6.5249 11.3066 6.80615 11.3066 7.17178C11.3066 7.5374 11.5879 7.81865 11.9535 7.81865H14.0629C14.4004 7.81865 14.7098 7.5374 14.7098 7.17178C14.7098 6.80615 14.4285 6.5249 14.0629 6.5249Z" fill=""></path>
                                        <path d="M6.89102 15.3562H11.1098C11.4473 15.3562 11.7566 15.075 11.7566 14.7094C11.7566 14.3437 11.4754 14.0625 11.1098 14.0625H6.89102C6.55352 14.0625 6.24414 14.3437 6.24414 14.7094C6.24414 15.075 6.55352 15.3562 6.89102 15.3562Z" fill=""></path>
                                    </svg>
                                    Print
                                </button>

                                <button className="inline-flex items-center gap-2.5 rounded bg-primary px-4 py-[7px] font-medium text-white hover:bg-opacity-90">
                                    <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.3419 4.66885L11.5204 0.843848C11.2988 0.618848 10.9942 0.506348 10.6896 0.506348H4.04344C3.10191 0.506348 2.29883 1.29385 2.29883 2.27822V8.8876C2.29883 9.2251 2.57575 9.53447 2.93575 9.53447C3.29575 9.53447 3.57267 9.25322 3.57267 8.8876V2.2501C3.57267 1.96885 3.79421 1.74385 4.07114 1.74385H10.3296V5.34385C10.3296 5.68135 10.6065 5.99072 10.9665 5.99072H14.4834V8.71885C14.4834 9.05635 14.7604 9.36572 15.1204 9.36572C15.4804 9.36572 15.7573 9.08447 15.7573 8.71885V5.5126C15.6742 5.20322 15.5634 4.89385 15.3419 4.66885ZM11.5481 2.64385L13.625 4.7251H11.5481V2.64385Z" fill=""></path>
                                        <path d="M15.0653 14.5688C14.733 14.5688 14.4284 14.8501 14.4284 15.2157V15.7782C14.4284 16.0595 14.2069 16.2845 13.9299 16.2845H4.04379C3.76687 16.2845 3.54533 16.0595 3.54533 15.7782V15.3845C3.54533 15.047 3.26841 14.7376 2.90841 14.7376C2.54841 14.7376 2.27148 15.0188 2.27148 15.3845V15.7501C2.27148 16.7063 3.04687 17.522 4.0161 17.522H13.9023C14.8438 17.522 15.6469 16.7345 15.6469 15.7501V15.1876C15.6746 14.8501 15.3976 14.5688 15.0653 14.5688Z" fill=""></path>
                                        <path d="M12.6014 10.6875H14.1245C14.4568 10.6875 14.7614 10.4063 14.7614 10.0407C14.7614 9.67505 14.4845 9.3938 14.1245 9.3938H12.6014C11.8537 9.3938 11.2168 10.0407 11.2168 10.8V14.2032C11.2168 14.5407 11.4937 14.85 11.8537 14.85C12.2137 14.85 12.4906 14.5688 12.4906 14.2032V12.4313H13.543C13.8753 12.4313 14.1799 12.15 14.1799 11.7844C14.1799 11.4188 13.903 11.1375 13.543 11.1375H12.463V10.7719C12.463 10.7719 12.5183 10.6875 12.6014 10.6875Z" fill=""></path>
                                        <path d="M8.8346 14.8782C9.80383 14.8782 10.6069 14.0626 10.6069 13.0501V11.1938C10.6069 10.1813 9.80383 9.36572 8.8346 9.36572H7.56075C7.22844 9.36572 6.92383 9.64697 6.92383 10.0126V14.2595C6.92383 14.597 7.20075 14.9063 7.56075 14.9063H8.8346V14.8782ZM8.16998 10.6313H8.8069C9.08383 10.6313 9.33306 10.8845 9.33306 11.1938V13.0501C9.33306 13.3595 9.08383 13.6126 8.8069 13.6126H8.16998V10.6313Z" fill=""></path>
                                        <path d="M3.87716 14.8782C4.20947 14.8782 4.51408 14.5969 4.51408 14.2313V12.5438H5.871C6.20331 12.5438 6.50793 12.2625 6.50793 11.8969V10.0407C6.50793 9.70317 6.231 9.3938 5.871 9.3938H3.87716C3.54485 9.3938 3.24023 9.67505 3.24023 10.0407V14.2313C3.26793 14.5969 3.54485 14.8782 3.87716 14.8782ZM4.51408 10.6875H5.23408V11.2782H4.51408V10.6875Z" fill=""></path>
                                    </svg>
                                    Save As PDF
                                </button>
                            </div>

                            <div className="flex flex-wrap justify-between gap-5">
                                <div>
                                    <p className="mb-1.5 font-medium text-black dark:text-white">
                                        Student Detail:
                                    </p>
                                    <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                                        {formData.student_fname} {formData.student_lname}
                                    </h4>
                                    <span className="mt-1.5 block"><span className="font-medium text-black dark:text-white">Guardian name: </span>
                                        {formData.guradian_fname} {formData.guradian_lname}</span>
                                    <a href="#" className="block"><span className="font-medium text-black dark:text-white">Email: </span>
                                        {formData.email}</a>
                                    <span className="mt-1.5 block"><span className="font-medium text-black dark:text-white">Address: </span>
                                        {formData.address}</span>
                                </div>
                                {/* 
                <div>
                  <p className="mb-1.5 font-medium text-black dark:text-white">
                    Billing To:
                  </p>
                  <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                    Devid wilium
                  </h4>
                  <a href="#" className="block"><span className="font-medium text-black dark:text-white">Email:</span>
                    contact@example.com</a>
                  <span className="mt-1.5 block"><span className="font-medium text-black dark:text-white">Address:</span>
                    New York, USA 2707 Davis Anenue</span>
                </div> */}
                            </div>

                            <div className="my-7.5 grid grid-cols-1 border border-stroke dark:border-strokedark xsm:grid-cols-2 sm:grid-cols-4">
                                <div className="border-b border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark sm:border-b-0">
                                    <h5 className="mb-1.5 font-bold text-black dark:text-white">
                                        Student ID :
                                    </h5>
                                    <span className="text-sm font-medium"> {studentDataTosubmitFees.current.s_id} </span>
                                </div>

                                <div className="border-b border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark sm:border-b-0 sm:border-r">
                                    <h5 className="mb-1.5 font-bold text-black dark:text-white">
                                        Payment Status:
                                    </h5>
                                    <span className="text-sm font-medium"> {studentDataTosubmitFees.current.payment_status}</span>
                                </div>

                                <div className="border-b border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark xsm:border-b-0">
                                    <h5 className="mb-1.5 font-bold text-black dark:text-white">
                                        Year:
                                    </h5>
                                    <span className="text-sm font-medium"> {studentDataTosubmitFees.current.month} 2024</span>
                                </div>

                                <div className="border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark">
                                    <h5 className="mb-1.5 font-bold text-black dark:text-white">
                                        Amount:
                                    </h5>
                                    <span className="text-sm font-medium"> $2,578.90 </span>
                                </div>
                            </div>

                            <div className="border border-stroke dark:border-strokedark">
                                <h4 className="px-4 pt-4 mb-3 text-xl font-bold text-black dark:text-white">
                                    Fees Details
                                </h4>
                                <div className="max-w-full overflow-x-auto">
                                    <div className="min-w-[670px]">
                                        {/* <!-- table header start --> */}
                                        <div className="grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6 dark:border-strokedark">

                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Jan
                                                </h5>
                                            </div>

                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Feb
                                                </h5>
                                            </div>

                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Mar
                                                </h5>
                                            </div>

                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Apr
                                                </h5>
                                            </div>

                                            <div className="col-span-1">
                                                <h5 className=" font-medium text-black dark:text-white">
                                                    May
                                                </h5>
                                            </div>
                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Jun
                                                </h5>
                                            </div>
                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Jul
                                                </h5>
                                            </div>
                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Aug
                                                </h5>
                                            </div>
                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Sep
                                                </h5>
                                            </div>
                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Oct
                                                </h5>
                                            </div>
                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Nov
                                                </h5>
                                            </div>
                                            <div className="col-span-1">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    Dec
                                                </h5>
                                            </div>
                                        </div>
                                        {/* <!-- table header end -->

                      <!-- product item --> */}
                                        <div className="grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6 dark:border-strokedark">

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.january}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.february}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.march}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.april}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.may}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.june}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.july}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.august}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.september}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.october}</p>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.november}</p>
                                            </div>
                                            <div className="col-span-1">
                                                <p className="font-medium">{feeData.december}</p>
                                            </div>
                                        </div>

                                        {/* <!-- product item --> */}


                                        {/* <!-- product item --> */}


                                        {/* <!-- product item --> */}


                                        {/* <!-- product item --> */}

                                    </div>
                                </div>

                                {/* <!-- total price start --> */}

                                {/* <!-- total price end --> */}
                            </div>
                        </div>
                    </div> : <div>
                        <p>Data not found</p>
                    </div>

            }
        </DefaultLayout>
    )
}

export default StudentFeeDeatils;