const secondsToHms = (seconds) => {
  try {
    const date = new Date(null);
    date.setSeconds(seconds);

    return date.toISOString().split("T")[1].split(".")[0];
  } catch (error) {
    console.log("secondsToHms ERROR", error);
    return seconds;
  }
};

export default secondsToHms;
