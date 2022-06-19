const normalizeString = (value: string) => value.normalize('NFD').replace(/[^\w\s]/gi, '');

export default normalizeString;
