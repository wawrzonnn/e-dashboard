/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import styles from './LeadsTable.module.scss';
import classNames from 'classnames/bind';
import { loadLeads } from '../../thunks/leadThunk';
import { formatDateString, formatNameString } from '../../utils/formatLeadsTableData';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { TableArrow } from '../../assets/icons/TableArrow';
import { Table, TableHead, TableBody, TableRow } from 'nerdux-ui-system';

const cx = classNames.bind(styles);

export const LeadsTable = () => {
   const leads = useAppSelector((state) => state.leads);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(loadLeads());
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
            Cell: ({ value }: { value: string }) => (
               <span className={styles.tdLeft}>{formatNameString(value)}</span>
            ),
         },
         {
            Header: 'Email',
            accessor: 'email',
            Cell: ({ value }: { value: string }) => (
               <span className={styles.tdLeft}>{value.toLowerCase()}</span>
            ),
         },
         {
            Header: 'Agreed',
            accessor: 'consentsAccepted',
            Cell: ({ value }: { value: boolean }) => (
               <span className={styles.tdRight}>{value ? 'Yes' : 'No'}</span>
            ),
         },
         {
            Header: 'Date',
            accessor: 'createdAt',
            Cell: ({ value }: { value: string }) => (
               <span className={styles.tdRight}>{formatDateString(value)}</span>
            ),
         },
      ],
      [],
   );
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
      { columns, data: leads },
      useSortBy,
   );

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
                                 column.isSortedDesc || false,
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
