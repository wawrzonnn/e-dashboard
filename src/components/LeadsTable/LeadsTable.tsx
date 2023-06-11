/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useSortBy } from 'react-table';
import styles from './LeadsTable.module.scss';
import classNames from 'classnames/bind';
import { loadLeads } from '../../thunks/leadThunks';
import { formatDateString, formatNameString } from 'untils/formatDataString';

import { TableArrow } from '../../assets/icons/TableArrow';
import { Table, TableHead, TableBody, TableRow } from 'nerdux-ui-system';

const cx = classNames.bind(styles);

export const LeadsTable = () => {
   const leads = useSelector((state: any) => state.leads);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loadLeads() as any);
   }, [dispatch]);

   const getTableClasses = (columnId: string) =>
      cx({
         [styles.wrapper]: true,
         [styles.thead]: true,
         [styles.thLeft]: columnId === 'name' || columnId === 'email',
         [styles.thRight]: columnId === 'consentsAccepted' || columnId === 'createdAt',
      });
   const getDynamicHeaderClasses = (isSorted: boolean, isSortedDesc: boolean) =>
      cx({
         [styles.arrowDisplay]: true,
         [styles.isSorted]: isSorted,
         [styles.isSortedDesc]: isSortedDesc,
         [styles.notSorted]: !isSorted && !isSortedDesc,
      });

   const columns = useMemo(
      () => [
         {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ value }: any) => (
               <span className={styles.tdLeft}>{formatNameString(value)}</span>
            ),
         },
         {
            Header: 'Email',
            accessor: 'email',
            Cell: ({ value }: any) => <span className={styles.tdLeft}>{value.toLowerCase()}</span>,
         },
         {
            Header: 'Agreed',
            accessor: 'consentsAccepted',
            Cell: ({ value }: any) => (
               <span className={styles.tdRight}>{value ? 'Yes' : 'No'}</span>
            ),
         },
         {
            Header: 'Date',
            accessor: 'createdAt',
            Cell: ({ value }: any) => (
               <span className={styles.tdRight}>{formatDateString(value)}</span>
            ),
         },
      ],
      [],
   );
   const tableInstance = useTable({ columns, data: leads }, useSortBy);
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

   return (
      <div className={styles.wrapper}>
         <Table {...getTableProps()}>
            <TableHead>
               {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map((column) => (
                        <th
                           {...column.getHeaderProps(column.getSortByToggleProps())}
                           className={getTableClasses(column.id)}
                        >
                           {column.render('Header')}
                           <span
                              className={getDynamicHeaderClasses(
                                 column.isSorted,
                                 column.isSortedDesc,
                              )}
                           >
                              <TableArrow />
                           </span>
                        </th>
                     ))}
                  </TableRow>
               ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
               {rows.map((row) => {
                  prepareRow(row);
                  return (
                     <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell, idx) => (
                           <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </div>
   );
};
