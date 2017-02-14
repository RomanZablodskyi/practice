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
    columnHeadName = document.querySelector('.table-heading p:nth-child(1)'),
    columnHeadCreated = document.querySelector('.table-heading p:nth-child(4)');

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

app.loadProjects();