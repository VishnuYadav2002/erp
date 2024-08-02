import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import './style.css';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1', 159, 6.0, 24, 4.0),
  createData('2', 237, 9.0, 37, 4.3),
  createData('3', 262, 16.0, 24, 6.0),
  createData('4', 305, 3.7, 67, 4.3),
];



export function TableData() {
  return (
    <div>
       <Box sx={{ width: '100%' }}>
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '40px',
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          '--TableRow-stripeBackground': 'rgba(0, 0, 0, 0.04)',
          '--TableRow-hoverBackground': 'rgba(0, 0, 0, 0.08)',
          overflow: 'auto',
          background: (theme) => `
            linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0)),
            radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0)) 0 100%
          `,
          backgroundSize: `
            40px calc(100% - var(--TableCell-height)), 
            40px calc(100% - var(--TableCell-height)), 
            14px calc(100% - var(--TableCell-height)), 
            14px calc(100% - var(--TableCell-height))
          `,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundPosition: `
            var(--Table-firstColumnWidth) var(--TableCell-height), 
            calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), 
            var(--Table-firstColumnWidth) var(--TableCell-height), 
            calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)
          `,
          backgroundColor: 'background.surface',
        }}
      >
        <Table
          stripe="odd"
          hoverRow
          sx={{
            '& tr > *:first-child': {
              position: 'sticky',
              left: 0,
              boxShadow: '1px 0 var(--TableCell-borderColor)',
              bgcolor: 'background.surface',
            },
            '& tr > *:last-child': {
              position: 'sticky',
              right: 0,
              bgcolor: 'var(--TableCell-headBackground)',
            },
            '& th, & td': {
              borderLeft: 'none', // Remove the left border for all table cells
              borderRight: 'none', // Remove the right border for all table cells
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>S.no</th>
              <th style={{ width: 200 }}>Company Name</th>
              <th style={{ width: 200 }}>Mobile</th>
              <th style={{ width: 200 }}>Marketplace</th>
              <th style={{ width: 200 }}>Task Name</th>
              <th style={{ width: 200 }}>Priority</th>
              <th style={{ width: 200 }}>Task Given To</th>
              <th style={{ width: 200 }}>Task Given By</th>
              <th style={{ width: 200 }}>Task Date</th>
              <th style={{ width: 200 }}>QC Time</th>
              <th className='text-center'
                aria-label="last"
                style={{ width: 'var(--Table-lastColumnWidth)' }}
              >Action</th>
            
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.calories}</td>
                <td>{row.fat}</td>
                <td>{row.carbs}</td>
                <td>{row.protein}</td>
                <td>{row.protein}</td>
                <td>{row.protein}</td>
                <td>{row.protein}</td>
                <td>{row.protein}</td>
                <td>{row.protein}</td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="sm" variant="plain" color="neutral">
                      Edit
                    </Button>
                    <Button size="sm" variant="soft" color="danger">
                      Delete
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
    </div>
  );
}

export default TableData;
