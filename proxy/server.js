const express = require('express')
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;


// app.use(morgan('dev'));
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/:listing_id', express.static(path.join(__dirname, 'public')));
app.use('/recommendations', (req, res) => {
  console.log(req.originalUrl);
  axios.get(`http://recommendations:3005${req.originalUrl}`)
    .then(res => res.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});