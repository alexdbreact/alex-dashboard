//components\EditMainsForm.jsx
"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function EditProductForm({ id, comment, imagex, filesx }) {
  
    const [newComment, setNewComment] = useState(comment);
    const [newImagex, setNewImagex] = useState(imagex);
   // const [newFilesx, setNewFilesx] = useState(filesx);
 
    const router = useRouter();

    {/*
         const convertsToBase64 = (e) => {
        const {filesx} = e.target.newFilesx[0];
      
        if (filesx.size > 1 * 1024 * 1024) {
          alert(`حجم الملف ${newFilesx.name} كبير للغاية .. برجاء اختيار ملف آخر`);
          return;
        }
      
        if (!filesx.type.startsWith("image/") && file.type !== "application/pdf") {
          alert(`نوع الملف ${newFilesx.name} غير مدعوم .. برجاء اختيار صورة أو ملف PDF`);
          return;
        }
      
        const reader = new FileReader();
        reader.readAsDataURL(file);
      
        reader.onload = () => {
            setNewFilesx({
            name: newFilesx.name,
            type: newFilesx.type,
            base64: reader.result,
          });
        };
      
        reader.onerror = (error) => {
          console.error("Error reading filex:", error);
        };
      };
        */}
   
    
    
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
          setNewImagex(reader.result);
        };
    
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        };
      };
    
      
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const res = await fetch(`/api/mains/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newComment, newImagex }),
            });
 
            if (!res.ok) {
                throw new Error("Failed to update Mains");
            }
 
            router.refresh();
            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };
 
    return (
        <>
        <div className="flex justify-between items-center">
            <h1 className="font-bold py-10 text-2xl">اضافه رد و مستند</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
                placeholder="اكتب الرد هنا...."
                className="input input-bordered input-accent w-full max-w-xs p-2"
                type="text"
            />


 

<input
            type="file"
             id="image"
            name="image"
            accept="image/*"
            className="bg-transparent "
            onChange={convertToBase64}
          />
          {imagex && <img src={imagex} alt="Preview" width={200} height={200} priority="true"  />}
      
{/*
       <div className="bg-blue-200 p-2 rounded-lg text-right sm:col-span-2 ">
<label  className="block text-sm font-semibold">
تحميل المستند /التأشيرة (PDF)</label>
      <input
        type="file"
        multiple
        onChange={convertsToBase64}
        accept="application/pdf"
      />
      <div>
        
           
         
      </div>
      </div>
*/}

   
           
 
            <button className="btn btn-primary w-full max-w-xs">
               ارسال الرد
            </button>
        </form>
        </>
    );
}