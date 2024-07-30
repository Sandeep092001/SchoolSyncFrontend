"use client"
import Image from "next/image";
import { Student } from "@/types/student";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SetStateAction, useEffect, useState } from "react";


// const productData: Product[] = [
//     {
//         image: "/images/product/product-01.png",
//         student_name: "Apple Watch Series 7",
//         address: "Electronics",
//         class: 296,
//         roll_no: 22,
//         email: "sandeep@gmail.com",
//     },
//     {
//         image: "/images/product/product-02.png",
//         student_name: "Apple Watch Series 7",
//         address: "Electronics",
//         class: 296,
//         roll_no: 22,
//         email: "sandeep@gmail.com",
//     },
//     {
//         image: "/images/product/product-03.png",
//         student_name: "Apple Watch Series 7",
//         address: "Electronics",
//         class: 296,
//         roll_no: 22,
//         email: "sandeep@gmail.com",
//     },
//     {
//         image: "/images/product/product-04.png",
//         student_name: "Apple Watch Series 7",
//         address: "Electronics",
//         class: 296,
//         roll_no: 22,
//         email: "sandeep@gmail.com",
//     },
// ];


const ListAllStudents = () => {
    const schoolUsername = localStorage.getItem("username");

    console.log(schoolUsername)
    const [students, setStudents] = useState<Student[]>([]);
    const [showDropdown, setShowDropDown] = useState(false);

    const handleDropdown = () => {
        showDropdown ? setShowDropDown(false) : setShowDropDown(true);
    }
    const [searchText, setSearchText] = useState("All Categories")
    const [searchVal, setSearchVal] = useState('');
    const changeText = (text: SetStateAction<string>) =>{
       setSearchText(text);
    }
    
    const handleSubmit = async() =>{
     
        console.log(searchVal)
        if(searchText=="Roll no") {
            try {
                const response = await fetch(`http://localhost:8086/searchByRollNo/${schoolUsername}/${searchVal}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }else if(searchText == "Class"){
            try {
                const response = await fetch(`http://localhost:8086/searchByClass/${schoolUsername}/${searchVal}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }else if(searchText == "Name"){
            try {
                const response = await fetch(`http://localhost:8086/searchByName/${schoolUsername}/${searchVal}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
  
    useEffect(() => {
        var token = localStorage.getItem("jwtToken");
        console.log(token)

        const currentTime = Date.now() / 1000;
        var exp = 0;
        if (token) {
            exp = JSON.parse(atob(token.split('.')[1])).exp;
        }
        if (currentTime > exp) {
            window.location.href = "/../../auth/signin";
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8086/listAll/${schoolUsername}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <DefaultLayout>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <div className="max-w-lg mx-auto mt-4">
                    <div className="flex">
                        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                        <button onClick={handleDropdown} id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{searchText}<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg></button>

                        <div className="relative w-full">
                            <input type="text" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} id="search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search..." required />
                            <button onClick={handleSubmit} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                    {showDropdown && <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <>
                                <li>
                                    <button onClick={() => changeText('Roll no')} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Roll no</button>
                                </li>
                                <li>
                                    <button onClick={() => changeText('Class')} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Class</button>
                                </li>
                                <li>
                                    <button onClick={() => changeText('Name')} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Name</button>
                                </li>
                                {/* <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                </li> */}
                            </>
                        </ul>

                    </div>
                    }
                </div>

                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        All Students
                    </h4>
                </div>

                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium">Student Name</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="font-medium">Address</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Class</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Roll No</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Actions</p>
                    </div>
                </div>

                {students.map((student, key) => (
                    <div
                        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                        key={key}
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                {/* <div className="h-12.5 w-15 rounded-md">
                                    <Image
                                        src={student.image}
                                        width={60}
                                        height={50}
                                        alt="Product"
                                    />
                                </div> */}
                                <p onClick={async () => {
                                    console.log(student.s_id);
                                    window.location.href = `/../../StudentFeeDetails?roll_no=${student.s_id}`;

                                }} className="text-sm text-black dark:text-white">
                                    {student.student_fname} {student.student_lname}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">
                                {student.address}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">
                                {student.standard}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">{student.s_id}</p>
                        </div>
                        {/* <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.email}</p>
          </div> */}
                        {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"> */}
                        <div className="flex items-center col-span-1 space-x-3.5">
                            <a href={`/forms/EditStudentDetails?id=${student.s_id}`} style={{ textDecoration: 'none' }} > <button className="hover:text-primary">
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.719 3.5L14.5 1.281C14.16 0.941333 13.6667 0.773333 13.2 0.8L10 1.5L1.5 10L2.2 13.2C2.22667 13.6667 2.39467 14.16 2.734 14.5L4.953 16.719C5.312 17.078 5.812 17.2667 6.312 17.2667C6.77333 17.2667 7.23467 17.078 7.59367 16.719L16.719 7.59367C17.078 7.23467 17.2667 6.77333 17.2667 6.312C17.2667 5.812 17.078 5.312 16.719 4.953L16.719 3.5ZM4.312 14.188L3.022 13.878L3.322 12.578L12.578 3.322L13.878 4.622L13.566 5.916L4.312 14.188ZM15.156 5.344L13.656 6.844L11.156 4.344L12.656 2.844C12.9453 2.55467 13.388 2.55467 13.6773 2.844L15.156 4.344C15.4453 4.63333 15.4453 5.076 15.156 5.344Z"
                                        fill=""
                                    />
                                </svg>
                            </button></a>

                            <button className="hover:text-primary" onClick={async () => {
                                console.log(student.s_id);
                                try {
                                    const response = await fetch(`http://localhost:8086/deleteStudentDetails/${student.s_id}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    });
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok');
                                    } else {
                                        console.log("Data Deleted");
                                        window.location.reload;
                                    }

                                } catch (error) {
                                    console.log('Error in deleting the data', error);
                                }
                            }}>
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                        fill=""
                                    />
                                    <path
                                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                        fill=""
                                    />
                                    <path
                                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                        fill=""
                                    />
                                    <path
                                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                        fill=""
                                    />
                                </svg>
                            </button>

                        </div>

                    </div>
                ))}
            </div>
        </DefaultLayout>
    );
};

export default ListAllStudents;
