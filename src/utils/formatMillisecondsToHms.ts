const formatMillisecondsToHms = (milliseconds: number) => {
  try {
    const d = new Date(1000 * Math.round(milliseconds / 1000));
    const pad = (i: number) => ('0' + i).slice(-2);
    return d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
  } catch (error) {
    console.warn('formatMillisecondsToHms ERROR');
    return milliseconds;
  }
};

export default formatMillisecondsToHms;
