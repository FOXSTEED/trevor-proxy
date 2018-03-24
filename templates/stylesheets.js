module.exports = (items) => `
  ${items.map(item => {
    return `<link rel="stylesheet" href="${item}/styles.css>`;

  }).join('\n')}
`;