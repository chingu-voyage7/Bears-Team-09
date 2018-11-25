function assembleQuery({ data, tableName, pk }) {
  let query = `UPDATE ${tableName} SET `;
  let counter = 0;
  const values = [];

  console.log(data);
  query = Object.getOwnPropertyNames(data)
    .reduce((acc, property) => {
      values.push(data[property].toString());
      return `${acc} ${property} = $${++counter},`;
    }, query)
    .replace(/,$/g, ""); // strip comma at the end

  query += ` WHERE ${pk} = $${++counter}`;
  values.push(data.email);
  console.log([query, values]);
  return [query, values];
}

module.exports = { assembleQuery };
