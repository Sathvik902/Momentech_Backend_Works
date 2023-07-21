const express = require('express');
const router = express.Router();
const {
  getAccessToken,
  linkUserToAccount,
  vehiclesFeatures,
  SpecificValue,
  Updated_Info,
} = require('../auth/Functions');
router.get('/token', async (req, res) => {
  try {
    accessToken = await getAccessToken();
    userId = 'user1234';
    res.status(200).json({ Access_Token: accessToken });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

router.get('/features', async (req, res) => {
  try {
    accessToken = await getAccessToken();

    userId = 'user1234';

    await vehiclesFeatures(accessToken, userId);

    res.status(200).json({ message: 'Success!' });
  } catch (e) {
    console.log(e);
  }
});

router.get('/link', async (req, res) => {
  accessToken = await getAccessToken();

  userId = 'user1234';
  await linkUserToAccount(accessToken, userId);
  res.status(200).json({ message: 'Success!' });
});

router.get('/id', async (req, res) => {
  accessToken = await getAccessToken();

  userId = 'user1234';
  await SpecificValue(accessToken, userId);
  res.status(200).json({ message: 'Success!' });
});

router.get('/updated', async (req, res) => {
  accessToken = await getAccessToken();
  userId = 'user1234';
  await Updated_Info(accessToken, userId);
});

module.exports = router;
