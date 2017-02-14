window.onload = function () {

    var list = document.getElementsByTagName("ul"),
        dateFields = document.getElementsByClassName("date-field"),
        form = document.getElementsByName("addingForm")[0],
        formInputs = form.getElementsByTagName("input"),
        checkboxes = document.getElementsByTagName("input"),
        searchParams = {
            type: []
        };

    /*  datepicker  */
    for(var i = 0; i < dateFields.length; i++){
        var elem = dateFields[i].getElementsByTagName("input")[0],
            pikaday = new Pikaday({
                field: elem,
                firstDay: 1,
                onSelect: function () {
                    var dateVar = this.getDate(),
                        date = dateVar.getDate() < 10 ? "0" + dateVar.getDate() : dateVar.getDate(),
                        month = (dateVar.getMonth() + 1) < 10 ? "0" + (dateVar.getMonth() + 1) : (dateVar.getMonth() + 1);

                    this._o.field.value = month + "-" + date + "-" + dateVar.getFullYear();
                }
            });
    }

    for(i = 0; i < formInputs.length; i++){
        formInputs[i].addEventListener("input", function () {
            document.getElementsByName("create")[0].disabled = checkForm(form);
        })
    }

    for(i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].getAttribute("type") == "checkbox"){
            checkboxes[i].addEventListener("change", function () {
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

        var newObject = [],
            formInputs = this.getElementsByTagName("input"),
            formLists = this.querySelectorAll(".selected");

        for(var i = 0; i < formInputs.length; i++){
            if(formInputs[i].value != "")
                newObject.push(formInputs[i].value);
        }

        for(i = 0; i < formLists.length; i++){
            if(formLists[i].textContent != "type:" || formLists[i].textContent != "customer:")
                newObject.push(formLists[i].textContent);
        }

        console.log(newObject);
    });

    /*  hide right menu*/
    /*document.body.addEventListener("click", function (e) {
       var screenWidth = document.documentElement.clientWidth,
           mouseCoordX = e.pageX,
           rightMenu = document.getElementById("rightMenu");

       if(rightMenu.offsetLeft != screenWidth && mouseCoordX < screenWidth * 0.808){
           rightMenu.style.animation = "slideLeft 1.5s";
           rightMenu.style.right = "-19.2%";
       }
    });*/


    /*  search by text  */
    document.getElementsByName("search")[0].addEventListener("keydown", function (e) {
        if(e.keyCode == "13"){
            searchParams.text = this.value;
        }
    });

    /*  search by date  */
    document.getElementsByName("dateSearch")[0].addEventListener("change", function () {
        searchParams.date = this.value;
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

};