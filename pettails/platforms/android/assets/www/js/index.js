var myInterval;
var timer = 3000;
function startRangingBeaconsInRegionCallback() {
  console.log('Start ranging beacons...');

  // Every now and then get the list of beacons in range
  myInterval = setInterval(function() {
    EstimoteBeacons.getBeacons(function(beacons) {
      console.log(beacons[0].toString());
      for (var property in beacons[0]) {
            if (beacons[0].hasOwnProperty(property)) {
                console.log(property+','+beacons[0][property]);
            }
        }
      // for(var i = 0, l = beacons.length; i < l; i++) {
      //   var beacon = beacons[i];
      //   // beacon contains major, minor, rssi, macAddress, measuredPower, etc.
      //   console.log('beacon:', beacon);
      // }
    });
  }, timer);
}

var EBeacons;

var app = {
  bindEvents: function() {
    window.addEventListener('load', this.onDeviceReady);
  },

  initialize: function() {
    this.bindEvents();
  },

  onDeviceReady: function() {

//    EBeacons = cordova.require('cordova/plugin/com.oracle.mx.ux.cordova.estimotebeacons.EstimoteBeacons');
    console.log('Kick it, Kick it real good!');
    window.removeEventListener('load', app.onDeviceReady);

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