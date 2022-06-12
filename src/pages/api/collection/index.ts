import type { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';

type Data = Collection[] | AxiosError;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { status, data } = await api.get(
      `search?country=br&entity=podcast&media=podcast&limit=200&term=nerd`,
    );

    if (status !== 200) res.status(status).end();

    res.status(status).json(data);
  } catch (error) {
    res.status(500).json(error as AxiosError);
  }
}
