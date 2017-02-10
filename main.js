/**
 * Created by Vlad on 09.02.2017.
 */
var menuClick = document.querySelector('.menuClick'),
    article = document.querySelector('article'),
    clicked = false;

menuClick.addEventListener('click', function (e) {
    if (!clicked) {
        article.style.width = "80%";
        article.style.left = "16%";
        clicked = true;
    } else  {
        article.style.width = "94%";
        article.style.left = "3%";
        clicked = false;
    }

});


