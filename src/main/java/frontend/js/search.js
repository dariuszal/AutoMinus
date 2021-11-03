document.getElementsByClassName('mid-container')[0].style.visibility = 'hidden';
let foundCars = [];

let selectedMake = document.getElementById('make-select');
let modelInput = document.getElementById('model-input');
let priceFromInput = document.getElementById('price-from');
let priceToInput = document.getElementById('price-to');
let yearFromInput = document.getElementById('year-from');
let yearToInput = document.getElementById('year-to');
let powerFromInput = document.getElementById('power-from');
let powerToInput = document.getElementById('power-to');
let mileageFromInput = document.getElementById('mileage-from');
let mileageToInput = document.getElementById('mileage-to');
let transmissionTypeInput = document.getElementById('transmission-type');
let fuelTypeInput = document.getElementById('fuel-type');
let searchResults = document.getElementById('search-results');
let selectedView = document.getElementById('view-select');
let searchForm = document.getElementById('search-form');
let allFeaturesDiv = document.getElementById('all-features');

addFeaturesToHTML();

//Dummy function so nothing happens when it is used in search html.
function printCars() {

}

function onSearchClick() {
    searchForm.classList.add('validation-class');
    // Assembling document input to correspondnig values;
    make = selectedMake.value;
    model = modelInput.value;
    priceFrom = Number(priceFromInput.value);
    priceTo = Number(priceToInput.value);
    yearFrom = Number(yearFromInput.value);
    yearTo = Number(yearToInput.value);
    powerFrom = Number(powerFromInput.value);
    powerTo = Number(powerToInput.value);
    mileageFrom = Number(mileageFromInput.value);
    mileageTo = Number(mileageToInput.value);
    transmissionType = transmissionTypeInput.value;
    fuelType = fuelTypeInput.value;

    foundCars = CARS;
    selectedFeatures = getFeatures();

    let containsAllFeatures = true;


    //search by make
    if (make != 'any') {
        foundCars = foundCars.filter(x => x.make.toLowerCase().includes(make.toLowerCase()));
    }
    //search by model
    if (model != 'any') {
        foundCars = foundCars.filter(x => x.model.toLowerCase().includes(model.toLowerCase()));
    }
    //search by price
    if (priceFrom != 0 && priceTo != 0) {
        foundCars = foundCars.filter(x => x.price >= priceFrom && x.price <= priceTo);
    }
    if (priceFrom == 0 && priceTo != 0) {
        foundCars = foundCars.filter(x => x.price <= priceTo);
    }
    if (priceTo == 0 && priceFrom != 0) {
        foundCars = foundCars.filter(x => x.price >= priceFrom);
    }
    //search by year
    if (yearFrom != 0 && yearTo != 0) {
        foundCars = foundCars.filter(x => x.firstRegistration >= yearFrom && x.firstRegistration <= yearTo);
    }
    if (yearFrom == 0 && yearTo != 0) {
        foundCars = foundCars.filter(x => x.firstRegistration <= yearTo);
    }
    if (yearTo == 0 && yearFrom != 0) {
        foundCars = foundCars.filter(x => x.firstRegistration >= yearFrom);
    }
    //search by power
    if (powerFrom != 0 && powerTo != 0) {
        foundCars = foundCars.filter(x => x.power >= powerFrom && x.power <= powerTo);
    }
    if (powerFrom == 0 && powerTo != 0) {
        foundCars = foundCars.filter(x => x.power <= powerTo);
    }
    if (powerTo == 0 && powerFrom != 0) {
        foundCars = foundCars.filter(x => x.power >= powerFrom);
    }
    // search by mileage
    if (mileageFrom != 0 && mileageTo != 0) {
        foundCars = foundCars.filter(x => x.mileage >= mileageFrom && x.mileage <= mileageTo);
    }
    if (mileageFrom == 0 && mileageTo != 0) {
        foundCars = foundCars.filter(x => x.mileage <= mileageTo);
    }
    if (mileageTo == 0 && mileageFrom != 0) {
        foundCars = foundCars.filter(x => x.mileage >= mileageFrom);
    }
    //search by transmission type 
    if (transmissionType != 'any') {
        foundCars = foundCars.filter(x => x.transmissionType == transmissionType);
    }
    //search by fuel-type 
    if (fuelType != 'any') {
        foundCars = foundCars.filter(x => x.fuelType == fuelType);
    }
    //search by features
    
    if(selectedFeatures != 0)
    for (let i = 0; i<selectedFeatures.length; i++) {
        foundCars = foundCars.filter(x => x.features.includes(selectedFeatures[i]))
    }

    printFoundCars();
    document.getElementsByClassName('mid-container')[0].style.visibility = 'visible';
}

