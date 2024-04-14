import React from 'react';
import './Customer.css'
import { DataGrid } from '@mui/x-data-grid';

const Customer = ({ customersData }) => {

  const columns = [
    {
      field: "name", headerName: "NAME", width: 200
    },
    {
      field: "email", headerName: "EMAIL", width: 200
    }

  ]

  const rows = customersData;


  return (
    <div className="customersDiv">
      <div style={{ height: "70vh", width: 'calc(150px + 50vw)' }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default Customer