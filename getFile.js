/**
 * Created by Vlad on 13.02.2017.
 */
(function(exports) {

    exports.getJsonData = function(path) {
        let json, req = new XMLHttpRequest();
        req.open("GET", path, false);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if(req.status == 200){
                    json = JSON.parse(req.responseText);
                }
            }
        };
        req.send(null);
        return json;
    };

    exports.getJsFile = function(path) {
        let file, req = new XMLHttpRequest();
        req.open("GET", path, false);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if(req.status == 200){
                    file = req.responseText;
                }
            }
        };
        req.send(null);
        return file;
    };
})(this.exports = {});