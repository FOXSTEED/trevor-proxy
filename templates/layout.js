module.exports = (title, body, scripts, stylesheets) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      ${stylesheets}
      <title>${title}</title>
    </head>
    <body>

    ${body}
    </body>
    ${scripts}
  </html>
  `;