module.exports = (query, populateOptions) => {
  populateOptions.forEach((option) => {
    query = query.populate(option);
  });
  return query;
};
