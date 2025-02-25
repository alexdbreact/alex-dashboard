'use client'

import { useState } from 'react'
import AllTable from '@/components/AllTable'




export default function Dashboard() {

  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-gray-800 text-center ml-4 ">Published Instructions / Public Decisions</h1>
        
       
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <AllTable />
      </div>

    
    </div>
  )
}