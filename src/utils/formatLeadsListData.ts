import { LeadDto } from '../data/dto/Lead.dto';

export const filterLeadsFromLast24Hours = (leads: LeadDto[]) => {
   return leads.filter(
      (lead) => new Date().getTime() - new Date(lead.createdAt).getTime() < 24 * 60 * 60 * 1000,
   );
};

export const formatDate = (date: string) => {
   return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
   });
};
