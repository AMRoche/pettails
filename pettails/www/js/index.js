var myInterval;
var timer = 500;
var newTagData = [];
var oldTagData = [];
function startRangingBeaconsInRegionCallback() {
  console.log('Start ranging beacons...');

  // Every now and then get the list of beacons in range
  myInterval = setInterval(function() {
    EstimoteBeacons.getBeacons(function(beacons) {
      oldTagData = newTagData;
      newTagData = beacons.sort(function(a, b) {
          if (a.distance < b.distance) {
            return -1;
          }
          if (a.distance > b.distance) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      if(document.getElementById('rangetable')!==null)
      {
        createTable(document.getElementById('rangetable'));
      }
    });
  }, timer);
}

var createTable = function(element){
    var a;
    var toGoTo = newTagData.length;

    for(var j = 0; j < newTagData.length; j++)
    {
        for(var i = 0; i < oldTagData.length; i++)
        {
            if(oldTagData[i]['proximityUUID'] == newTagData[j]['proximityUUID'] )
            {
                newTagData[j]['name'] = oldTagData[j]['name'];
                newTagData[j]['animal'] = oldTagData[j]['animal'];
            }
        }
        if(newTagData[j].hasOwnProperty('name') == false)
        {
            var nAnimal = dummyPets[Math.floor(Math.random()*(dummyPets.length-1))];
            newTagData[j]['name'] = nAnimal['name'];
            newTagData[j]['animal'] = nAnimal['animal'];
        }
    }

    var d = document.createElement('ul');
    for(var k = 0; k < newTagData.length; k++)
    {
        var tr = document.createElement('tbody');

        var prettyNames = ['Name : ', 'Animal : ', 'Distance : ','Signal Strength : '];
        var params = ['name','animal','distance','rssi'];
        var distArr = (newTagData[k]['distance']+'').split('.');
        newTagData[k]['distance'] = distArr[0]+'.'+distArr[1].substring(0,2);

        for(var i = 0; i < params.length; i++)
        {
            var tabler = document.createElement('tr');
            var td = document.createElement('td');
            var text = document.createTextNode(prettyNames[i]);
            td.appendChild(text);
            tabler.appendChild(td);
            td = document.createElement('td');
            text = document.createTextNode(newTagData[k][params[i]]);
            td.appendChild(text);
            tabler.appendChild(td);
            tr.appendChild(tabler);
        }
            // var tabler = document.createElement('tr');
            // var td = document.createElement('td');
            // var text = document.createTextNode('Enable Audio Signal');
            // td.appendChild(text);
            // tabler.appendChild(td);
            // td = document.createElement('td');
            // text = document.createTextNode('<) ) )');
            // td.appendChild(text);
            // tabler.appendChild(td);
            // tr.appendChild(tabler);

            var t = document.createElement('table');
            var thead = document.createElement('thead');
            thead.innerHTML =  '<tr><th colspan="2" class="centered">'+newTagData[k]['name']+' the '+newTagData[k]['animal']+'</th></tr>';
            t.appendChild(thead);
            t.appendChild(tr);
            var li = document.createElement('li');

        for(var i = 0; i < User['pets']; i++)
        {
            console.log(newTagData[k]['name'] +','+ User['pets']['name']);
            if(newTagData[k]['name'] == User['pets']['name'])
            {
                t.className = 'highlight';
            }
        }

        li.appendChild(t);
        d.appendChild(li);
    }
    console.log(d.innerHTML);
    element.innerHTML = "";
    element.appendChild(d);
};

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
    firstName: 'Alex',
    lastName: 'Roche',
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