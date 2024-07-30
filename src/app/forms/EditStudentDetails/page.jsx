"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import MultiSelect from "@/components/FormElements/MultiSelect";
import { ChangeEvent, useState } from "react";

const EditStudentDetails = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [isOptionSelected, setIsOptionSelected] = useState(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
        console.log(selectedOption);
    };

    const [formData, setFormData] = useState({
        student_fname: '',
        student_lname: '',
        guradian_fname: '',
        guradian_lname: '',
        email: '',
        standard: '',
        address: ''
    });
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
        // Fetch student data based on ID when component mounts
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:8086/getStudentDetail?s_id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch student');
                }
                const data = await response.json();
                setFormData(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        // console.log(id);
        document.getElementById("s_id").value = id;

        if (id) {
            fetchStudent();
        }
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value  // Updates the corresponding field in formData
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        var s_id = document.getElementById("s_id").value;
        console.log(s_id);
        try {
            const response = await fetch(`http://localhost:8086/updateStudentDetails/${s_id} `, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log("Edited successfully");
                setshowAlert(true);
                setTimeout(() => {
                    setshowAlert(false);
                }, 5000);
            } else {
                console.log('Failed to save data');
            }

        } catch (error) {
            console.error("Error in submitting data of student", error);
        }
    };

    const [showalert, setshowAlert] = useState(false);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Student" />

            <div className="grid grid-cols gap-6 sm:grid-cols px-20">
                <div className="flex flex-col gap-6">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Edit Student
                            </h3>
                        </div>
                        {
                            showalert && (
                                <div className="">
                                    <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-3 py-4 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
                                        <div className="mr-5 flex h-7 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                                            <svg
                                                width="16"
                                                height="12"
                                                viewBox="0 0 16 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                                                    fill="white"
                                                    stroke="white"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="w-full">
                                            <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                                                Data Edited Successfully
                                            </h5>

                                        </div>
                                    </div>
                                </div>
                            )
                        }


                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Student First name<span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your first name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="student_fname"
                                            value={formData.student_fname}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Student Last name<span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your last name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="student_lname"
                                            value={formData.student_lname}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <input name="s_id" type="hidden" id="s_id" />
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Guardian First Name<span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your first name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="guradian_fname"
                                            value={formData.guradian_fname}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Guardian Last name<span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your last name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={formData.guradian_lname}
                                            name="guradian_lname"
                                            onChange={handleChange} />
                                    </div>
                                </div>

                                {/* <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                 />
                </div> */}

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Email <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Address <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your last name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={formData.address}
                                            name="address"
                                            onChange={handleChange} />
                                    </div>
                                </div>

                                {/* Select Group  */}
                                <div>
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Select Class
                                    </label>

                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                                        fill="#637381"
                                                    ></path>
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                                        fill="#637381"
                                                    ></path>
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                                        fill="#637381"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>

                                        <select
                                            value={formData.standard}
                                            onChange={handleChange}
                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white `}
                                            name="standard"

                                        >
                                            <option value="" disabled className="text-body dark:text-bodydark">
                                                Select Class
                                            </option>
                                            <option value="Nursery" className="text-body dark:text-bodydark">
                                                Nursery
                                            </option>
                                            <option value="LKG" className="text-body dark:text-bodydark">
                                                LKG
                                            </option>
                                            <option value="UKG" className="text-body dark:text-bodydark">
                                                UKG
                                            </option>
                                            <option value="1" className="text-body dark:text-bodydark">
                                                1st
                                            </option>
                                            <option value="2" className="text-body dark:text-bodydark">
                                                2nd
                                            </option>
                                            <option value="3" className="text-body dark:text-bodydark">
                                                3rd
                                            </option>
                                            <option value="4" className="text-body dark:text-bodydark">
                                                4th
                                            </option>
                                            <option value="5" className="text-body dark:text-bodydark">
                                                5th
                                            </option>
                                            <option value="6" className="text-body dark:text-bodydark">
                                                6th
                                            </option>
                                            <option value="7" className="text-body dark:text-bodydark">
                                                7th
                                            </option>
                                            <option value="8" className="text-body dark:text-bodydark">
                                                8th
                                            </option>
                                            <option value="9" className="text-body dark:text-bodydark">
                                                9th
                                            </option>
                                            <option value="10" className="text-body dark:text-bodydark">
                                                10th
                                            </option>
                                            <option value="11" className="text-body dark:text-bodydark">
                                                11th
                                            </option>
                                            <option value="12" className="text-body dark:text-bodydark">
                                                12th
                                            </option>
                                        </select>

                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill="#637381"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                {/* <MultiSelect id="multiSelect" /> */}


                                <div className="flex justify-center items-center">
                                    <button type="submit" className="flex  w-50 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-5">
                                        Add
                                    </button>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditStudentDetails;
