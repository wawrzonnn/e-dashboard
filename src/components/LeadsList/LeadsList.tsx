import React, { useEffect, useState } from 'react';
import styles from './LeadsList.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadLeads } from '../../thunks/leadThunk';
import { LeadDto } from '../../data/dto/Lead.dto';
import { filterLeadsFromLast24Hours, formatDate } from 'utils/formatLeadsListData';
import classNames from 'classnames';
const cx = classNames.bind(styles);

export const LeadsList = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.user.data);
   const leads = filterLeadsFromLast24Hours(
      useAppSelector((state: { leads: LeadDto[] }) => state.leads),
   );

   const [numDisplayed, setNumDisplayed] = useState(5);
   const [isScrollVisible, setIsScrollVisible] = useState(false);

   useEffect(() => {
      if (user?.token) {
         dispatch(loadLeads(user.token));
      }
   }, [dispatch, user]);

   const loadMore = () => {
      setIsScrollVisible(leads.length > numDisplayed);
      setNumDisplayed((prevState) => prevState + Math.min(5, leads.length - prevState));
   };

   const getListClasses = cx({
      [styles.list]: true,
      [styles.scroll__visible]: isScrollVisible,
      [styles.scroll__hidden]: !isScrollVisible,
   });

   return (
      <>
         <div className={styles.list__header}>
            <h3>
               Newest List ({leads.length}) <span>Last 24h</span>
            </h3>
         </div>
         <div className={getListClasses}>
            <ul>
               {leads.slice(0, numDisplayed).map((lead) => (
                  <li key={lead._id}>
                     <p className={styles.listitem__title}>
                        {lead.name}
                        <span className={styles.listitem__support}>
                           {formatDate(lead.createdAt)}
                        </span>
                     </p>
                  </li>
               ))}
            </ul>
         </div>
         <button className={styles.loadmore__button} onClick={loadMore}>
            Load more
         </button>
      </>
   );
};
