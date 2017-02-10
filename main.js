/**
 * Created by Vlad on 09.02.2017.
 */
var menuClick = document.querySelector('.menuClick'),
    article = document.querySelector('article'),
    menu = document.querySelector('.menu'),
    clicked = false;


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



