/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LeadsTable.module.scss';
import { TableArrow } from '../../assets/icons/TableArrow';
import classNames from 'classnames/bind';
import { loadLeads } from '../../thunks/leadThunks';
import { Leads } from '../../slices/leadSlice';
import { useTable, useSortBy } from 'react-table';
import { Table, TableHead, TableBody, TableCell, TableRow } from 'nerdux-ui-system';
const cx = classNames.bind(styles);

export const LeadsTable = () => {
   const leads = useSelector((state: any) => state.leads);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loadLeads() as any);
   }, [dispatch]);

   const cellAlignLeft = cx({
      [styles.wrapper]: true,
      [styles.cellAlignLeft]: true,
      [styles.tableHeader]: true,
      [styles.headerArrowInactive]: true,
   });

   const cellAlignRight = cx({
      [styles.wrapper]: true,
      [styles.cellAlignRight]: true,
      [styles.tableHeader]: true,
      [styles.headerArrowInactive]: true,
   });

   return (
      <>
         <div className={styles.wrapper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell align={'right'}>
                        <span className={cellAlignLeft}>
                           Name
                           <TableArrow />
                        </span>
                     </TableCell>
                     <TableCell align={'left'}>
                        <span className={cellAlignLeft}>
                           Email
                           <TableArrow />
                        </span>
                     </TableCell>
                     <TableCell align={'right'}>
                        <span className={cellAlignRight}>
                           Agreed
                           <TableArrow />
                        </span>
                     </TableCell>
                     <TableCell align={'right'}>
                        <span className={cellAlignRight}>
                           Date
                           <TableArrow />
                        </span>
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {leads.map((lead: Leads) => (
                     <TableRow key={lead._id}>
                        <TableCell align="left">{lead.name}</TableCell>
                        <TableCell align="left">{lead.email}</TableCell>
                        <TableCell align="right">{lead.consentsAccepted ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="right">{lead.createdAt}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </>
   );
};
