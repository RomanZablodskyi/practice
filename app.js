"use strict";

let data = exports.getJsonData('./projects.json'),
    unsortedProjectsByTime;

obj.returnData = function() {
    return data;
};


let _convertDate = function(str) {
    let dateArr = str.split('-');
    return new Date(dateArr[2], dateArr[1], dateArr[0]);
};

let _isExpired = function(e, tag) {
        let dueDate = _convertDate(e['due date']);
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
    const positionOfButton = 8,
        positionOfWall = 1,
        numberOfColumns = 9,
        positionStatus = 6;

    let arrColumns = Object.keys(e),
        row = _createElem('div', null, 'row'),
        docfrag = document.createDocumentFragment(),
        div = _createElem('div', null, 'wall'),
        button = _createElem('button', null, 'delete-entry');

    _isExpired(e, row);
    for (let i = 0, a = 0; i < numberOfColumns; i++) {
        if (i == positionOfWall) {
            docfrag.appendChild(div);
        } else if (i == positionOfButton) {
            docfrag.appendChild(button);
        } else if (i == positionStatus) {
            //removing 'row' from comparison of class names
            if (row.className.slice(4) == "expired-project")
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
    let projectName = this.parentNode.childNodes[0].innerHTML,
        content = this.parentNode.parentNode,
        projects = data.projects,
        length = projects.length;

    content.removeChild(this.parentNode);
    for (let i = 0; i < length; i++) {
        if (projectName == projects[i]["project name"]) {
            data.projects.splice(i,1);
            length--;
        }
    }
    unsortedProjectsByTime = JSON.parse(JSON.stringify(data.projects));
};

obj.loadProjects = function() {
    let projects = data.projects;
    let parent = window['scroller'];
    projects.forEach(function(e){
        parent.appendChild(_createRow(e));
    });
};