function printFoundCars() {

    let carsHTML = '';
    carsHTML += `
    
    `
    for (let car of foundCars) {
        if (selectedView.value == 'Grid') {

            carsHTML += `
            <div class="grid-item col col-lg-3 result-item m-1 shadow rounded-3" style="width: 26rem; height:420px">
            <img src="${car.imageUrl}" alt="">
            <div class="card-body">
            <h5 class="card-title">${car.make} ${car.model}</h5>
            <p class="mb-0">${car.price} &euro;</p>
            <div class="car-features-list"> 

            <p class="mt-2 card-text">${car.firstRegistration} | ${car.fuelType} | ${car.transmissionType} | ${car.power} | ${car.mileage} </p>
                    </div>
                </div>
                <button type="button" data-bs-toggle="modal" data-bs-target="#car${car.id}modal" class="grid-buy-button btn btn-dark">Details</button>
                
                <div class="modal fade" id="car${car.id}modal" tabindex="-1" aria-labelledby="car${car.id}Label" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="car${car.id}Label">${car.make} ${car.model}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                     ...
                     </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
                </div>
                </div>
            </div>
            `;

        } else if (selectedView.value == 'List') {
            carsHTML += `
            <div class="list-view row m-3 shadow rounded-3">
                <div class="col col-8 ps-0 pe-0">
                <img src="${car.imageUrl}" alt="">
                </div>

                <div class="col col-4">
                <div class="mt-3 fs-3">${car.make} ${car.model}</div>
            <p class="fs-2 price-div">${car.price} &euro;</p>

            <div class="car-features-list">
            <p class="fs-5 mt-2 card-text">${car.firstRegistration} | ${car.fuelType} | ${car.transmissionType} | ${car.power} | ${car.mileage} </p>
            <button type="button" data-bs-toggle="modal" data-bs-target="#car${car.id}modal" class="rounded-3 list-buy-button btn">Details</button>
            
            <div class="modal fade" id="car${car.id}modal" tabindex="-1" aria-labelledby="car${car.id}Label" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="car${car.id}Label">${car.make} ${car.model}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                     ...
                     </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
                </div>
                </div>
            <br>
             `;

            //Looping through car.features and capitalizing features nicely.

            // for (let i = 0; i < car.features.length; i++) {
            //     let firstLetterIndex = 0
            //     let featureString = '';
            //     let symbolIndex = 0;

            //     if (separatorsCount(car.features[i]) > 0) {


            //         while (getPosition(car.features[i], '_', symbolIndex) < car.features[i].length - 1) {
            //             featureString += car.features[i].substring(firstLetterIndex, (firstLetterIndex + 1)).toUpperCase() + car.features[i].substring(firstLetterIndex + 1, getPosition(car.features[i], '_', symbolIndex + 1)) + ' ';
            //             symbolIndex++;
            //             firstLetterIndex = getPosition(car.features[i], '_', symbolIndex) + 1;

            //         }
            //     } else {
            //         featureString += car.features[i].substring(firstLetterIndex, (firstLetterIndex + 1)).toUpperCase() + car.features[i].substring(firstLetterIndex + 1)

            //     }
            //     carsHTML += `<span>${featureString}</span>`
            // }

            carsHTML += `
                    </div>
                </div>
            </div>
            `;


        }
    }

    searchResults.innerHTML = carsHTML;

}

function clearUI() {
    searchForm.reset();
    document.getElementsByClassName('mid-container')[0].style.visibility = 'hidden';

}
function checkClass(event) {
    // return Array.prototype.indexOf.call(event.srcElement.parentNode.childNodes, node);
    element = event.srcElement
    parent = element.parentNode.parentNode.parentNode
    console.log( Array.from(parent.parentNode.children).indexOf(parent));
    return Array.from(parent.parentNode.children).indexOf(parent);
}
let test = '';
function returnElement(index) {
    let child =  $('#search-results').children().eq(index);
    child = child.prevObject[index];
    console.log(child);
    test = child;
}