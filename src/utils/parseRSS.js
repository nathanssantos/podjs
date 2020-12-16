import Parser from 'rss-parser';

const parseRSS = async (rss) => {
  const parser = new Parser();
  const feed = await parser.parseURL(rss);
  return feed;
};

export default parseRSS;
