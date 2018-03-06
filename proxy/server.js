const express = require('express')
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 1337;


// app.use(morgan('dev'));
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/listings/:listing_id', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});