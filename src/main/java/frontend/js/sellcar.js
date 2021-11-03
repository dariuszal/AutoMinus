//FUNCTIONS TO RUN AFTER PAGE LOADED
let selectedMake = document.getElementById("make-select");
let modelInput = document.getElementById("model-input");
let yearInput = document.getElementById("year-input");
let mileageInput = document.getElementById("mileage-input");
let powerInput = document.getElementById("power-input");
let fuelTypeInput = document.getElementById("fuel-type");
let transmissionTypeInput = document.getElementById("transmission-type");
let priceInput = document.getElementById("price-input");
let imageUrlInput = document.getElementById("url-input");
let sellForm = document.getElementById("sell-form");
let carouselInner = document.getElementById("carouselInner");
let allFeaturesDiv = document.getElementById('all-features');

modelInput.disabled = true;

addFeaturesToHTML();

function validateSelect() {
    if (selectedMake.value != 0) {
        selectedMake.classList.remove("select-validation")
    }
    if (fuelTypeInput.value != 0) {
        fuelTypeInput.classList.remove("select-validation")
    }
    if (transmissionTypeInput.value != 0) {
        transmissionTypeInput.classList.remove("select-validation")
    }
}

function formValid() {
    let valid = true;

    sellForm.classList.add('validation-class');

    var d = new Date();
    var n = d.getFullYear();

    //Make
    if (selectedMake.value == 0) {
        valid = false;
        selectedMake.classList.add('select-validation')
    }
    //Model
    if (modelInput.value == 0) {
        valid = false;
    }
    //Year
    if (Number(yearInput.value) < 1900 || Number(yearInput.value) > n) {
        valid = false;
    }
    //Mileage
    if (Number(mileageInput.value) < 1 || Number(mileageInput.value) > 3000000) {
        valid = false;
    }
    //Power 
    if (Number(powerInput.value) < 1 || Number(powerInput.value) > 1500) {
        valid = false;
    }
    //Fuel-Type
    if (fuelTypeInput.value == 0) {
        valid = false;
        fuelTypeInput.classList.add('select-validation');
    }
    //Transmission
    if (transmissionTypeInput.value == 0) {
        valid = false;
        transmissionTypeInput.classList.add('select-validation')
    }
    //Price
    if (Number(priceInput.value) < 1 || Number(priceInput.value) > 5000000) {
        valid = false;
    }
    //Image URL
    if (imageUrlInput.value.length < 1 || imageUrlInput.value.length > 300) {
        valid = false;
    }
    return valid;

}

function createButton() {

    if (formValid()) {

        //Capturing input data.
        let make = selectedMake.value;
        let model = modelInput.value;
        let year = Number(yearInput.value);
        let mileage = Number(mileageInput.value);
        let power = Number(powerInput.value);
        let fuelType = fuelTypeInput.value;
        let transmissionType = transmissionTypeInput.value;
        let price = Number(priceInput.value);
        let imageUrl = imageUrlInput.value;
        let features = getFeatures();

        createCar(make, model, year, mileage, power, fuelType, transmissionType, price, imageUrl, features);
        printCars();
    }
}
function createCar(make, model, firstRegistration, mileage, power, fuelType, transmissionType, price, imageUrl, features) {

    let car = {
        make: make,
        model: model,
        firstRegistration: firstRegistration,
        mileage: mileage,
        power: power,
        fuelType: fuelType,
        transmissionType: transmissionType,
        price: price,
        imageUrl: imageUrl,
        features: features
    };
    // Save data
    sendToBackend(car);
}
//urls":
// http://ec2-3-144-212-159.us-east-2.compute.amazonaws.com:8080/api/v1/registration
// http://localhost:8080/api/v1/registration

function sendToBackend(car) {
    const data = car;
    fetch('http://localhost:8080/api/v1/registration', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success. Backend response:', data);
            clearUI();
            CARS.push(car);
            printCars();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function printCars() {
    let carsPost = '';

    if (CARS.length < 1) {
        carsPost += `
        <div class="carousel-item active">
        <h3>No Cars Available</h3>
        <div class="carousel-image">
            <img src="https://roadster.com/assets/car-placeholder-652ae305f4b4afc9eb5f2d976fa0f77979069acb686b0a16fcc062e210367660.png" class="d-block w-100"
            alt="...">
            </div>`;
    } else {
        try {

            for (let car of CARS) {

                carsPost += `
        <div class="carousel-item">
        <h3>${car.make} ${car.model}</h3>
        <p class="price-paragraph">
            ${car.price} &euro;
        </p>
        <p>
            ${car.firstRegistration} | ${car.fuelType} | ${car.transmissionType} | ${car.power} kw | ${car.mileage} km

        </p>
        <div class="carousel-image">
            <img src="${car.imageUrl}" class="d-block w-100"
            alt="...">
            </div>`+ // remove + if want use function below.
                    // ;

                    //     //Looping through car.features and capitalizing features nicely.

                    //     for (let i = 0; i < car.features.length; i++) {
                    //         let firstLetterIndex = 0
                    //         let featureString = '';
                    //         let symbolIndex = 0;

                    //         if (separatorsCount(car.features[i]) > 0) {


                    //             while (getPosition(car.features[i], '_', symbolIndex) < car.features[i].length - 1) {
                    //                 featureString += car.features[i].substring(firstLetterIndex, (firstLetterIndex + 1)).toUpperCase() + car.features[i].substring(firstLetterIndex + 1, getPosition(car.features[i], '_', symbolIndex + 1)) + ' ';
                    //                 symbolIndex++;
                    //                 firstLetterIndex = getPosition(car.features[i], '_', symbolIndex) + 1;

                    //             }
                    //         } else {
                    //             featureString += car.features[i].substring(firstLetterIndex, (firstLetterIndex + 1)).toUpperCase() + car.features[i].substring(firstLetterIndex + 1)

                    //         }
                    //         carsPost += `<span>${featureString}</span>`
                    //     }
                    //     carsPost += 
                    `
            </div>
        </div>
            `;

            }
        } catch (e) {

            console.log(e)

            carsPost += `
    <div class="carousel-item">
    <h3>No Cars Available</h3>
    <div class="carousel-image">
        <img src="https://roadster.com/assets/car-placeholder-652ae305f4b4afc9eb5f2d976fa0f77979069acb686b0a16fcc062e210367660.png" class="d-block w-100"
        alt="...">
        </div>`;
        }
    }
    carouselInner.innerHTML = carsPost;
    $('#carouselInner').find('.carousel-item').first().addClass('carousel-item active');
}

function clearUI() {
    sellForm.reset();
    sellForm.classList.remove('validation-class');
}