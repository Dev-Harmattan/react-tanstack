import React, { useMemo } from 'react';
import mData from '../MOCK_DATA.json';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DateTime } from 'luxon';

const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
  },
  // {
  //   header: 'First Name',
  //   accessorKey: 'first_name',
  // },
  // {
  //   header: 'Last Name',
  //   accessorKey: 'last_name',
  // },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
  },
  {
    header: 'Data of Birth',
    accessorKey: 'dob',
    cell: (info) =>
      DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
  },
];

export const BasicTable = () => {
  const data = useMemo(() => mData, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
