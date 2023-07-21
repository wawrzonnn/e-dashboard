import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { subDays, format } from 'date-fns';

export const LeadsChart = () => {
   const leads = useAppSelector((state) => state.leads.leads);
   const [data, setData] = useState([]);
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(subDays(new Date(), 9));

   const countLeadsPerDay = (date: number | Date) => {
      return leads.filter(
         (lead) => format(new Date(lead.createdAt), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
      ).length;
   };

   useEffect(() => {
      let date = endDate;
      const tempData = [];

      while (date <= startDate) {
         tempData.push({
            date: format(date, 'yyyy-MM-dd'),
            count: countLeadsPerDay(date),
         });

         date.setDate(date.getDate() + 1);
      }

      setData(tempData);
   }, [leads, startDate, endDate]);

   const shiftDate = (days) => {
      setStartDate(subDays(startDate, days));
      setEndDate(subDays(endDate, days));
   };

   return (
      <div>
         <button onClick={() => shiftDate(-9)}>{'<<'}</button>
         <button onClick={() => shiftDate(9)}>{'>>'}</button>
         <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
         </LineChart>
      </div>
   );
};

export default LeadsChart;
