/**
 * Created by Vlad on 09.02.2017.
 */
"use strict";

var myScroll,
    menuClick = document.querySelector('.menuClick'),
    article = document.querySelector('article'),
    menu = document.querySelector('.menu'),
    clicked = false,
    data;

function getData() {
    var json, req = new XMLHttpRequest();
    req.open("GET", "./projects.json", false);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if(req.status == 200){
                json = JSON.parse(req.responseText);
            }
        }
    };
    req.send(null);
    return json;
}

function loaded () {
    myScroll = new IScroll('#wrapper', { mouseWheel: true });
    myScroll.options.mouseWheelSpeed = 5;
    var i = myScroll.options.mouseWheelSpeed;
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
        capture: false,
        passive: false
    } : false);


menuClick.addEventListener('click', function () {
    if (!clicked) {
        article.className = "shrinkArticle";
        menu.className += " openMenu";
        clicked = true;
    } else  {
        article.className = "";
        menu.className = menu.className.slice(0,4);
        clicked = false;
    }
});

data = getData();

function loadProjects(projects) {
    var parent = document.querySelector('#scroller');
    projects.forEach(function(e){
        var row = document.createElement('div');
        row.className = 'row';
        var arr = Object.keys(e);
        var div = document.createElement('div');
        div.className = "wall";
        var button = document.createElement('button');
        button.className = "delete-entry";
        for (var i = 0, a = 0; i < 9; i++) {
            if (i == 1) {
                row.appendChild(div);
                continue;
            } else if (i == 8) {
                row.appendChild(button);
                continue;
            }
            var p = document.createElement('p');
            var str = arr[a];
            p.innerHTML = e[str];
            row.appendChild(p);
            a++;
        }
        parent.appendChild(row);
    });
}

loadProjects(data.projects);


