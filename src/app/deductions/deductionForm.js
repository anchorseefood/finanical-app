import { useState, useEffect } from "react";

export default function DeductionForm({ refetchDeductions, setOpen, selectedDeduction = null }) {
  const [amount, setAmount] = useState(selectedDeduction?.amount || "");
  const [date, setDate] = useState(selectedDeduction ? new Date(selectedDeduction.date).toISOString().split('T')[0] : "");
  const [employee, setEmployee] = useState(selectedDeduction?.employee_id || ""); 
  const [deductionType, setDeductionType] = useState(selectedDeduction?.deduction_type || ""); 
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees");
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load employees.");
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedDeduction ? "PUT" : "POST";
    const url = selectedDeduction ? `/api/deductions/${selectedDeduction.id}` : "/api/deductions";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedDeduction?.id,
        amount,
        date,
        employee_id: employee,
        deduction_type: deductionType,
      }),
    });

    if (response.ok) {
      // Reset the form fields
      setAmount("");
      setDate("");
      setEmployee("");
      setDeductionType("");
      setOpen(false);
      refetchDeductions();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date field */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Amount field */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Employee field */}
      <div>
        <label
          htmlFor="employee"
          className="block text-sm font-medium text-gray-700"
        >
          Employee
        </label>
        <select
          id="employee"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select employee</option>
          {loading ? (
            <option disabled>Loading...</option>
          ) : error ? (
            <option disabled>{error}</option>
          ) : (
            employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Deduction Type field */}
      <div>
        <label
          htmlFor="deductionType"
          className="block text-sm font-medium text-gray-700"
        >
          Deduction Type
        </label>
        <select
          id="deductionType"
          value={deductionType}
          onChange={(e) => setDeductionType(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select type</option>
          <option value="نقص كاش">نقص كاش</option>
          <option value="تسبب باضرار">تسبب باضرار</option>
          <option value="سوء سلوك">سوء سلوك</option>
        </select>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {selectedDeduction ? "Update Deduction" : "Add Deduction"}
        </button>
      </div>
    </form>
  );
}
