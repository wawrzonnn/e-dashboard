import axios from 'axios';

export async function checkToken(token: string) {
   try {
      const response = await axios.get('https://training.nerdbord.io/api/v1/auth/me', {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      return response.status === 200;
   } catch (error) {
      return false;
   }
}
