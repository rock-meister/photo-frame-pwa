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

let def_fancybox_options = {
  fullScreen: {
    autoStart: true
  },
  image: {
    preload: true
  },
  loop: true,
  slideShow: {
    autoStart: true,
    speed: 3000
  },
  transitionEffect: 'fade',
  transitionDuration: 1366,
  infobar: false,
  buttons: [
    "zoom",
    //"share",
    "slideShow",
    "fullScreen",
    //"download",
    "thumbs",
    "close"
  ],
  // Automatically advance after 3s to next photo.
  // Display the contents figcaption element as the caption of an image
  // TODO not sure how function will get in and out of JSON string
  /*
  caption: function(instance, item) {
    return $(this).find('figcaption').html();
  },
  */
  thumbs: {
    autoStart: false
  },
  //  spinnerTpl: '<div hidden class="fancybox-loading"></div>',
  spinnerTpl: "",
  selector: '[data-fancybox="gallery"]',
};

// holds the current changes to the fancybox_options
var fancybox_options = def_fancybox_options;
// Save the settings.
function saveSettings() {
  window.localStorage.setItem('fancybox_options', JSON.stringify(fancybox_options));
  console.log('options:saveSettings');
}

// Load the settings.
function loadSettings() {
  console.log('options:loadSettings');
  var fancybox_options_json = window.localStorage.getItem('fancybox_options');
  if (fancybox_options_json)
    fancybox_options = JSON.parse(fancybox_options_json);
  else
    fancybox_options = def_fancybox_options;
}

function getFancyboxOptions() {
  return fancybox_options;
}