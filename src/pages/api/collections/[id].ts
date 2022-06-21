import type { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import RssParser from 'rss-parser';
import api from '../../../services/api';

type Data = Collection | AxiosError;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { id } = req.query;

    const { status, data } = await api.get(`lookup`, {
      params: {
        id,
      },
    });

    if (status !== 200 || !data?.results?.length || !data.results[0]?.feedUrl?.length) {
      res.status(status).end();
    }

    const {
      collectionId,
      artistName,
      collectionName,
      feedUrl,
      artworkUrl100,
      artworkUrl600,
      genres,
      primaryGenreName,
    } = data.results[0];

    const feed = await new RssParser().parseURL(feedUrl);

    const { description, managingEditor, language, copyright, lastBuildDate, items } = feed;

    res.status(status).json({
      collectionId,
      artistName,
      collectionName,
      feedUrl,
      artworkUrl100,
      artworkUrl600,
      genres,
      description,
      managingEditor,
      language,
      copyright,
      lastBuildDate,
      primaryGenreName,
      items: items.map(({ title, link, isoDate, enclosure, content, itunes }) => ({
        title,
        link,
        isoDate,
        enclosure,
        content,
        itunes,
      })) as Podcast[] | any,
    } as Collection);
  } catch (error) {
    console.log(error);
    res.status(500).json(error as AxiosError);
  }
}
