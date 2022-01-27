import { makeObservable, observable } from "mobx";
import { millisecondsToHms, secondsToHms } from "../../utils";

export default class Episode {
  title = null;
  image = null;
  pubDate = null;
  link = null;
  content = null;
  mediaUrl = null;
  duration = null;

  constructor(newEpisode = {}) {
    makeObservable(this, {
      title: observable,
      image: observable,
      pubDate: observable,
      link: observable,
      content: observable,
      mediaUrl: observable,
      duration: observable,
    });

    const { title, pubDate, link, content, itunes, enclosure } = newEpisode;

    this.title = title || "";
    this.pubDate = pubDate || "";
    this.link = link || "";
    this.image = itunes?.image || "";
    this.content = itunes?.summary?.length ? itunes.summary : content || "";
    this.duration = itunes?.duration?.length
      ? itunes?.duration?.includes(":")
        ? itunes.duration
        : itunes?.duration?.length > 8
        ? millisecondsToHms(itunes.duration)
        : secondsToHms(itunes.duration)
      : "";
    this.mediaUrl = enclosure?.url || "";
  }
}
