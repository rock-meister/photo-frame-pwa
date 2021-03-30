// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This file contains the configuration options for this sample app.

function isHeroku() {
  return process.env.FQDN && ~process.env.FQDN.indexOf("heroku") ? true : false;
}

function isAzure() {
  return process.env.WEBSITE_HOSTNAME && ~process.env.WEBSITE_HOSTNAME.indexOf("azure") ? true : false;
}

function getWebsiteHostname() {
  if (isAzure()) {
    return process.env.WEBSITE_HOSTNAME;
  }
  return process.env.WEBSITE_HOSTNAME || '127.0.0.1';
}

function getPort() {
  return process.env.PORT;
}

function getoAuthCallbackUrl() {
  if (isHeroku() || isAzure()) {
    if (getPort() && getPort() != 80) {
      return 'https://' + getWebsiteHostname() + ':' + getPort() + '/auth/google/callback';
    } else {
      return 'https://' + getWebsiteHostname() + '/auth/google/callback';
    }
  } else { // localhost runs on http
    if (getPort() && getPort() != 80) {
      return 'http://' + getWebsiteHostname() + ':' + getPort() + '/auth/google/callback';
    } else {
      return 'http://' + getWebsiteHostname() + '/auth/google/callback';
    }
  }
}

const config = {};

// The OAuth client ID from the Google Developers console.
config.oAuthClientID = process.env.PHOTO_FRAME_PWA_GAPI_CLIENT_ID;

// The OAuth client secret from the Google Developers console.
config.oAuthclientSecret = process.env.PHOTO_FRAME_PWA_GAPI_CLIENT_SECRET;

config.port = getPort();
console.log('config.port', config.port);
config.oAuthCallbackUrl = getoAuthCallbackUrl();
console.log('config.oAuthCallbackUrl', config.oAuthCallbackUrl);

// The scopes to request. The app requires the photoslibrary.readonly and
// plus.me scopes.
config.scopes = [
  'https://www.googleapis.com/auth/photoslibrary.readonly',
  'profile',
];

// The number of photos to load for search requests.
config.photosToLoad = 150;

// The page size to use for search requests. 100 is reccommended.
config.searchPageSize = 100;

// The page size to use for the listing albums request. 50 is reccommended.
config.albumPageSize = 50;

// The API end point to use. Do not change.
config.apiEndpoint = 'https://photoslibrary.googleapis.com';

module.exports = config;
