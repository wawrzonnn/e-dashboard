/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import styles from './Leads.module.scss';
import { TextField, Button } from 'nerdux-ui-system';
import { LeadsTable } from 'components/LeadsTable/LeadsTable';
import { useAppSelector } from 'store/hooks';

export const Leads = () => {
   const [searchInputValue, setSearchInputValue] = useState('');
   const [searchValue, setSearchValue] = useState('');

   const filteredLeads = useAppSelector((state) => state.leads.filteredLeads);

   const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
      setSearchInputValue(event.target.value);
   };

   const handleSearchClick = () => {
      setSearchValue(searchInputValue);
   };

   const handleClearClick = () => {
      setSearchValue('');
      setSearchInputValue('');
   };

   return (
      <div className={styles.wrapper}>
         <div className={styles.leadsHeader__wrapper}>
            <h2>Collected Leads</h2>
            <div className={styles.search__wrapper}>
               <TextField
                  value={searchInputValue}
                  withIcon
                  placeholder={'Search'}
                  name={'search'}
                  id={'search'}
                  onChange={handleInputChange}
                  onClear={handleClearClick}
               ></TextField>
               <Button onClick={handleSearchClick} variant={'primary'}>
                  Search
               </Button>
            </div>
         </div>
         {searchValue && (
            <div className={styles.results__wrapper}>
               <p className={styles.results__values}>
                  Displaying search results for "{searchValue}" ({filteredLeads.length})
                  <span className={styles.results__clear} onClick={handleClearClick}>
                     Clear search
                  </span>
               </p>
            </div>
         )}
         <LeadsTable searchValue={searchValue} />
         {!filteredLeads.length && (
            <div className={styles.noresults__wrapper}>
               <p>No results for "{searchValue}"</p>
               <span className={styles.results__clear} onClick={handleClearClick}>
                  Clear search
               </span>
            </div>
         )}
      </div>
   );
};
