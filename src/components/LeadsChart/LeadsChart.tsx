/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import {
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Area,
   AreaChart,
} from 'recharts';

import { useAppSelector } from '../../store/hooks';

import { ArrowLeft } from 'assets/icons/ArrowLeft';
import { ArrowRight } from 'assets/icons/ArrowRight';

import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { CustomizedAxisTick } from './CustomizedAxisTick/CustomizedAxisTick';

import styles from './LeadsChart.module.scss';

export const LeadsChart = () => {
   const [dateStart, setDateStart] = useState(moment().subtract(9, 'days'));
   const leads = useAppSelector((state) => state.leads.leads);

   const getChartData = () => {
      const data = [];
      for (let i = 0; i <= 9; i++) {
         const currentDate = moment(dateStart).add(i, 'days');
         const leadsForDay = leads.filter((lead) =>
            moment(lead.createdAt).isSame(currentDate, 'day'),
         ).length;
         data.push({
            name: currentDate.format('Do MMM'),
            leads: leadsForDay,
         });
      }
      return data;
   };

   const handleNext = () => {
      setDateStart(moment(dateStart).add(4, 'days'));
   };

   const handlePrev = () => {
      setDateStart(moment(dateStart).subtract(4, 'days'));
   };

   return (
      <div className={styles.container}>
         <div className={styles.header__wrapper}>
            <h3>Leads throughout time</h3>
            <div className={styles.buttons__wrapper}>
               <button onClick={handlePrev}>
                  <ArrowLeft />
               </button>
               <button onClick={handleNext}>
                  <ArrowRight />
               </button>
            </div>
         </div>
         <div>
            <ResponsiveContainer width="100%" height={300}>
               <AreaChart data={getChartData()} margin={{ top: 20, right: -5, bottom: 20 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dy={15}
                     dataKey="name"
                     type="category"
                     domain={['dataMin', 'dataMax']}
                     tick={CustomizedAxisTick}
                     tickLine={false}
                  />
                  <YAxis
                     dx={20}
                     domain={[0, 'dataMax']}
                     ticks={[0, 5, 10, 15, 20]}
                     orientation="right"
                     axisLine={false}
                     tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                     type="linear"
                     dataKey="leads"
                     fill="#B23386"
                     stroke="#B23386"
                     fillOpacity={0.3}
                     strokeWidth={3}
                     activeDot={{ r: 8 }}
                     dot={false}
                  />
               </AreaChart>
            </ResponsiveContainer>
            <div className={styles.legend}>Collected</div>
         </div>
      </div>
   );
};
