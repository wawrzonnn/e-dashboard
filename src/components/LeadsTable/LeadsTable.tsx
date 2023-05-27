import React, { PropsWithChildren, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LeadsTable.module.scss';
import { fetchLeads, selectLeads } from './leadsSlice';

interface LeadsTableProps {}

export const LeadsTable = ({}: PropsWithChildren<LeadsTableProps>) => {
   const dispatch = useDispatch();
   const leads = useSelector(selectLeads);

   useEffect(() => {
      dispatch(fetchLeads());
   }, [dispatch]);

   const formatDateString = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
   };

   return (
      <>
         <table className={styles.table}>
            <thead className={styles.head}>
               <tr className={styles.row}>
                  <th className={`${styles.cell} ${styles.textAlignLeft}`}>Name</th>
                  <th className={`${styles.cell} ${styles.textAlignLeft}`}>Email</th>
                  <th className={`${styles.cell} ${styles.textAlignRight}`}>Agreed</th>
                  <th className={`${styles.cell} ${styles.textAlignRight}`}>Date</th>
               </tr>
            </thead>
            <tbody>
               {leads.map((lead) => (
                  <tr key={lead._id} className={styles.row}>
                     <td className={`${styles.cell} ${styles.textAlignLeft}`}>{lead.name}</td>
                     <td className={`${styles.cell} ${styles.textAlignLeft}`}>{lead.email}</td>
                     <td className={`${styles.cell} ${styles.textAlignRight}`}>
                        {lead.consentsAccepted.toString()}
                     </td>
                     <td className={`${styles.cell} ${styles.textAlignRight}`}>
                        {formatDateString(lead.createdAt)}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};
