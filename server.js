require('newrelic');
const express = require('express')
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const proxy = require('express-http-proxy');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const port = process.env.PORT || 3000;


// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/:listing_id', express.static(path.join(__dirname, 'public')));


const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');
const Stylesheets = require('./templates/stylesheets');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);

    return ReactDom.renderToString(component);
  });
}

app.get('/item/:id', (req, res) => {
  console.log(req.params.id)
  let components = renderComponents(services, {id: req.params.id} );

  res.send(Layout(
    'Nearby',
    App(...components),
    Scripts(Object.keys(services), req.params.id),
    Stylesheets(Object.keys(services))

  ));
});
//bryan`
// app.use('/reviews', (req, res) => {
//   axios.get(`http://reviews:3001${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

//eric
// app.use('/overview', (req, res) => {
//   axios.get(`http://overview:3002${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

// //kirk

// // app.use('/nearby/*', (req, res) => {

// //   // axios.get(`/nearby${req.originalUrl.split('/')[2]}`)
// //   axios.get(`${req.originalUrl}`)
// //     .then(res => res.data)
// //     .then((data) => {
// //       res.send(data);
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //       res.send();
// //     });
// // });

// //kyle
// app.use('/q-and-a', (req, res) => {
//   axios.get(`http://q-and-a:3004${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

//zack
// app.use('/recommendations', (req, res) => {
//   axios.get(`http://recommendations:3005${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});