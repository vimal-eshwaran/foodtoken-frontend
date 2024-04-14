import React, { useState } from 'react'
import './Income.css'

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2';
import { Box, MenuItem, TextField } from '@mui/material';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const Income = ({ profit }) => {

  const [sorting, setSorting] = useState("WEEK")
  let totalPrice = 0

  const today = new Date().getDate();
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();

  
  const week = today - 7


  const labels = []
  const earnings = []


  sorting === "WEEK" &&
    profit.map((element) => {

      if (thisYear == element.deliveredDate.slice(0, 4) && thisMonth == element.deliveredDate.slice(5, 7) && week < element.deliveredDate.slice(8, 10)) {
        if (!labels.includes(element.deliveredDate)) {
          labels.push(element.deliveredDate)
        }

      }
      return labels

    })



  sorting === "MONTH" &&
    profit.map((element) => {
      if (thisYear == element.deliveredDate.slice(0, 4) && thisMonth == element.deliveredDate.slice(5, 7)) {
        if (!labels.includes(element.deliveredDate)) {
          labels.push(element.deliveredDate)
        }

      }
      return labels

    })


  sorting === "YEAR" &&
    profit.map((element) => {
      if (thisYear == element.deliveredDate.slice(0, 4)) {
        if (!labels.includes(element.deliveredDate.slice(0, 7))) {
          labels.push(element.deliveredDate.slice(0, 7))
        }

      }

      return labels
    })


  if (sorting === "WEEK" || sorting === "MONTH") {
    for (let index = 0; index < labels.length; index++) {
      let price = 0;
      profit.map((element) => {
        if (labels[index] === element.deliveredDate) {
          price = +element.foodPrice + price
        }
        return price

      })
      earnings.push(price)
    }

    for (let index = 0; index < earnings.length; index++) {
      totalPrice = totalPrice + earnings[index]

    }


  } else if (sorting === "YEAR") {
    for (let index = 0; index < labels.length; index++) {
      let price = 0;
      profit.map((element) => {
        if (labels[index] === element.deliveredDate.slice(0, 7)) {
          price = +element.foodPrice + price
        }
        return price

      })
      earnings.push(price)

    }
    for (let index = 0; index < earnings.length; index++) {
      totalPrice = totalPrice + earnings[index]

    }

  }



  const data = {
    labels: labels,
    datasets: [{
      label: 'My Earnings',
      data: earnings,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',

      borderColor: 'rgb(255, 99, 132)',


      borderWidth: 1
    }]
  };
  const options = {

  }


  const values = [
    {
      value: "WEEK",
      label: 'WEEK'
    },
    {
      value: "MONTH",
      label: 'MONTH'
    },
    {
      value: "YEAR",
      label: 'YEAR'
    }
  ]


  return (
    <div className='chartDiv'>
      <div className="heading">INCOME :</div>
      <div className="sort">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-select-currency"
            select          
            defaultValue="WEEK"

          >
            {values.map((option) => (
              <MenuItem  key={option.value} onClick={() => setSorting(option.value)} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

      </div>
      <div className="totalprice">
        Total Income : {totalPrice} .RS
      </div>

      <div className="chart" >
        <Bar
          data={data}
          options={options}

        ></Bar>
      </div>

    </div>
  )
}

export default Income;