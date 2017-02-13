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
    menu = document.querySelector('.menu'),
    menuClick = document.querySelector('.menuClick'),
    article = document.querySelector('article'),
    btnName = document.querySelector('.name');

let loaded = function() {
    myScroll = new IScroll('#wrapper', { mouseWheel: true });
    myScroll.options.mouseWheelSpeed = 5;
};

window.addEventListener("load", loaded);

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
        capture: false,
        passive: false
} : false);

menuClick.addEventListener('click', function () {
    if (article.className != 'shrinkArticle') {
        article.className = "shrinkArticle";
        menu.className += " openMenu";
    } else {
        article.className = "";
        menu.className = menu.className.slice(0,4);
    }
});

btnName.addEventListener('click', app.sort);

app.loadProjects();
