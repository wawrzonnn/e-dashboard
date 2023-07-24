import moment from 'moment';
import { LeadDto } from '../data/dto/Lead.dto';

interface ChartData {
   name: string;
   leads: number;
}

export const getChartData = (dateStart: moment.Moment, leads: LeadDto[]): ChartData[] => {
   const data: ChartData[] = [];
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
