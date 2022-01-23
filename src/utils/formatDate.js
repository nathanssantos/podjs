const formatDate = (date, separator = "-", locale = "pt-BR") => {
  let newDate = date;

  if (
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date.getTime())
  ) {
    switch (locale) {
      case "en-US": {
        newDate = new Date(date)
          .toLocaleString(locale)
          .split(" ")[0]
          .replace(",", "")
          .split("/");

        newDate = `${newDate[2]}${separator}${newDate[0]}${separator}${newDate[1]}`;
        break;
      }

      default: {
        newDate = new Date(date)
          .toLocaleString(locale)
          .split(" ")[0]
          .replace(/\//g, separator);
        break;
      }
    }
  }

  return newDate;
};

export default formatDate;
