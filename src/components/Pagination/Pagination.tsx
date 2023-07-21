import React from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { ArrowLeft } from 'assets/icons/ArrowLeft';
import { ArrowRight } from 'assets/icons/ArrowRight';
const cx = classNames.bind(styles);

interface PaginationProps {
   maxPages: number;
   currentPage: number;
   onPageChange(value: number): void;
}

export const Pagination: React.FC<PaginationProps> = ({ maxPages, currentPage, onPageChange }) => {
   const handlePrev = () => {
      if (currentPage > 1) {
         onPageChange(currentPage - 1);
      }
   };

   const handleNext = () => {
      if (currentPage < maxPages) {
         onPageChange(currentPage + 1);
      }
   };

   const renderPages = () => {
      const pages = [];

      for (let i = 1; i <= maxPages; i++) {
         const getPaginationItemClasses = cx({
            [styles.paginationItem]: true,
            [styles.activePage]: currentPage === i,
         });
         if (i === 1 || i === maxPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            pages.push(
               <button className={getPaginationItemClasses} onClick={() => onPageChange(i)}>
                  {i}
               </button>,
            );
         } else if (i === currentPage - 2 || i === currentPage + 2) {
            pages.push(<div>...</div>);
         }
      }
      return pages;
   };

   const getPrevButtonClasses = cx({
      [styles.arrowButton]: true,
      [styles.buttonDisabled]: currentPage === 1,
   });
   const getNextButtonClasses = cx({
      [styles.arrowButton]: true,
      [styles.buttonDisabled]: currentPage === maxPages,
   });

   return (
      <div className={styles.wrapper}>
         <button className={getPrevButtonClasses} onClick={handlePrev}>
            <ArrowLeft />
         </button>
         {renderPages()}
         <button className={getNextButtonClasses} onClick={handleNext}>
            <ArrowRight />
         </button>
      </div>
   );
};

export default Pagination;
