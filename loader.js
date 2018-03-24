const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const exists = Promise.promisify(fs.stat);


const loadBundle = function(cache, item, filename) {
  setTimeout(() => {
    console.log(`loading: ${filename}`);
    cache[item] = require(filename).default;
  }, 1000);
};

const fetchBundles = (path, services, suffix = '', require = false) => {
  Object.keys(services).forEach(item => {
    const filename = `${path}/${item}${suffix}.js`;
    exists(filename)
      .then(() => {
        require ? loadBundle(services, item, filename) : null;
      })
      .catch(error => {
        if (error.code === 'ENOENT') {
          const url = `${services[item]}${suffix}.js`;
          console.log(`Fetching: ${url}`);
          fetch(url)
            .then(response => {
              const dest = fs.createWriteStream(filename);
              response.body.pipe(dest);
              response.body.on('end', () => {
                require ? loadBundle(services, item, filename) : null;
              });
            });
        } else {
          console.log('Warning, got unknown fs error when trying to fetch bundles');
        }
      });
  });
};

module.exports = (clientPath, serverPath, services) => {
    fetchBundles(clientPath, services);
    fetchBundles(serverPath, services, '-server', true);

    return services;
}