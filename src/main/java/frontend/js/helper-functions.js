
function getCheckBoxValue(checkboxId){
    let checkboxInput = document.querySelector(`input#${checkboxId}:checked`);
    if(checkboxInput != null){
        return checkboxInput.value;
    }else{
        return '';
    }
}
//Replace String of index
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
//Finding index of symbol
//const string = "XYZ 123 ABC 456 ABC 789 ABC";
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

//   console.log(
//     getPosition(string, 'ABC', 2) // --> 16
//   )

//Counts how many separators '_' there is in the given string.
function separatorsCount(string) {
    let count = 0;
    for(let i = 0; i<10; i++) {
        if(getPosition(string, '_', i) !=0 && getPosition(string, '_', i) !=string.length ) {
            count++
        }
    }
    return count
}

function addFeaturesToHTML() {
    for (let feature of allFeaturesData) {
        allFeaturesDiv.innerHTML +=
            `
        <h5>${feature.category}</h5>
        `
        for (let i = 0; i < feature.features.length; i++) {
            let firstLetterIndex = 0
            let featureString = '';
            let symbolIndex = 0;

            if (separatorsCount(feature.features[i]) > 0) {


                while (getPosition(feature.features[i], '_', symbolIndex) < feature.features[i].length - 1) {
                    featureString += feature.features[i].substring(firstLetterIndex, (firstLetterIndex + 1)).toUpperCase() + feature.features[i].substring(firstLetterIndex + 1, getPosition(feature.features[i], '_', symbolIndex + 1)) + ' ';
                    symbolIndex++;
                    firstLetterIndex = getPosition(feature.features[i], '_', symbolIndex) + 1;

                }

            } else {
                featureString += feature.features[i].substring(firstLetterIndex, (firstLetterIndex + 1)).toUpperCase() + feature.features[i].substring(firstLetterIndex + 1)

            }
            allFeaturesDiv.innerHTML += `
                            <div class="feature">
                            <input class="btn-check" type="checkbox" id="${feature.features[i]}" name="${feature.features[i]}" value="${feature.features[i]}">
                            <label class="btn btn-outline-secondary mt-1" for="${feature.features[i]}">${featureString}</label>
                        </div>
                        `
        }
        allFeaturesDiv.innerHTML += `<hr>`
    }

}

//Function returns array of checkmark features selected.
function getFeatures() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    frontEndFeaturesArray = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value != 'true') {

            frontEndFeaturesArray.push(checkboxes[i].value)
        }
    }
    return frontEndFeaturesArray;
}