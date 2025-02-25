"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";


export default function DataTables() {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [dayFilter, setDayFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getalls = async () => {
      try {
        const res = await fetch("/api/alls", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const fetchedData = await res.json();

        // Ensure fetchedData is an array
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else if (fetchedData.alls && Array.isArray(fetchedData.alls)) {
          setData(fetchedData.alls); // If data is inside an "alls" key
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Fallback to an empty array to avoid filter issues
      }
    };

    getalls();
  }, []);

 
  // Filter Data
  const filteredData = data.filter((all) => {
    const allDate = dayjs(all.createdAt);
    return (
      all.place &&
      (dayFilter === "" || allDate.date() === parseInt(dayFilter)) &&
      (monthFilter === "" || allDate.month() + 1 === parseInt(monthFilter))
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

 
  return (
    <div
      className="min-h-screen p-6 bg-gray-100 flex flex-col items-center w-full"
    >

      {/* Search & Filters */}
      <div className="mb-4 flex space-x-4 ">
        <input
          type="number"
          placeholder="بحث باليوم"
          className="border p-2 rounded w-50"
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="بحث بالشهر"
          className="border p-2 rounded w-50"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <div className="w-full  bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-center  table-auto border-separate border border-gray-400">
          <thead className="bg-gray-200 w-full">
            <tr>
              <th className="p-1">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Decision/Instractions</th>
              <th className="p-3">Documents</th>
        
          
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {paginatedData.map((all) => (
              <tr
                key={all.id || all._id}
                className="border-t divide-y divide-gray-300 "
              >
                <td className="p-1 bg-slate-200">
                  {paginatedData.indexOf(all) + 1}  <div className=" text-blue-800">
                    {all.createdAt.slice(0, 10)}
                  </div>
                </td>
                <td className="p-3 flex flex-col bg-blue-200 rounded-e-md text-center ">
                  {all.titles}
                  <button
                    className="btn-primary flex items-center gap-2 justify-center"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    {" "}
                    Details
                  </button>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">ملخص الموضوع</h3>

                      <div className="modal-action  min-w-500">
                        <form method="dialog">
                          {all.details}
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn bg-teal-500 bg-red-500! flex items-center gap-2 justify-center">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
                <td className="p-3 bg-teal-100 text-teal-900 font-bold min-w-full rounded-lg text-center ">{all.tashera}</td>

                <td className="p-3">
                  <button
                    className="btn btn-md flex items-center gap-2 justify-center"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    {" "}
                    Document or Image 
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-full">
                      <h3 className="font-bold text-lg">المستند </h3>
                      {all.files && all.files.base64 ? (
                        all.files.type === "application/pdf" ? (
                          <>
                            <embed
                              src={all.files.base64}
                              type="application/pdf"
                              width="600px"
                              height="800px"
                            />

                            {/* 
      
       <button
            onClick={() => handleStamp(file, all._id, index)}
            className="px-2 py-1 bg-green-500 text-white rounded mt-2"
          >
            Stamp as Approved
          </button>
      */}
                          </>
                        ) : (
                          <img
                            src={all.files.base64}
                            alt={all.files.name}
                            className=" object-cover rounded"
                          />
                        )
                      ) : (
                        "No file"
                      )}
                      {all.image ? (
                        <img
                          src={all.image}
                          alt={all.sort}
                          className="w-16 h-16 object-cover rounded hover:scale-150"
                        />
                      ) : (
                        "----"
                      )}{" "}
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-md flex items-center gap-2 justify-center">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>

     

              
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
