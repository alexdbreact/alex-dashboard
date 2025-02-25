'use client'

import { useState } from 'react'
import MainTable from '@/components/MainTable'
import AddEmployeeModal from '@/components/AddEmployeeModal'



export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <MainTable />
      </div>

      <AddEmployeeModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}