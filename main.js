/**
 * Created by Vlad on 09.02.2017.
 */
"use strict";
let require = function(name, obj) {
    let code = new Function("obj", exports.getJsFile(name));
    code(obj);
    return obj;
};

let myScroll,
    app = require('./app.js', {}),
    sort = require('./sort.js', {}),
    menu = require('./js/form.js', {}),
    data = app.returnData(),
    columnHeadName = document.querySelector('.table-heading p:nth-child(1)'),
    columnHeadCreated = document.querySelector('.table-heading p:nth-child(4)'),
    createButton = document.getElementsByName('create')[0],
    dateFields = document.getElementsByClassName('date-field'),
    lmenuButton = document.getElementsByClassName('control-left-menu')[0],
    rightMenu = document.getElementById('rightMenu'),
    addEntry = document.getElementsByClassName('add-entry')[0],
    addingForm = document.getElementsByName('addingForm')[0],
    rightMenuInputs = addingForm.getElementsByTagName("input"),
    droplists = addingForm.getElementsByTagName("ul"),
    selected = addingForm.getElementsByClassName("selected"),
    inputs = document.getElementsByTagName("input"),
    searchParams = {
        text: "",
        type: [],
        date: ""
    };

let loaded = function() {
    myScroll = new IScroll('#wrapper', { mouseWheel: true });
    myScroll.options.mouseWheelSpeed = 5;
};

window.addEventListener("load", loaded);

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
        capture: false,
        passive: false
} : false);

columnHeadName.addEventListener('click', sort.sortName);
columnHeadCreated.addEventListener('click', sort.sortCreated);

//  datepicker
for(let key in dateFields){
    if(dateFields.hasOwnProperty(key)) {
        let elem = dateFields[key].getElementsByTagName("input")[0],
            pikaday = new Pikaday({
                field: elem,
                firstDay: 1,
                minDate: new Date(2000, 0, 1),
                maxDate: new Date(2020, 11, 31),
                onSelect: function () {
                    this._o.field.value = menu.convertDate(this.getDate());
                }
            });
    }
}

//  create droplists elements
let pos = 0;
for(let key in data){
    if(data.hasOwnProperty(key) && key !== "projects"){
        menu.fillElem(droplists[pos], data[key], "li");
        pos++;
    }
}

//  open/close left menu
lmenuButton.addEventListener('click', function () {
    menu.changeClasses(document.getElementById('leftMenu'), 'lmenu-left', 'lmenu-right');
    menu.changeClasses(document.getElementsByTagName('article')[0], 'article-left', 'article-right');
    if (document.getElementById('leftMenu').classList.contains('lmenu-right')) {
        app.saveDataForSearch();
        addEntry.setAttribute('disabled', 'true');
    }
    else {
        app.uploadSaveData();
        addEntry.removeAttribute('disabled');
    }
});

//  open right menu
addEntry.addEventListener('click', function () {
    menu.changeClasses(rightMenu, 'rmenu-left', 'rmenu-right');
});

// close right menu
document.body.addEventListener('click', function (e) {
    let screenWidth = document.documentElement.clientWidth,
        screenHeight = document.documentElement.clientHeight,
        mouseCoordX = e.pageX,
        mouseCoordY = e.pageY;

    if(rightMenu.offsetLeft != screenWidth && (mouseCoordX < screenWidth * 0.808 || mouseCoordY > screenHeight - 50)){
        menu.changeClasses(rightMenu, 'rmenu-left', 'rmenu-right');
    }
});

//  check if right menu form is filled
addingForm.addEventListener('input', function () {
    createButton.disabled = !menu.isFilledForm(rightMenuInputs, droplists);
});

//  add new project
addingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    data.projects.push(menu.getFormValues(rightMenuInputs, droplists));
    menu.clearFormElements(rightMenuInputs, droplists);

    window['scroller'].innerHTML = '';
    app.loadProjects();
});

//  open/close droplist
for(let key in selected){
    if(selected.hasOwnProperty(key)){
        selected[key].addEventListener("click", function () {
            menu.changeClasses(this.parentElement, "opened", "closed");
        })
    }
}

//  select element from droplist
for(let key in droplists) {
    if (droplists.hasOwnProperty(key)) {
        let selectedElem = droplists[key].getElementsByClassName("selected")[0],
            droplistElems = droplists[key].getElementsByTagName("li");

        for(let i in droplistElems){
            if(droplistElems.hasOwnProperty(i) && !droplistElems[i].classList.contains("selected")){
                droplistElems[i].addEventListener("click", function () {

                    selectedElem.textContent = this.textContent;
                    menu.changeClasses(this.parentElement, "opened", "closed");
                    createButton.disabled = !menu.isFilledForm(rightMenuInputs, droplists);

                })
            }
        }
    }
}

//  search projects with parameters
document.getElementsByName("search")[0].addEventListener("keydown", function (e) {
    console.log(e.keyCode);
    if(e.keyCode === 13){
        app.uploadSaveData();
        if (this.value || searchParams.type.length > 0 ||
            (searchParams.date !== 'NaN-NaN-NaN' && searchParams.date != '')) {
            searchParams.text = this.value;
            app.search(searchParams);
        }
    }
});


//  save date parameters for search
document.getElementsByName("dateSearch")[0].addEventListener("change", function () {
    searchParams.date = this.value;
});


//  save type parameters for search
for(let key in inputs){
    if(inputs.hasOwnProperty(key) && inputs[key].getAttribute("type") === "checkbox"){
        inputs[key].addEventListener("change", function () {
            if(this.checked === true){
                searchParams.type.push(this.value);
            }
            else{
                let index = searchParams.type.indexOf(this.value);
                searchParams.type.splice(index, 1);
            }
        })
    }
}

app.loadProjects();
