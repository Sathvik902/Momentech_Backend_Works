const axios = require('axios');
const request = require('request');

async function getAccessToken() {
  const tokenEndpoint = 'https://oauth.sandbox.enode.io/oauth2/token'; // Replace with the actual token endpoint URL
  const clientId = '2ab48c27-0a67-4124-8e2b-c51f6b2892e5';
  const clientSecret = 'a66e1fd389159653a71b8a954a9c2196d1593630';
  const redirectUri = 'http://localhost:5000'; // Replace with your redirect URI

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      tokenEndpoint,
      {
        grant_type: 'client_credentials',
        redirect_uri: redirectUri
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`
        }
      }
    );

    const accessToken = response.data.access_token;
    // console.log(response.data);
    console.log('Access Token:', accessToken);
    console.log("-----------------------------------------------------------------------------------")
    return accessToken;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Failed to get access token');
  }
}

async function linkUserToAccount(accessToken, userName) {
    var options = {
        'method': 'POST',
        'url': `https://enode-api.sandbox.enode.io/users/${userName}/link`,
        'headers': {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "vendorType": "vehicle"
        })
    
    };
    
    request(options, function ( response) {
        
        try{
            const pData = JSON.parse(response.body)
            // console.log(response.body);
            console.log(pData.linkUrl);
            
            // const Link = pData.linkUrl;
            // return Link;
            // response.status(200).json({Links:Link})
        }
        catch(error){
            console.log(error);
        }
        
    });
}


async function FetchUser(accessToken, userName) {

// var request = require('request');
var options = {
    'method': 'GET',
    'url': 'https://enode-api.sandbox.enode.io/me',
    'headers': {
        'Authorization': `Bearer ${accessToken}`,
        'Enode-User-Id': `${userName}`
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    console.log("-----------------------------------------------------------------------------------")
    return response.body;
    
});
}


const pdata={};
async function vehiclesFeatures(accessToken,userName){
    // var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://enode-api.sandbox.enode.io/vehicles',
        'headers': {
            'Authorization': `Bearer ${accessToken}`,
            'Enode-User-Id': `${userName}`
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        const pdata = JSON.parse(response.body);
        // document.write(pdata[1].id);
        // console.log(String(pdata[1].id));
        console.log(response.body);
        return pdata;
    });
}

async function SpecificValue(accessToken,userId)
{
var options = {
    'method': 'GET',
    'url': `https://enode-api.sandbox.enode.io/vehicles/c1670241-b4a6-47b2-aadc-9f9c1f1e22b0`,
    'headers': {
        'Authorization': `Bearer ${accessToken}`,
        'Enode-User-Id': `${userId}`
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    // const pData = JSON.parse(response.body);

    console.log(response.body);
    // console.log(pData.chargeState);
});

}


async function Updated_Info(accessToken,userId)
{
var options = {
    'method': 'GET',
    'url': 'https://enode-api.sandbox.enode.io/vehicles/c1670241-b4a6-47b2-aadc-9f9c1f1e22b0/charge-state',
    'headers': {
        'Authorization': `Bearer ${accessToken}`,
        'Enode-User-Id': `${userId}`
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    const pData = JSON.parse(response.body)
    console.log(pData);
});

}






module.exports = {
  getAccessToken,linkUserToAccount,FetchUser,vehiclesFeatures,SpecificValue,Updated_Info
};
