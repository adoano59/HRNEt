import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import './EmployeeList.css'

// Composant pour la barre de recherche
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className="global-filter">
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search employees..."
      />
    </div>
  )
}

const EmployeeList = () => {
  const navigate = useNavigate()
  const handleReturnHome = () => {
    navigate('/'); // Redirige vers la page des employés
  }
  const employees = useSelector((state) => state.employees.list)

  // État local pour gérer le filtre global
  const [globalFilter, setGlobalFilter] = useState('')

  // Définir les colonnes
  const columns = useMemo(
    () => [
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      { accessorKey: 'startDate', header: 'Start Date' },
      { accessorKey: 'department', header: 'Department' },
      { accessorKey: 'birthDate', header: 'Date of Birth' },
      { accessorKey: 'street', header: 'Street' },
      { accessorKey: 'city', header: 'City' },
      { accessorKey: 'state', header: 'State' },
      { accessorKey: 'zipCode', header: 'Zip Code' },
    ],
    []
  )

  const data = useMemo(() => employees, [employees])

  // Configuration de React Table
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const { rows } = table.getRowModel()
  const { pageIndex, pageSize } = table.getState().pagination

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <button className='btnShow' type="button" onClick={handleReturnHome}>Add Employee</button>

      {/* Barre de recherche */}
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header}
                  {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
        
    </div>
    
  )
}

export default EmployeeList