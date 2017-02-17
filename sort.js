/**
 * Created by Vlad on 13.02.2017.
 */
"use strict";

let data,
    unsortedProjectsByName,
    unsortedProjectsByTime;

const DAYPOS = 0,
    MOUNTHPOS = 1,
    YEARPOS = 2;

let _clearContent = function() {
    window['scroller'].innerHTML = '';
};

obj.sortName = function() {
    data = app.returnData();
    if (data.projects.length <= 1)
        return;
    if (!this.classList.contains('sorted')) {
        let arr = _getNames(),
            projects = [];
        this.classList.add('sorted');
        //Updating data in case if smt was deleted or added
        unsortedProjectsByName = _updateDataProjects().projects;
        arr.sort();
        arr.forEach(function(e) {
            projects.push(_findEl(e));
        });
        data.projects = projects;

    } else {
        if (unsortedProjectsByName.length !== _updateDataProjects().projects.length)
            unsortedProjectsByName = _updateDataProjects().projects;
        this.classList.remove('sorted');
        data.projects = unsortedProjectsByName;
    }
    _clearContent();
    app.loadProjects();
};

let _updateDataProjects = function() {
    return app.returnData()
};

obj.sortCreated = function() {
    data = app.returnData();
    if (data.projects.length <= 1)
        return;
    if (!this.classList.contains('sorted')) {
        //Creating unlinked copy of object
        unsortedProjectsByTime =  JSON.parse(JSON.stringify(_updateDataProjects().projects));
        this.classList.add('sorted');
        data.projects = _sortTime();
    } else {
        if (unsortedProjectsByTime.length !== _updateDataProjects().projects.length)
            unsortedProjectsByTime = JSON.parse(JSON.stringify(_updateDataProjects().projects));
        data.projects = unsortedProjectsByTime;
        this.classList.remove('sorted');
    }
    _clearContent();
    app.loadProjects();
};

let _sortTime = function() {
    return data.projects.sort(function(a, b) {
        console.log(a);
        return _convertDate(a['created']).getTime() - _convertDate(b['created']).getTime();
    });
};

let _convertDate = function(str) {
    let dateArr = str.split('-');
    return new Date(dateArr[YEARPOS], dateArr[DAYPOS], dateArr[MOUNTHPOS]);
};

let _findEl = function(key) {
    return data.projects.filter(function (e) {
        return key == e['project name'];
    })[0];
};

let _getNames= function() {
    return data.projects.map(function(e) {
        return e['project name'];
    });
};

