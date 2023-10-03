import { LeadDto } from '../data/dto/Lead.dto';

// Filters leads based on name or email match with searchValue.
export const filterLeads = (leads: LeadDto[], searchValue: string) => {
   if (!leads) return [];
   return leads.filter(
      (lead) =>
         lead.name.toLowerCase().includes(searchValue.toLowerCase()) ||
         lead.email.toLowerCase().includes(searchValue.toLowerCase()),
   );
};
