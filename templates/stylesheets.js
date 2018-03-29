module.exports = (items) => `
  ${items.map(item => {
    return `<link rel="stylesheet" href="/${item.toLowerCase()}/styles.css">`;
  }).join('\n')}
`;