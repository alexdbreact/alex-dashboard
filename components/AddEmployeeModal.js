

export default function AddEmployeeModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">إضافة  </h2>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
1              </label>
              <input type="text" className="form-input mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                2
              </label>
              <input type="text" className="form-input mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
3              </label>
              <input type="text" className="form-input mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
4              </label>
              <input type="text" className="form-input mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
5              </label>
              <input type="tel" className="form-input mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
6              </label>
              <select className="form-input mt-1">
                <option>الموارد البشرية</option>
                <option>المالية</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}