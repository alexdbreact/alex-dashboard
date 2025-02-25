"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";


export default function DataTables() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [dayFilter, setDayFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getmains = async () => {
      try {
        const res = await fetch("/api/mains", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const fetchedData = await res.json();
        console.log("Fetched Data:", fetchedData);

        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else if (fetchedData.mains && Array.isArray(fetchedData.mains)) {
          setData(fetchedData.mains);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    getmains();
  }, []);

  const filteredData = data.filter((main) => {
    const mainDate = dayjs(main.createdAt);
    return (
      main.start.toLowerCase().includes(search.toLowerCase()) &&
      (dayFilter === "" || mainDate.date() === parseInt(dayFilter)) &&
      (monthFilter === "" || mainDate.month() + 1 === parseInt(monthFilter))
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div
      className="min-h-screen p-6 bg-gray-100 flex flex-col items-center w-full"
    >
      <h1 className="text-xl font-bold mb-4">Coming Responses </h1>

      <div className="mb-4 flex flex-col space-x-4 overflow-hidden md:flex-row ">
      <select
          value={search}
          placeholder="Search by Department"
          onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded ml-4"
            >
            <option value="">Search By Department</option>

            <option value="HR">الإدارة العامة للموارد البشرية</option>
            <option value="Legal">الإدارة العامة للشئون القانونية </option>
            <option value="Finance">الإدارة العامة للشئون المالية</option>
            <option value="Admin">الإدارة العامة للشئون الإدارية</option>
            <option value="PR">الإدارة العامة للعلاقات العامة</option>
            <option value="Govern">الإدارة العامة للحوكمة </option>
            <option value="Auth">مركز السيطرة</option>
            <option value="Info">مركز المعلومات</option>
            <option value="Smart">المركز الذكى</option>
          </select>
      
        <input
          type="number"
          placeholder="Search By Day No. "
          className="border p-2 rounded w-50"
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Search By Month No. "
          className="border p-2 rounded w-50"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />
      </div>

      <div className="w-full  bg-white shadow-md rounded-lg overflow-hidden ">
        <table className="w-full   border-separate border border-gray-400">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="p-0 w-20 text-center text-blue-900">#</th>
              <th className="p-1 w-36 text-center text-blue-900">Title</th>
              <th className="p-1 w-36 text-center text-blue-900">Departments</th>
              <th className="p-1 w-36 text-center text-teal-900">Instractions</th>
              <th className="p-1 text-center text-blue-900"> Responses</th>
              <th className="p-1 w-16 text-center text-blue-900"> Status</th>
              <th className="p-1 text-center text-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {paginatedData.map((main) => (
              <tr
                key={main.id || main._id}
                className="border-t divide-y divide-gray-300 text-sm w-8"
              >
                <td className=" bg-slate-200 text-xs text-center ">
                  {paginatedData.indexOf(main) + 1}
                  <div className=" text-blue-800">
                    {main.createdAt.slice(0, 10)}
                  </div>
                </td>
                <td className=" bg-blue-200 text-center p-4 flex flex-col justify-center items-center ">
                  {main.tit}
                  <button
                    className=" w-32 bg-blue-500 p-1 text-slate-50 rounded-md text-center	mt-2"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    ملخص الموضوع
                  </button>
                  <dialog
                    id="my_modal_1"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">ملخص الموضوع</h3>

                      <div className="modal-action  min-w-500">
                        <form method="dialog">
                          {main.summ}
                          <button className="w-16 bg-blue-500 p-1 text-slate-50 rounded-md text-center">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                    <button
                    className="w-32 bg-sky-900 p-1 text-slate-50 rounded-md text-center mt-2"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }> Documents  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-full">
                      <h3 className="font-bold text-lg">المستند </h3>
                      {main.files && main.files.base64 ? (
                        main.files.type === "application/pdf" ? (
                          <>
                            <embed
                              src={main.files.base64}
                              type="application/pdf"
                              width="450px"
                              height="600px"
                            />
                          </>
                        ) : (
                          <img
                            src={main.files.base64}
                            alt={main.files.name}
                            className=" object-cover rounded"
                          />
                        )
                      ) : (
                        "No file"
                      )}
                      {main.image ? (
                        <img
                          src={main.image}
                          alt={main.sort}
                          className="w-16 h-16 object-cover rounded hover:scale-150"
                        />
                      ) : (
                        "----"
                      )}{" "}
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn-primary flex items-center gap-2 justify-center">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>

        

                <td className="p-3 bg-teal-100 text-teal-900 font-bold min-w-full rounded-lg  text-center  ">
                  {main.start}
                  {main.start2}
                  {main.start3}
                </td>
                <td className="p-3 bg-teal-600 text-teal-100 font-bold min-w-full rounded-lg text-center  ">
                  {main.tash}
                  {main.tash2}
                  {main.tash3}
                </td>

             
                <td className="p-1   ">
                  {/*
                   <Link href={`/dashboard/editMains/${main._id}`}>
                                <button className="btn btn-primary">إضافة رد و مستند</button>
                            </Link>
                  
                  */}
                 
                         <div>
                             {main.comment}
                         </div>
                         <div>
                         {main.imagex && <img className="max-w-32 max-h-32" src={main.imagex} alt="Preview"  width="auto" height="auto" priority="true"  />}
                         </div>

                             
                  
                
                  </td>


                {/*
                  <td className="p-3">
                {main.filesx && main.filesx.base64 ? (
    main.filesx.type === "application/pdf" ? (
      <embed
        src={main.filesx.base64}
        type="application/pdf"
        width="300px"
        height="400px"
      />
    ) : (
      <img src={main.filesx.base64} alt={main.filesx.name} className="w-16 h-16 object-cover rounded" />
    )
  ) : (
    "No file"
  )}



                </td>
                
                */}
              
                <td className="p-3">
{(main.imagex || main.comment) ? <div className=" w-16 bg-teal-500 p-1 text-slate-50 rounded-md text-center">تم الــرد</div>:<div className=" w-16 bg-pink-600 p-1 text-slate-50 rounded-md text-center">جاري الرد</div>}

                </td>
                <td className="p-0 text-center">

            
                          
                                <button className="btn btn-primary btn-sm">Print</button>
                         
                            <RemoveBtn id={main._id} />
                           
                                <button className="btn btn-success btn-sm ml-2">Save</button>
                       
                       
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-6 py-1 bg-blue-500 text-white rounded"
        >
          السابق
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-6 py-1 bg-blue-500 text-white rounded"
        >
          التالي
        </button>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={15}>15 rows</option>
        </select>
      </div>
    </div>
  );
}
