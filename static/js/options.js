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


function setTransitionDuration(value) {
  fancybox_options.transitionDuration = value;
  console.log('options:setTransitionDuration = ', fancybox_options.transitionDuration);
  document.getElementById("fancybox-transitionDuration-output").innerHTML  =  value;
  //$().fancybox(fancybox_options);
}

function setSlideshowSpeed(value) {
  fancybox_options.slideShow.speed = value;
  console.log('options:setSlideshowSpeed = ', fancybox_options.slideShow.speed);
  document.getElementById("fancybox-slideshow-speed-output").innerHTML  =  value;
  //$().fancybox(fancybox_options);
}

function setFancyboxOptionsFromHtml() {
  fancybox_options = def_fancybox_options;
  // Selector hard coded
  fancybox_options.selector = '[data-fancybox="gallery"]'
  // Loop
  console.log('options:setFancyboxOptionsFromHtml:loop checked=', document.getElementById("fancybox-loop").checked);
  console.log('options:setFancyboxOptionsFromHtml:loop value=', document.getElementById("fancybox-loop").value);
  fancybox_options.loop = document.getElementById("fancybox-loop").checked;
  console.log('options:setFancyboxOptionsFromHtml:loop=', fancybox_options.loop)
  // Transition Duration
  fancybox_options.transitionDuration = document.getElementById("fancybox-transitionDuration").value;
  // Transition Effect
  fancybox_options.transitionEffect = document.getElementById("fancybox-transitionEffect").value;
  // Buttons
  console.log('options:setFancyboxOptionsFromHtml:buttons', fancybox_options.buttons);
  var selected = [];
  $('#fancybox_buttons input:checked').each(function() {
    selected.push($(this).attr('value'));
  });
  fancybox_options.buttons = selected;
  console.log('options:setFancyboxOptionsFromHtml:buttons', fancybox_options.buttons);
  // fancybox-fullscreen-autostart
  fancybox_options.fullScreen.autoStart = document.getElementById("fancybox-fullscreen-autostart").checked;
  // fancybox-image-preload
  fancybox_options.image.preload = document.getElementById("fancybox-image-preload").checked;
  // fancybox-infobar
  fancybox_options.infobar = document.getElementById("fancybox-infobar").checked;
  // fancybox-slideshow-autostart
  fancybox_options.slideShow.autoStart = document.getElementById("fancybox-slideshow-autostart").checked;
  // fancybox-slideshow-speed
  fancybox_options.slideShow.speed = document.getElementById("fancybox-slideshow-speed").value;
  console.log('options:setFancyboxOptions:fancybox_options=', fancybox_options);
  //$().fancybox('options:setFancyboxOptions:fancybox_options=',fancybox_options);
}

function handleSwitch(id, state) {
  if (state) {
    document.getElementById(id).parentNode.MaterialSwitch.on();
  } else {
    document.getElementById(id).parentNode.MaterialSwitch.off();
  }
}

function handleCheckbox(id, checked) {
  if (checked) {
    document.getElementById(id).parentNode.MaterialCheckbox.check();
  } else {
    document.getElementById(id).parentNode.MaterialCheckbox.uncheck();
  }
}

function setHtmlFromFancyboxOptions() {
  // Loop
  handleSwitch("fancybox-loop", fancybox_options.loop);
  
  // Transition Duration
  document.getElementById("fancybox-transitionDuration").value = fancybox_options.transitionDuration;
  document.getElementById("fancybox-transitionDuration-output").value = fancybox_options.transitionDuration;
  // Transition Effect
  document.getElementById("fancybox-transitionEffect").value = fancybox_options.transitionEffect;
  // Buttons
  $('#fancybox_buttons input').each(function() {
    // ['a', 'b', 'c'].includes('b')
    handleCheckbox($(this).attr('id'), fancybox_options.buttons.includes($(this).attr('value')));
  });
  
  // fancybox-fullscreen-autostart
  handleSwitch("fancybox-fullscreen-autostart", fancybox_options.fullScreen.autoStart);
  // fancybox-image-preload
  handleSwitch("fancybox-image-preload", fancybox_options.image.preload);
  // fancybox-infobar
  handleSwitch("fancybox-infobar", fancybox_options.infobar);
  // fancybox-slideshow-autostart
  handleSwitch("fancybox-slideshow-autostart", fancybox_options.slideShow.autoStart);
  // fancybox-slideshow-speed
  document.getElementById("fancybox-slideshow-speed").value = fancybox_options.slideShow.speed;
  document.getElementById("fancybox-slideshow-speed-output").value = fancybox_options.slideShow.speed;
}


$(document).ready(() => {
  // load the current settings
  loadSettings();
  setHtmlFromFancyboxOptions();
  //setTransitionDuration(fancybox_options.transitionDuration);
  // When the options form is submitted, save settings.
  $('#pfpwa-options').on('submit', (e) => {
    e.preventDefault();
    // showLoadingDialog();  //TODO:  How to show a saving dialog?
    setFancyboxOptionsFromHtml();
    saveSettings();
  });
});