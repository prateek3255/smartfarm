// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
      })

      .state('CropAllotment', {
        url: '/CropAllotment',
        templateUrl: 'templates/CropAllotment.html',
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/register');
  })
  .run(function ($ionicPlatform,$ionicPopup) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
    $ionicPlatform.registerBackButtonAction(function (event) {
			if (true) {
				$ionicPopup.confirm({
					title: 'Exit',
					template: 'Are you sure you want to exit?',
					cancelText: 'No',
					cancelType: 'button-positive',
					okText: 'Yes',
					okType: 'button-light'
				}).then(function (res) {
					if (res) {
						ionic.Platform.exitApp();
					}
					else {
						$ionicHistory.goBack();
					}
				})
			}
		}, 100);
  }).controller('regCtrl', regCtrl)
  .controller('cropCtrl', cropCtrl)
  .factory('cropService', cropService)

function cropService() {
  return {
    data: {}
  };
}
function cropCtrl(cropService, $firebaseObject, $scope, $ionicPopup,$http) {
  var crop = this;
  crop.allotMe = true;
  crop.allotId = Math.round(Math.random() * 10000);
  
  localforage.getItem("person", function (err, data) {
    crop.person = data;
    console.log(data);
    if (crop.person.alloted != "")
      crop.allotMe = false;
    crop.detail = data.data;
     })
  crop.images = {
    'Bajra': 'img\\bajra.jpg',
    'Barley': 'img\\barley.jpg',
    'Jawar': 'img\\jawar.jpg',
    'Maize': 'img\\maize.jpg',
    'Pulses': 'img\\pulses.jpg',
    'Wheat': 'img\\wheat.jpg',
    'Mustard': 'img\\mustard.jpg'
  }
  crop.factor = {
    'Bajra': 1.156,
    'Barley': 1.48,
    'Jawar': 0.954,
    'Maize': 2.476,
    'Pulses': 0.694,
    'Wheat': 3.14,
    'Mustard': 1.145

  }
  var nameRef = firebase.database().ref("crop");
  var obj = $firebaseObject(nameRef);
  obj.$loaded().then(function () {
    max = 0;
    j = 0;
    for (i = 0; i < crop.detail.crop.length; i++) {
      if (obj[crop.detail.crop[i]] > max) {
        max = obj[crop.detail.crop[i]];
        j = i;
      }
    }
    crop.index = j;

    console.log(crop.images[crop.detail.crop[crop.index]])
  })


  crop.allot = function () {
    obj[crop.detail.crop[crop.index]] =Math.floor(obj[crop.detail.crop[crop.index]] - crop.person.area * crop.factor[crop.detail.crop[crop.index]]) ;
    // console.log(obj[crop.detail.crop[crop.index]] - crop.person.area * crop.factor[crop.detail.crop[crop.index]])
    obj.$save();
    var userRef = firebase.database().ref("users/"+crop.person.aadhar);
    user=$firebaseObject(userRef);
    user.$loaded().then(function(){
        user.alloted=crop.detail.crop[crop.index];
        user.$save();
    })
    crop.person.alloted=crop.detail.crop[crop.index];
    localforage.setItem("person",crop.person);
    var promise=$http.post("https://garlicsms.com/api/send",{
      "key": "$2y$10$Iy7QFS7em2dNUp.XbPLdnurq4z8veiuh231s0T8Sl1FEquOd7G/fu",
      "title": "Confiramtion sms",
      "message" : crop.detail.crop[crop.index]+" crop is alloted to you and you will be further contacted by our representative. Your allotment ID is "+crop.allotId,
      "destination_number" : crop.person.contact
    },{ headers:{"Content-Type": "application/json"}}).then(function(result){
        console.log(result)
    }).catch(function(err){
        console.log(err)
    })
    crop.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Congratulations!',
        template: 'The selected crop is alloted to you and you will be further contacted. Your allotment ID is' + crop.allotId
      });
    }
    crop.showAlert();
    crop.allotMe = false;

  }
}
function regCtrl($firebaseObject, cropService, $state) {
  var reg = this;

  var districts = {
    Ajmer: {
      soil: 'Sierozems',
      rain: '50cm-70cm',
      crop: ['Bajra', 'Jawar', 'Pulses', 'Wheat'],
      texture: 'Sandy Loam',
      color: 'Yellowish Brown',
    },
    Pali: {
      soil: 'Sierozems',
      rain: '50cm-70cm',
      crop: ['Bajra', 'Jawar', 'Pulses', 'Wheat'],
      texture: 'Sandy Loam',
      color: 'Yellowish Brown',
    },
    Jaipur: {
      soil: 'Sierozems',
      rain: '50cm-70cm',
      crop: ['Bajra', 'Jawar', 'Pulses', 'Wheat'],
      texture: 'Sandy Loam',
      color: 'Yellowish Brown',
    },
    Jalore: {
      soil: 'Sierozems',
      rain: '50cm-70cm',
      crop: ['Bajra', 'Jawar', 'Pulses', 'Wheat'],
      texture: 'Sandy Loam',
      color: 'Yellowish Brown',
    },
    Barmer: {
      soil: 'Desert Soil',
      rain: 'Less than 400mm',
      crop: ['Barley', 'Wheat'],
      texture: 'Sandy to Sandy loam',
      color: 'Pale Brown',
    },
    Jodhpur: {
      soil: 'Desert Soil',
      rain: 'Less than 400mm',
      crop: ['Barley', 'Wheat'],
      texture: 'Sandy to Sandy loam',
      color: 'Pale Brown',
    },
    Nagaur: {
      soil: 'Desert Soil',
      rain: 'Less than 400mm',
      crop: ['Barley', 'Wheat'],
      texture: 'Sandy to Sandy loam',
      color: 'Pale Brown',
    },
    Hanumangarh: {
      soil: 'Desert Soil',
      rain: 'Less than 400mm',
      crop: ['Barley', 'Wheat'],
      texture: 'Sandy to Sandy loam',
      color: 'Pale Brown',
    },
    SriGanganagar: {
      soil: 'Desert Soil',
      rain: 'Less than 400mm',
      crop: ['Barley', 'Wheat'],
      texture: 'Sandy to Sandy loam',
      color: 'Pale Brown',
    },
    Churu: {
      soil: 'Desert Soil',
      rain: 'Less than 400mm',
      crop: ['Barley', 'Wheat'],
      texture: 'Sandy to Sandy loam',
      color: 'Pale Brown',
    },
    Jhunjhunu: {
      soil: 'Desert Soil',
      rain: 'Less than 400mm',
      crop: ['Barley', 'Wheat'],
      texture: 'Sandy to Sandy loam',
      color: 'Pale Brown',
    },
    Sikar: {
      soil: 'Desert Soil',
      rain: 'Less than 400mm',
      crop: ['Barley', 'Wheat'],
      texture: 'Sandy to Sandy loam',
      color: 'Pale Brown',
    },
    Bikaner: {
      soil: 'Dunes and Associated Soil',
      rain: 'Less than 400mm',
      crop: ['Bajra', 'Pulses'],
      texture: 'Loamy fine sand',
      color: 'Yellowish Brown',
    },
    Jaisalmer: {
      soil: 'Dunes and Associated Soil',
      rain: 'Less than 400mm',
      crop: ['Bajra', 'Pulses'],
      texture: 'Loamy fine sand',
      color: 'Yellowish Brown',
    },
    Tonk: {
      soil: 'Brown Soil',
      rain: '50cm-75cm',
      crop: ['Wheat', 'Barley', 'Mustard'],
      texture: 'Sandy loam to Sandy clay',
      color: 'Yellowish Brown',
    },
    Bundi: {
      soil: 'Brown Soil',
      rain: '50cm-75cm',
      crop: ['Wheat', 'Barley', 'Mustard'],
      texture: 'Sandy loam to Sandy clay',
      color: 'Yellowish Brown',
    },
    SawaiMadhopur: {
      soil: 'Brown Soil',
      rain: '50cm-75cm',
      crop: ['Wheat', 'Barley', 'Mustard'],
      texture: 'Sandy loam to Sandy clay',
      color: 'Yellowish Brown',
    },
    Udaipur: {
      soil: 'Brown Soil',
      rain: '50cm-75cm',
      crop: ['Wheat', 'Barley', 'Mustard'],
      texture: 'Sandy loam to Sandy clay',
      color: 'Yellowish Brown',
    },
    Chittorgarh: {
      soil: 'Brown Soil',
      rain: '50cm-75cm',
      crop: ['Wheat', 'Barley', 'Mustard'],
      texture: 'Sandy loam to Sandy clay',
      color: 'Yellowish Brown',
    },
    Bhilwara: {
      soil: 'Brown Soil',
      rain: '50cm-75cm',
      crop: ['Wheat', 'Barley', 'Mustard'],
      texture: 'Sandy loam to Sandy clay',
      color: 'Yellowish Brown',
    },
    Dungarpur: {
      soil: 'Red Loams',
      rain: '70cm-100cm',
      crop: ['Wheat', 'Barley', 'Maize'],
      texture: 'Sandy loam to sandy',
      color: 'Reddish in colour',
    },
    Banswara: {
      soil: 'Red Loams',
      rain: '70cm-100cm',
      crop: ['Wheat', 'Barley', 'Maize'],
      texture: 'Sandy loam to sandy',
      color: 'Reddish in colour',
    },
    Sirohi: {
      soil: 'Hill Soils (Lithosols)',
      rain: '70cm-100cm',
      crop: ['Wheat', 'Barley', 'Maize'],
      texture: 'Sandy loam to clay',
      color: 'Reddish to yellowish red',
    },
    Rajsamand: {
      soil: 'Hill Soils (Lithosols)',
      rain: '70cm-100cm',
      crop: ['Wheat', 'Barley', 'Maize'],
      texture: 'Sandy loam to clay',
      color: 'Reddish to yellowish red',
    },
    Kota: {
      soil: 'Alluvial Soils',
      rain: '600mm-700cm',
      crop: ['Wheat', 'Pulses', 'Maize'],
      texture: 'Sandy to silty loam',
      color: 'Reddish brown',
    }
  }
  reg.lod = ['Ajmer',
    'Alwar',
    'Banswara',
    'Baran',
    'Barmer',
    'Bharatpur',
    'Bhilwara',
    'Bikaner',
    'Bundi',
    'Chittorgarh',
    'Churu',
    'Dausa',
    'Dungarpur',
    'Hanumangarh',
    'Jaipur',
    'Jaisalmer',
    'Jalore',
    'Jhalawar',
    'Jhunjhunu',
    'Jodhpur',
    'Karauli',
    'Kota',
    'Nagaur',
    'Pali',
    'Pratapgarh',
    'Rajsamand',
    'SawaiMadhopur',
    'Sikar',
    'Sirohi',
    'SriGanganagar',
    'Tonk',
    'Udaipur'];
  // cropService.data=districts[reg.district];
  localforage.getItem("person", function (err, data) {
    if (data != null) {
      $state.go("CropAllotment");
    }
    // console.log(data,"get")
  });
  reg.submit = function () {
    var nameRef = firebase.database().ref("users/"+reg.aadhar);
    var obj = $firebaseObject(nameRef);
    obj.name = reg.name;
    obj.contact = reg.contact;
    obj.area = reg.area;
    obj.village = reg.village;
    obj.district = reg.district;
    obj.state = "Rajasthan";
    obj.alloted = "";
    console.log(districts[reg.district])

    localforage.setItem("person", {
      'name': reg.name,
      'aadhar':reg.aadhar,
      'contact': reg.contact,
      'area': reg.area,
      'village': reg.village,
      'district': reg.district,
      'state': "Rajasthan",
      'alloted': "",
      'data': districts[reg.district]
    }, function (err) {
      obj.$save().then(function () {
        $state.go("CropAllotment");
        
      });
    })




  }



}
