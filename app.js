"use strict";

let data = exports.getJsonData('./projects.json'),
    unsortedProjectsByTime,
    unsearchedProjects;

const DAYPOS = 0,
    MOUNTHPOS = 1,
    YEARPOS = 2;

obj.returnData = function() {
    return data;
};

obj.setData = function(e) {
    data = e;
};

let _clearContent = function() {
    window['scroller'].innerHTML = '';
};

let _convertDateApp = function(str) {
    let dateArr = str.split('-');
    return new Date(dateArr[YEARPOS], dateArr[DAYPOS] - 1, dateArr[MOUNTHPOS]);
};

let _isExpired = function(e, tag) {
        let dueDate = _convertDateApp(e['due date']);
        if (dueDate.getTime() < Date.now()) {
            tag.className += " expired-project";
        }
};

let _createElem = function(tag, content, className) {
    let el = document.createElement(tag);
    if(content)
        el.innerHTML = content;
    if (className)
        el.className = className;
    if (className == 'delete-entry')
        _addListener(el, 'click', _deleteEntry);
    return el;
};

let _createRow = function(e) {
    //todo To uppercase
    const POSOFBTN = 8,
        POSOFWALL = 1,
        POSOFSTATUS = 6,
        NUMOFCOLUMNS = 9;

    let arrColumns = Object.keys(e),
        row = _createElem('div', null, 'row'),
        docfrag = document.createDocumentFragment(),
        div = _createElem('div', null, 'wall'),
        button = _createElem('button', null, 'delete-entry'),
        projectName = e[arrColumns[0]];
    _isExpired(e, row);
    for (let i = 0, a = 0; i < NUMOFCOLUMNS; i++) {
        if (i == POSOFWALL) {
            docfrag.appendChild(div);
        } else if (i == POSOFBTN) {
            button.dataset.prName = projectName;
            docfrag.appendChild(button);
        } else if (i == POSOFSTATUS) {
            //removing 'row' from comparison of class names
            if (row.classList.contains('expired-project'))
                docfrag.appendChild(_createElem('p', 'closed', null));
            else
                docfrag.appendChild(_createElem('p', 'in process', null));
            a++;
        } else {
            docfrag.appendChild(_createElem('p', e[arrColumns[a]], null));
            a++;
        }
    }
    row.appendChild(docfrag);
    return row;
};

let _addListener = function(element, type, func){
    element.addEventListener(type, func);
};

let _deleteEntry = function(){
    if (!confirm("Wanna delete project"))
        return;
    //todo data-attr
    let projectName = this.dataset.prName,
        content = window['scroller'],
        row = this.parentNode;

    content.removeChild(row);
    _remove(projectName, data.projects);
    if(unsearchedProjects)
        _remove(projectName, unsearchedProjects);
    unsortedProjectsByTime = JSON.parse(JSON.stringify(data.projects));
};

let _remove = function(name, projects, length) {
    //todo check array methods
    projects.forEach(function(e, i, arr) {
        if (name === projects[i]['project name'])
            //rm one element
            arr.splice(i, 1);
    });

};

obj.loadProjects = function() {
    let projects = data.projects;
    let parent = window['scroller'];
    projects.forEach(function(e){
        parent.appendChild(_createRow(e));
    });
};

obj.search = function(params) {
    data.projects = _findElByParams(data.projects, params.text, params.type, params.date);
    _clearContent();
    obj.loadProjects();
    myScroll.refresh();
};

obj.saveDataForSearch = function() {
    unsearchedProjects = JSON.parse(JSON.stringify(data.projects));
};

obj.uploadSaveData = function() {
    data.projects = unsearchedProjects;
    _clearContent();
    obj.loadProjects();
    myScroll.refresh();
};

let _findElByParams = function(info, text, type, date) {
    let arr = [];
    if (text) {
        arr = _findByText(text, info);
    }
    //if arr is'n empty then we use arr instead of info for search
    if (type.length > 0) {
        let i;
        arr.length > 0 ? i = arr : i = info;
        arr = _findByType(type, i);
    }
    if (date) {
        let i;
        arr.length > 0 ? i = arr : i = info;
        arr = _findByDate(date, i);
    }
    return arr;
};

let _findByText = function(text, arr) {
    return arr.filter(function (e) {
        return e['project name'].search(text) != -1;
    });
};

let _findByType = function(type, arr) {
    // todo toFilter
    return arr.filter(function(e) {
        return _containsType(e, type);
    });
};

let _containsType = function(el, type) {
    let rt = false;
    type.forEach(function(t) {
       if (t == el['type'])
           rt = true;
    });
    return rt;
};

let _findByDate = function(date, arr) {
    return arr.filter(function(e) {
        return e['due date'] == date || e['created'] == date;
    });
};


