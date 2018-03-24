module.exports = (title, body, scripts, stylesheets) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      ${stylesheets}
      <title>${title}</title>
    </head>
    <body>
    <div id="Nearby"></div>
    ${body}
    </body>
    ${scripts}
  </html>
  `;