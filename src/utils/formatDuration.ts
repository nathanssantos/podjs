import formatMillisecondsToHms from './formatMillisecondsToHms';
import formatSecondsToHms from './formatSecondsToHms';

const formatDuration = (duration: string) => {
  try {
    if (duration.includes(':')) return duration;

    if (duration.length < 8) return String(formatSecondsToHms(Number(duration)));

    return String(formatMillisecondsToHms(Number(duration)));
  } catch (error) {
    console.warn('formatDuration ERROR');
    console.warn(error);
  }
};

export default formatDuration;
