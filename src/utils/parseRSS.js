import Parser from 'rss-parser';

const parseRSS = async (url) => {
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  return feed;
};

export default parseRSS;
