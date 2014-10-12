var myInterval;
var timer = 3000;
var tagData = [];
function startRangingBeaconsInRegionCallback() {
  console.log('Start ranging beacons...');

  // Every now and then get the list of beacons in range
  myInterval = setInterval(function() {
    EstimoteBeacons.getBeacons(function(beacons) {
      tagData = beacons;
    });
  }, timer);
}

var dummyPets = [
    {
        name:'George',
        animal:'Tortoise',
    },
    {
        name:'Tim',
        animal:'Dog',
    },
    {
        name:'Percy',
        animal:'Fish'
    },
    {
        name:'Toby',
        animal:'Dog'
    },
    {
        name: 'Amy',
        animal: 'Duck'
    },
    {
        name: 'Stuart',
        animal: 'Lizard'
    },
    {
        name: 'Sir Hisss',
        animal: 'Snake'
    }
];

var User = {
    firstName: Alex,
    lastName: Roche,
    pets: [
        dummyPets[3],
        dummyPets[6]
    ],
    username: 'AMRoche',
    password: 'test'
};

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