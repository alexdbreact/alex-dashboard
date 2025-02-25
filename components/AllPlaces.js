"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";




const AllPlaces = () => {
  const [titles, setTitles] = useState("");
  const [details, setDetails] = useState("");
  const [place, setPlace] = useState("");
  const [tashera, setTashera] = useState("");
   const [image, setImage] = useState("");
   const [files, setFiles] = useState({});
     const [refer, setRefer] = useState("");
   
  
  
  
    const [isDisabled, setIsDisabled] = useState(false);
  
 
   
   const router = useRouter();
 
   
   
 
 
   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
  
    if (!titles || !place ) {
      alert("يجب ادخال العنوان  جهة واحده علي الاقل");
      return;
    }
  
    try {
      const res = await fetch("/api/alls", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ titles, details, place,tashera, image, files, refer }),
      });
  
      if (res.ok) {
        router.push("/dashboard");
        alert("تم ارسال المستند / التأشيرة بنجاح .. شكراً لسيادتكم");
      } else {
        throw new Error("Failed to create a item");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // multi images 
  
    

  const convertsToBase64 = (e) => {
    const file = e.target.files[0];
  
    if (file.size > 1 * 1024 * 1024) {
      alert(`حجم الملف ${file.name} كبير للغاية .. برجاء اختيار ملف آخر`);
      return;
    }
  
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      alert(`نوع الملف ${file.name} غير مدعوم .. برجاء اختيار صورة أو ملف PDF`);
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      setFiles({
        name: file.name,
        type: file.type,
        base64: reader.result,
      });
    };
  
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };


  // Convert file to Base64
  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (!file || file.size > 1 * 1024 * 1024) {
      alert("حجم الصورة كبير للغاية .. برج اختار صورة اخري"); // Alert the user
      return; // Exit the function
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

 
   return (
    <div className="max-w-lg mx-auto mt-0 bg-white shadow-xl rounded-lg overflow-hidden">
    <div className="text-l py-4 px-6 bg-blue-500 text-white text-center  uppercase">
    إرسال مستند / كتاب دوري / تعليمات للتعميم

    </div>
    <form
      name="new"
      id="new"
      autoComplete="on"
      className="mx-auto mt-2 max-w-xl sm:mt-10"
      onSubmit={handleSubmit}
    >
      <div  dir="rtl" className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-1 m-2">

                {/* Mobile Number */}
                <div className="sm:col-span-2">
          <label htmlFor="titles" className="block text-sm font-semibold">
عنوان الموضوع /المستند          </label>
          <input
            type="text"
            id="titles"
            name="tit"
            value={titles}
            onChange={(e) => setTitles(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        
        {/* Description Text Area */}
        <div className="sm:col-span-2">
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="ملخص / وصف الموضوع "
            rows={2}
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        {/* Select Place */}
        <div className="sm:col-span-2">
          <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          >
            <option value=""> ** جهات التعميم</option>
         
            <option value="Departments">جميع الإدارات  </option>
            <option value="Destricts"> جميع الأحياء</option>
            <option value="Directorate"> المديريات</option>
            <option value="Depart&Dests"> ادارات و احياء</option>
            <option value="Dests&Directs"> احياء و مديريات</option>
            <option value="All"> جميع الجهات</option>
            
          </select>
        </div>
           {/* Description Text Area */}
           <div className="sm:col-span-2">
          <textarea
            value={tashera}
            onChange={(e) => setTashera(e.target.value)}
            placeholder=" التأشيرة الصادرة  "
            rows={2}
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

      
          
       
         

        {/* File Upload */}
        <div className="bg-blue-100 p-2 rounded-lg text-right sm:col-span-2 ">
        <label htmlFor="image" className="block text-sm font-semibold">
تحميل المستند /التأشيرة (صورة)</label>
          <input
            type="file"
             id="image"
            name="image"
            accept="image/*"
            className="bg-transparent "
            onChange={convertToBase64}
          />
          {image && <img src={image} alt="Preview" width={200} height={200} priority="true"  />}
        </div>
{/* PDF */}

<div className="bg-blue-300 p-2 rounded-lg text-right sm:col-span-2 ">
<label htmlFor="image" className="block text-sm font-semibold">
تحميل المستند /التأشيرة (PDF)</label>
      <input
        type="file"
        multiple
        onChange={convertsToBase64}
        accept="application/pdf"
      />
      <div>
        
            { files.type === "application/pdf" ? (
              <embed
                src={files.base64}
                type="application/pdf"
                width="300px"
                height="400px"
              />
            ) : null}
            <p>{files.name}</p>
         
      </div>
    </div>





      


        {/* Mobile Number */}
        <div className="sm:col-span-2">
          <label htmlFor="refer" className="block text-sm font-semibold">
           رقم مرجعي
          </label>
          <input
            type="tel"
            id="refer"
            name="refer"
            placeholder="  الرقم+التاريخ+الوقت  "

            value={refer}
            onChange={(e) => setRefer(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 m-auto">
          <button
            type="submit"
            disabled={isDisabled}
            className="inline-block m-4 mb-8 rounded bg-blue-500 px-12 py-2 text-white focus:outline-none"
          >
              
              {isDisabled  ? 'جاري الإرسال...' : 'ارسل المستند'}

          </button>
        </div>
      </div>
    </form>
     
    </div>
     
   );
 };

export default AllPlaces
