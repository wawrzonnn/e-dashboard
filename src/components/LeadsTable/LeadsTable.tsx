import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LeadsTable.module.scss';
import { fetchLeads, selectLeads, sortLeadsByColumn, selectSortKey } from './leadsSlice';
import { TableArrow } from '../../assets/icons/TableArrow';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface LeadsTableProps {}

export const LeadsTable = ({}: PropsWithChildren<LeadsTableProps>) => {
   const dispatch = useDispatch();
   const leads = useSelector(selectLeads);
   const sortKey = useSelector(selectSortKey);
   const [selectedColumn, setSelectedColumn] = useState('');

   useEffect(() => {
      dispatch(fetchLeads() as any);
   }, [dispatch]);

   const formatDateString = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
   };

   const handleHeaderClick = (key: 'name' | 'email' | 'consentsAccepted' | 'date') => {
      dispatch(sortLeadsByColumn(key) as any);
      setSelectedColumn(key);
   };

   const getHeaderClass = (columnKey: string) => {
      return cx({
         [styles.tableHeader]: true,
         [styles.headerArrowInactive]: true,
         [styles.tableHeaderRight]: columnKey === 'email' || columnKey === 'date',
         [styles.active]: selectedColumn === columnKey,
      });
   };

   const cellAlignLeft = cx({
      [styles.cell]: true,
      [styles.cellAlignLeft]: true,
   });
   const cellAlignRight = cx({
      [styles.cell]: true,
      [styles.cellAlignRight]: true,
   });

   return (
      <>
         <table className={styles.table}>
            <thead className={styles.head}>
               <tr className={styles.row}>
                  <th className={styles.cell} onClick={() => handleHeaderClick('name')}>
                     <div className={getHeaderClass('name')}>
                        Name
                        <TableArrow />
                     </div>
                  </th>
                  <th className={styles.cell} onClick={() => handleHeaderClick('email')}>
                     <div className={getHeaderClass('email')}>
                        Email
                        <TableArrow />
                     </div>
                  </th>
                  <th className={styles.cell} onClick={() => handleHeaderClick('consentsAccepted')}>
                     <div className={getHeaderClass('consentsAccepted')}>
                        Agreed
                        <TableArrow />
                     </div>
                  </th>
                  <th className={styles.cell} onClick={() => handleHeaderClick('date')}>
                     <div className={getHeaderClass('date')}>
                        Date
                        <TableArrow />
                     </div>
                  </th>
               </tr>
            </thead>
            <tbody>
               {leads.map((lead) => (
                  <tr key={lead._id} className={styles.row}>
                     <td className={cellAlignLeft}>{lead.name}</td>
                     <td className={cellAlignLeft}>{lead.email}</td>
                     <td className={cellAlignRight}>{lead.consentsAccepted ? 'Yes' : 'No'}</td>
                     <td className={cellAlignRight}>{formatDateString(lead.createdAt)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};
