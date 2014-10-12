var myInterval;

var EstimoteBeacons = EstimoteBeacons;

function startRangingBeaconsInRegionCallback() {
  console.log('Start ranging beacons...');

  // Every now and then get the list of beacons in range
  myInterval = setInterval(function() {
    EstimoteBeacons.getBeacons(function(beacons) {
      console.log('Getting beacons...');
      for(var i = 0, l = beacons.length; i < l; i++) {
        var beacon = beacons[i];
        // beacon contains major, minor, rssi, macAddress, measuredPower, etc.
        console.log('beacon:', beacon);
      }
    });
  }, 3000);
}

var app = {
  bindEvents: function() {
    console.log('events bound!');
    window.addEventListener('load', this.onDeviceReady);
  },

  initialize: function() {
    console.log('initialising!');
    this.bindEvents();
  },

  onDeviceReady: function() {
    console.log('Kick it, Kick it real good!');
    document.removeEventListener('deviceready', app.onDeviceReady);

    if(!EstimoteBeacons) return;
    console.log('Estimoooooooooote!');

    document.addEventListener('pause', app.onPause);
    document.addEventListener('resume', app.onResume);

    EstimoteBeacons.startRangingBeaconsInRegion(startRangingBeaconsInRegionCallback);
  },

  onPause: function() {
    EstimoteBeacons.stopRangingBeaconsInRegion(function() {
      console.log('Stop ranging beacons...');
    });
    clearInterval(myInterval);
  },

  onResume: function() {
    EstimoteBeacons.startRangingBeaconsInRegion(startRangingBeaconsInRegionCallback);
  }
};

app.initialize();