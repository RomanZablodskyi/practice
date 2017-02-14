/**
 * Created by Vlad on 13.02.2017.
 */
"use strict";
let require = function(name, obj) {
    let code = new Function("obj", exports.getJsFile(name));
    code(obj);
    return obj;
};
console.log(obj);
let app = require('./app.js', {}),
    data = app.returnData(),
    unsortedProjectsByName,
    unsortedProjectsByTime;

let _clearContent = function() {
    window['scroller'].innerHTML = '';
};

obj.sortName = function() {
    if (data.projects.length <= 1)
        return;
    if (this.className !== 'sorted') {
        let arr = _getNames(),
            projects = [];
        this.className = 'sorted';
        unsortedProjectsByName = data.projects;
        arr.sort();
        arr.forEach(function(e) {
            projects.push(_findEl(e));
        });
        data.projects = projects;
    } else {
        this.className = '';
        data.projects = unsortedProjectsByName;
    }
    _clearContent();
    app.loadProjects();
};

obj.sortCreated = function() {
    if (data.projects.length <= 1)
        return;
    if (this.className !== 'sorted') {
        unsortedProjectsByTime =  JSON.parse(JSON.stringify(data.projects));
        this.className = 'sorted';
        data.projects = _sortTime();
    } else {
        data.projects = unsortedProjectsByTime;
        this.className = '';
    }
    _clearContent();
    app.loadProjects();
};

let _sortTime = function() {
    return data.projects.sort(function(a, b) {
        return _convertDate(a['created']).getTime() - _convertDate(b['created']).getTime();
    });
};

let _convertDate = function(str) {
    let dateArr = str.split('-');
    return new Date(dateArr[2], dateArr[1], dateArr[0]);
};

let _findEl = function(key) {
    let el;
    data.projects.forEach(function (e) {
        if (key == e['project name']) {
            el = e;
        }
    });
    return el;
};

let _getNames= function() {
    return data.projects.map(function(e) {
        return e['project name'];
    });
};

