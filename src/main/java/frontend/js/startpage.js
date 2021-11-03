// Below code stores time when get request was made as 'lastExecution' and prevents to make GET request more often than delay value.
const delay = 6000; // anti-rebound
let lastExecutedCarsGetRequest = localStorage.getItem('lastExecutionCars');
let lastExecutedFeaturesGetRequest = localStorage.getItem('lastExecutionFeatures');
let x = '';
let y = '';
let CARS = [];
var frontEndFeaturesArray = []
let FEATURES = [];

function loadFeaturesFromDatabase() {
    FEATURES = y.responseJSON;
    lastExecutedFeaturesGetRequest = Number(localStorage.getItem('lastExecutionFeatures'));
    console.log('FEATURES loaded from database')
}
function pushFeaturesToCars() {
    for (let cars of CARS) {
        for (let x of FEATURES) {
            if (cars.id == x.carId) {
                cars.features.push(x.title)
            }
        }
    }
}
function loadFeaturesFromLocalStorage() {
    try {
        FEATURES = JSON.parse(localStorage.getItem('carsFeatures'));
        console.log('FEATURES loaded from local storage')
        pushFeaturesToCars();
    } catch (e2) {
        console.log(e2)
    }

}

function loadCarsFromDatabase() {
    CARS = x.responseJSON;
    lastExecutedCarsGetRequest = Number(localStorage.getItem('lastExecutionCars'));
    console.log('CARS loaded from database');
}
function loadCarsFromLocalStorage() {
    try {
        CARS = JSON.parse(localStorage.getItem('carsData'));
        console.log('CARS loaded from local storage');
    } catch (e1) {
        console.log(e1)
    }

}


function canExecuteCarsGetRequest() {
    if ((Number(lastExecutedCarsGetRequest) + delay) < Date.now() || lastExecutedCarsGetRequest == null) {
        return true;
    } else {
        return false;
    }
}
function canExecuteFeaturesGetRequest() {
    if ((Number(lastExecutedFeaturesGetRequest) + delay) < Date.now() || lastExecutedFeaturesGetRequest == null) {
        return true;
    } else {
        return false;
    }
}

//urls":
// http://ec2-3-144-212-159.us-east-2.compute.amazonaws.com:8080/api/v1/cars/features
// http://localhost:8080/api/v1/cars/features
function getFeaturesFromServer() {
    if (canExecuteFeaturesGetRequest()) {
        y = $.getJSON('http://localhost:8080/api/v1/cars/features', function (data) {
        })
            .done(function () {
                localStorage.setItem('carsFeatures', y.responseText);
                localStorage.setItem('lastExecutionFeatures', String(Date.now()));
                console.log("FEATURES GET successful")
                loadFeaturesFromDatabase();
                getCarsFromServer();
                
            })
            .fail(function () {
                console.log("error trying to GET FEATURES")
                loadFeaturesFromLocalStorage();
                loadCarsFromLocalStorage();
                pushFeaturesToCars();
                printCars()
            });
    } else {
        loadFeaturesFromLocalStorage();
        loadCarsFromLocalStorage();
        pushFeaturesToCars();
        printCars()

    }

}
//urls":
// http://ec2-3-144-212-159.us-east-2.compute.amazonaws.com:8080/api/v1/cars
// http://localhost:8080/api/v1/cars

function getCarsFromServer() {
    if (canExecuteCarsGetRequest()) {
        x = $.getJSON('http://localhost:8080/api/v1/cars', function (data) {
        })
            .done(function () {
                localStorage.setItem('carsData', x.responseText);
                localStorage.setItem('lastExecutionCars', String(Date.now()));
                console.log("CARS GET successful");
                loadCarsFromDatabase();
                pushFeaturesToCars();
                printCars()
            })
            .fail(function () {
                console.log("error while trying to GET CARS")
                loadCarsFromLocalStorage();
                pushFeaturesToCars();
                printCars()
            });


    } else {
        loadCarsFromLocalStorage();
        pushFeaturesToCars();
        printCars()
    }
}
getFeaturesFromServer();