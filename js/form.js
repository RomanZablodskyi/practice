const STATUS_FIELD = "status";

obj.convertDate = function(dateStr) {
    if(dateStr != "") {
        let date = typeof dateStr === Date ? dateStr : new Date(dateStr),
            day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
            month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1),
            year = date.getFullYear();

        return month + "-" + day + "-" + year;
    }

    return null;
};

obj.changeClasses = function(nodeElement, firstClass, secondClass) {
    nodeElement.classList.toggle(firstClass);
    nodeElement.classList.toggle(secondClass);
};

obj.fillElem = function(parent, data, type) {
    let fragment = document.createDocumentFragment();
    data.forEach(function (item) {
        let elem = document.createElement(type);
        elem.textContent = item;
        fragment.appendChild(elem);
    });
    parent.appendChild(fragment);
};

let isSetInputs = function (inputs) {
    for(let key in inputs){
        if(inputs.hasOwnProperty(key) && inputs[key].value.trim() === "")
            return false;
    }
    return true;
};

let clearInputs = function (inputs) {
    for(let key in inputs){
        if(inputs.hasOwnProperty(key))
            inputs[key].value = "";
    }
};

let getInputsValue = function (inputs) {
    let array = [];
    for(let i = 0; i < inputs.length; i++){
            array.push(inputs[i].value)
    }
    return array;
};

let returnSelected = function (droplist) {
    return droplist.getElementsByClassName("selected")[0];
};

let isSetDroplists = function (droplists) {
    for(let key in droplists){
        if(droplists.hasOwnProperty(key)){
            if(returnSelected(droplists[key]).textContent === "type:" || returnSelected(droplists[key]).textContent === "customer:")
                return false;
        }
    }
    return true;
};

let clearDroplists = function (droplists) {
    let pos = 0,
        text = "";
    for(let key in droplists){
        if(droplists.hasOwnProperty(key)){
            switch (pos){
                case 0: text = "type:"; break;
                case 1: text = "customer:"; break;
            }

            returnSelected(droplists[key]).textContent = text;
            pos++;
        }
    }
};

let getDroplistsValue = function (droplists) {
    let array = [];
    for(let key in droplists) {
        if (droplists.hasOwnProperty(key)) {
            array.push(returnSelected(droplists[key]).textContent)
        }
    }
    return array;
};

obj.isFilledForm = function (lists, droplists) {
    return !!(isSetInputs(lists) && isSetDroplists(droplists));
};

obj.clearFormElements = function (inputs, droplists) {
    clearInputs(inputs);
    clearDroplists(droplists);
};

let returnObject = function (obj, array) {
    let pos = 0;
    for(let key in obj){
        if(obj.hasOwnProperty(key) && key !== STATUS_FIELD) {
            obj[key] = array[pos];
            pos++;
        }
    }
    return obj;
};

obj.getFormValues = function (inputs, droplists) {
    let newObject = {
        "project name" : "",
        "due date": "",
        "created": "",
        "members": "",
        "type": "",
        "status": "",
        "customer": ""
    };

    newObject = returnObject(newObject, getInputsValue(inputs).concat(getDroplistsValue(droplists)));
    return newObject;
};