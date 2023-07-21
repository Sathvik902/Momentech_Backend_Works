const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {
  Updated_Info,
  SpecificValue,
  vehiclesFeatures,
  FetchUser,
  linkUserToAccount,
  getAccessToken,
} = require('./auth/Functions');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/user');
const vehicleRoutes = require('./routes/vehicle');

app.use('/Auth', userRoutes);
app.use('/Vehicles', vehicleRoutes);

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
