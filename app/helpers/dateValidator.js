function dateValid(dateString) {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return isoDateRegex.test(dateString);
};
export async function date(dateString) {
  if (!dateValid(dateString)) return new Date(`${dateString}`).toISOString();
  return dateString;
}