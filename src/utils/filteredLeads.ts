import { LeadDto } from '../data/dto/Lead.dto';

export const filterLeads = (leads: LeadDto[], searchValue: string) => {
   return leads.filter(
      (lead) =>
         lead.name.toLowerCase().includes(searchValue.toLowerCase()) ||
         lead.email.toLowerCase().includes(searchValue.toLowerCase()),
   );
};
