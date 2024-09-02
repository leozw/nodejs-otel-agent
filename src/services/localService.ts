import axios, { AxiosResponse } from 'axios';

export const fetchLocalService = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao chamar o serviço local');
  }
};
