/* eslint-disable react/jsx-key */
import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import Highlighter from 'react-highlight-words';

import { Table, TableHead, TableBody, TableRow } from 'nerdux-ui-system';

import { LeadDto } from 'data/dto/Lead.dto';
import { useAppSelector } from '../../store/hooks';
import { formatDateString, formatNameString } from '../../utils/formatLeadsTableData';
import { useTableStyles } from './useTableStyles';
import { useTableEffects } from './useTableEffects';
import { TableArrow } from '../../assets/icons/TableArrow';
import { Pagination } from '../Pagination/Pagination';

import styles from './LeadsTable.module.scss';

interface LeadsTableProps {
   searchValue: string;
}

interface Column {
   Header: string;
   accessor: keyof LeadDto;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ searchValue }) => {
   useTableEffects(searchValue);
   const { getTableClasses, getDynamicHeaderClasses } = useTableStyles();
   const filteredLeads = useAppSelector((state) => state.leads.filteredLeads);

   const leadsPerPage = 8;
   const maxPages = Math.ceil(filteredLeads.length / leadsPerPage);

   const [activePage, setActivePage] = useState(1);

   const slicedLeads = useMemo(() => {
      const start = (activePage - 1) * leadsPerPage;
      return filteredLeads.slice(start, start + leadsPerPage);
   }, [filteredLeads, activePage]);

   const onPageChange = (value: number) => {
      setActivePage(value);
   };

   const columns = useMemo<Column[]>(
      () => [
         {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ value }: { value: string }) => (
               <Highlighter
                  searchWords={[searchValue]}
                  autoEscape={true}
                  highlightClassName={styles.highlight__values}
                  textToHighlight={formatNameString(value)}
               />
            ),
            sortType: (a: { original: { name: string } }, b: { original: { name: string } }) => {
               const aName = formatNameString(a.original.name);
               const bName = formatNameString(b.original.name);
               return aName.localeCompare(bName);
            },
         },
         {
            Header: 'Email',
            accessor: 'email',
            Cell: ({ value }: { value: string }) => (
               <Highlighter
                  searchWords={[searchValue]}
                  autoEscape={true}
                  highlightClassName={styles.highlight__values}
                  textToHighlight={value.toLowerCase()}
                  highlight={searchValue}
               />
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
      [searchValue],
   );
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
      { columns, data: slicedLeads },
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
         <Pagination maxPages={maxPages} currentPage={activePage} onPageChange={onPageChange} />
      </div>
   );
};
