import React from 'react';
import moment from 'moment';
import styles from './CustomTooltip.module.scss';

interface IProps {
   active?: boolean;
   payload?: any;
   label?: string;
}

export const CustomTooltip: React.FC<IProps> = ({ active, payload, label }) => {
   if (active && payload && payload.length) {
      return (
         <div className={styles.tooltip}>
            <p className={styles.value}>{payload[0].value}</p>
            <p className={styles.date}>{`${moment(label, 'Do MMM').format('dddd')}`}</p>
            <p className={styles.date}>{`${label} ${moment().year()}`}</p>
         </div>
      );
   }
   return null;
};
