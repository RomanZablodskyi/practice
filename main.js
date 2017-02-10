/**
 * Created by Vlad on 09.02.2017.
 */
var menuClick = document.querySelector('.menuClick'),
    menuCEClick = document.querySelector('.add-entry'),
    article = document.querySelector('article'),
    menu = document.querySelector('.menu'),
    menuCE = document.querySelector('menuCE'),
    clicked = false,
    clickedCE = false;


menuClick.addEventListener('click', function () {
    if (!clicked) {
        article.style.transform = "translateX(15.5%)";
        article.style.width = "79%";
        menu.style.transform = "translateX(101%)";
        clicked = true;
    } else  {
        article.style.transform = "translateX(0)";
        article.style.width = "94%";
        menu.style.transform = "translateX(0)";
        clicked = false;
    }
});

menuCE.addEventListener('click', function () {
    if (!clickedCE) {
        
    }
});


