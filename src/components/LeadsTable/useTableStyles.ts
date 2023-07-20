import classNames from 'classnames/bind';
import styles from './LeadsTable.module.scss';
const cx = classNames.bind(styles);

// This hook returns table and header style-setting functions.
export const useTableStyles = () => {
   // Sets appropriate styles for the table columns.
   const getTableClasses = (columnId: string) =>
      cx({
         [styles.wrapper]: true,
         [styles.thead]: true,
         [styles.thLeft]: columnId === 'name' || columnId === 'email',
         [styles.thRight]: columnId === 'consentsAccepted' || columnId === 'createdAt',
      });

   // Determines the classes for dynamic headers based on sorting state.
   const getDynamicHeaderClasses = (isSorted: boolean, isSortedDesc: boolean) =>
      cx({
         [styles.arrowDisplay]: true,
         [styles.isSorted]: isSorted,
         [styles.isSortedDesc]: isSortedDesc,
         [styles.notSorted]: !isSorted && !isSortedDesc,
      });

   return { getTableClasses, getDynamicHeaderClasses };
};
