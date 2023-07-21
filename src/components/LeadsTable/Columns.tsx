import React from 'react';
import Highlighter from 'react-highlight-words';
import styles from './LeadsTable.module.scss';
import { LeadDto } from 'data/dto/Lead.dto';
import { formatDateString, formatNameString } from '../../utils/formatLeadsTableData';
import { Column as TableColumn } from 'react-table';

export const getColumns = (searchValue: string): TableColumn<LeadDto>[] => [
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
         />
      ),
      sortType: (a: { original: { email: string } }, b: { original: { email: string } }) => {
         const aEmail = a.original.email.toLowerCase();
         const bEmail = b.original.email.toLowerCase();
         return aEmail.localeCompare(bEmail);
      },
   },
   {
      Header: 'Agreed',
      accessor: 'consentsAccepted',
      Cell: ({ value }: { value: boolean }) => (
         <span className={styles.tdRight}>{value ? 'Yes' : 'No'}</span>
      ),
      sortType: (
         a: { original: { consentsAccepted: boolean } },
         b: { original: { consentsAccepted: boolean } },
      ) => {
         return a.original.consentsAccepted === b.original.consentsAccepted
            ? 0
            : a.original.consentsAccepted
            ? -1
            : 1;
      },
   },
   {
      Header: 'Date',
      accessor: 'createdAt',
      Cell: ({ value }: { value: string }) => (
         <span className={styles.tdRight}>{formatDateString(value)}</span>
      ),
      sortType: (
         a: { original: { createdAt: string } },
         b: { original: { createdAt: string } },
      ) => {
         const aDate = new Date(a.original.createdAt);
         const bDate = new Date(b.original.createdAt);
         return aDate.getTime() - bDate.getTime();
      },
   },
];
