/**
 * Created by Vlad on 15.02.2017.
 */
window.onload = function () {

    var data = app.returnData(),
        list = document.getElementsByTagName("ul"),
        dateFields = document.getElementsByClassName("date-field"),
        form = document.getElementsByName("addingForm")[0],
        formInputs = form.getElementsByTagName("input"),
        inputs = document.getElementsByTagName("input"),
        searchParams = {
            text : "",
            type : [],
            date : ""
        };

    for(var i = 0; i < list.length; i++)
        for(var key in data){
            if(key != "projects" && data.hasOwnProperty(key)){
                createListElem(list[i], data[key]);
                i++;
            }
        }

    /*  datepicker  */
    for(i = 0; i < dateFields.length; i++){
        var elem = dateFields[i].getElementsByTagName("input")[0],
            pikaday = new Pikaday({
                field: elem,
                firstDay: 1,
                onSelect: function () {
                    this._o.field.value = convertDate(this.getDate());
                }
            });
    }

    /*  listeners for inputs to check if adding form is filled*/
    for(i = 0; i < formInputs.length; i++){
        formInputs[i].addEventListener("input", function () {
            document.getElementsByName("create")[0].disabled = checkForm(form);
        })
    }

    /*  checkboxes listener */
    for(i = 0; i < inputs.length; i++){
        if(inputs[i].getAttribute("type") == "checkbox"){
            inputs[i].addEventListener("change", function () {
                if(this.checked == true){
                    searchParams.type.push(this.value);
                }
                else{
                    var index = searchParams.type.indexOf(this.value);
                    searchParams.type.splice(index, 1);
                }
            })
        }
    }

    /*  custom drop list */
    for(i = 0; i < list.length; i++){
        var selectedElem = list[i].querySelector(".selected"),
            listElems = list[i].getElementsByTagName("li");

        for(var j = 0; j < listElems.length; j++){
            if(!listElems[j].classList.contains("selected")){
                listElems[j].addEventListener("click", function () {
                    var parent = this.parentElement;

                    parent.querySelector(".selected").textContent = this.textContent;
                    changeClasses(parent, "opened", "closed");

                    document.getElementsByName("create")[0].disabled = checkForm(form);
                })
            }
        }

        selectedElem.addEventListener("click", function () {
            var parent = this.parentElement;
            if(parent.classList.contains("closed")){
                changeClasses(parent, "closed", "opened");
            }else{
                changeClasses(parent, "opened", "closed");
            }
        });
    }

    /*  adding new project  */
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var formInputs = this.getElementsByTagName("input"),
            formLists = this.querySelectorAll(".selected"),
            newObject = {
                "project name" : "",
                "due date": "",
                "created": "",
                "members": "",
                "type": "",
                "status": "",
                "customer": ""
            },
            keys = Object.keys(newObject),
            pos = 0;

        for(var i = 0; i < formInputs.length; i++){
            if(formInputs[i].value != "") {
                newObject[keys[pos]] = formInputs[i].value;
                pos++;
            }
        }

        for(i = 0; i < formLists.length; i++){
            if(formLists[i].textContent != "type:" || formLists[i].textContent != "customer:"){
                if(keys[pos] == "status")
                    pos++;
                newObject[keys[pos]] = formLists[i].textContent;
                pos++;
            }
        }

        data.projects.push(newObject);
        window['scroller'].innerHTML = '';
        app.loadProjects();
    });

    /*  hide right menu*/
    document.body.addEventListener("click", function (e) {
        var screenWidth = document.documentElement.clientWidth,
            mouseCoordX = e.pageX,
            rightMenu = document.getElementById("rightMenu");

        if(rightMenu.offsetLeft != screenWidth && mouseCoordX < screenWidth * 0.808){
            rightMenu.style.right = "-19.2%";
        }
    });


    /*  search by text  */
    document.getElementsByName("search")[0].addEventListener("keydown", function (e) {
        if(e.keyCode == "13"){
            searchParams.text = this.value;
        }
    });

    /*  search by date  */
    document.getElementsByName("dateSearch")[0].addEventListener("change", function () {
        searchParams.date = this.value;
        console.log(convertDate(this.value));
    });

    /*  show/hide left menu*/
    document.getElementsByClassName("control-left-menu")[0].addEventListener("click", function () {
        var leftMenu = document.getElementById("leftMenu"),
            article = document.getElementsByTagName("article")[0];
        if(leftMenu.style.left != "0px"){
            leftMenu.style.left = "0";
            article.style.width = "77.8%";
        }
        else{
            leftMenu.style.left = "-19.2%";
            article.style.width = "94%";
        }
    });

    /*  show right menu*/
    document.getElementsByClassName("add-entry")[0].addEventListener("click", function () {
        var rightMenu = document.getElementById("rightMenu");
        if(rightMenu.style.right != "0px")
            rightMenu.style.right = "0";
    });

    function changeClasses(nodeElement, correctClass, newClass) {
        nodeElement.classList.remove(correctClass);
        nodeElement.classList.add(newClass);
    }

    /*  check if adding form is filled*/
    function checkForm(elem) {
        var unfilled = true,
            inputs = elem.getElementsByTagName("input"),
            listsSelected = elem.getElementsByClassName("selected");

        for(var i = 0; i < inputs.length; i++){
            if(inputs[i].value == ""){
                return unfilled;
            }
        }

        for(var j = 0; j < listsSelected.length; j++){
            if(listsSelected[j].textContent == "type:" || listsSelected[j].textContent == "customer:"){
                return unfilled;
            }
        }

        unfilled = false;
        return unfilled;
    }

    /*  create droplist elements*/
    function createListElem(parent, data) {
        for(var i = 0; i < data.length; i++){
            var li = document.createElement("li");
            li.textContent = data[i];
            parent.appendChild(li);
        }
    }

    function convertDate(dateStr) {
        var date = typeof dateStr == Date ? dateStr : new Date(dateStr),
            day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
            month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1),
            year = date.getFullYear();

        return month + "-" + day + "-" + year;
    }
};