import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LeadsTable.module.scss';
import { TableArrow } from '../../assets/icons/TableArrow';
import classNames from 'classnames/bind';
import { loadLeads } from '../../thunks/leadThunks';

const cx = classNames.bind(styles);

export const LeadsTable = () => {
   const leads = useSelector((state: any) => state.leads);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loadLeads() as any);
   }, [dispatch]);

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
                  <th className={styles.cell}>
                     <div>
                        Name
                        <TableArrow />
                     </div>
                  </th>
                  <th className={styles.cell}>
                     <div>
                        Email
                        <TableArrow />
                     </div>
                  </th>
                  <th className={styles.cell}>
                     <div>
                        Agreed
                        <TableArrow />
                     </div>
                  </th>
                  <th className={styles.cell}>
                     <div>
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
                     <td className={cellAlignRight}>{lead.createdAt}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};
