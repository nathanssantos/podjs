import { makeObservable, observable } from "mobx";

export default class Episode {
  title = null;
  image = null;
  pubDate = null;
  link = null;
  content = null;
  mediaUrl = null;
  length = null

  constructor(newEpisode = {}) {
    makeObservable(this, {
      title: observable,
      image: observable,
      pubDate: observable,
      link: observable,
      content: observable,
      mediaUrl: observable,
      length: observable,
    });

    const { title, pubDate, link, content, itunes, enclosure } = newEpisode;

    this.title = title || "";
    this.pubDate = pubDate || "";
    this.link = link || "";
    this.image = itunes?.image?.length ? itunes.image : "";
    this.content = itunes?.summary?.length ? itunes.summary : content || "";
    this.mediaUrl = enclosure?.url?.length ? enclosure.url : "";
    this.length = enclosure?.length?.length ? enclosure.length : "";
  }
}
