import type { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import api from '../../../services/api';

type Data = Collection[] | AxiosError;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const {
      query: { country },
    } = req;

    const { status, data } = await api.get(
      `https://rss.applemarketingtools.com/api/v2/${
        country?.length ? country : 'br'
      }/podcasts/top/24/podcasts.json`,
    );

    res.status(status).json(
      data?.feed?.results?.map(
        ({
          artistName,
          id,
          name,
          artworkUrl100,
          genres,
        }: {
          artistName: string;
          id: string;
          name: string;
          artworkUrl100: string;
          genres: { name: string }[];
        }) => ({
          artistName,
          collectionId: Number(id),
          collectionName: name,
          artworkUrl100,
          primaryGenreName: genres[0].name,
          genres,
        }),
      ),
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error as AxiosError);
  }
}
