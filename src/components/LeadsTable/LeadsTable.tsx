/* eslint-disable react/jsx-key */
import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';

import { Table, TableHead, TableBody, TableRow } from 'nerdux-ui-system';

import { useAppSelector } from '../../store/hooks';
import { useTableStyles } from './useTableStyles';
import { useTableEffects } from './useTableEffects';
import { TableArrow } from '../../assets/icons/TableArrow';
import { Pagination } from '../Pagination/Pagination';
import { getColumns } from './Columns';

import styles from './LeadsTable.module.scss';

interface LeadsTableProps {
   searchValue: string;
}

export const LeadsTable = ({ searchValue }: LeadsTableProps) => {
   useTableEffects(searchValue);
   const { getTableClasses, getDynamicHeaderClasses } = useTableStyles();
   const filteredLeads = useAppSelector((state) => state.leads.filteredLeads);

   const leadsPerPage = 8;
   const maxPages = Math.ceil((filteredLeads?.length || 0) / leadsPerPage);

   const [activePage, setActivePage] = useState(1);

   const slicedLeads = useMemo(() => {
      if (!filteredLeads) return [];
      const start = (activePage - 1) * leadsPerPage;
      return filteredLeads.slice(start, start + leadsPerPage);
   }, [filteredLeads, activePage]);

   const onPageChange = (value: number) => {
      setActivePage(value);
   };

   const columns = useMemo(() => getColumns(searchValue), [searchValue]);
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
      { columns, data: filteredLeads || [] },
      useSortBy,
   );

   const slicedRows = useMemo(
      () => rows.slice((activePage - 1) * leadsPerPage, activePage * leadsPerPage),
      [rows, activePage],
   );

   return (
      <div className={styles.wrapper}>
         <div className={styles.flex_container}>
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
                  {slicedRows.map((row) => {
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
         <div className={styles.pagination_wrapper}>
            {filteredLeads?.length > 8 && (
               <Pagination
                  maxPages={maxPages}
                  currentPage={activePage}
                  onPageChange={onPageChange}
               />
            )}
         </div>
      </div>
   );
};
