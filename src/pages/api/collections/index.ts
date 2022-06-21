import type { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';

type Data = Collection[] | AxiosError;

type Params = {
  country?: string;
  term?: string;
  entity: string;
  limit: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const {
      query: { country, term },
    } = req;

    const params = {
      entity: 'podcast',
      media: 'podcast',
      limit: 24,
    } as Params;

    if (typeof term === 'string' && term?.length) params.term = term;
    if (typeof country === 'string' && country?.length) params.country = country;

    const { status, data } = await api.get(`search`, {
      params,
    });

    res.status(status).json(data?.results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error as AxiosError);
  }
}
