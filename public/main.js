var url = ''
var commandstring = ''

function geturl() {
    console.log('Yes');
    url = document.getElementById('url').value;
    console.log(url);

    function processUrl(url) {
        var array = [];

        var _url = String(url);
        if (url.startsWith("http://www.")) {
            array.push(leadingZero(Number(0).toString(16)));
            _url = url.substr("http://www.".length)
        } else if (url.startsWith("https://www.")) {
            array.push(leadingZero(Number(1).toString(16)));
            _url = url.substr("https://www.".length)
        } else if (url.startsWith("http://")) {
            array.push(leadingZero(Number(2).toString(16)));
            _url = url.substr("http://".length)
        } else if (url.startsWith("https://")) {
            array.push(leadingZero(Number(3).toString(16)));
            _url = url.substr("https://".length)
        }

        var char_remaining = _url.length;
        while (char_remaining > 0) {
            if (_url.startsWith(".com/")) {
                array.push(leadingZero(Number(0).toString(16)));
                var skip = ".com/".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".org/")) {
                array.push(leadingZero(Number(1).toString(16)));
                var skip = ".org/".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".edu/")) {
                array.push(leadingZero(Number(2).toString(16)));
                var skip = ".edu/".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".net/")) {
                array.push(leadingZero(Number(3).toString(16)));
                var skip = ".net/".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".info/")) {
                array.push(leadingZero(Number(4).toString(16)));
                var skip = ".info/".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".biz/")) {
                array.push(leadingZero(Number(5).toString(16)));
                var skip = ".biz/".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".gov/")) {
                array.push(leadingZero(Number(6).toString(16)));
                var skip = ".gov/".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".com")) {
                array.push(leadingZero(Number(7).toString(16)));
                var skip = ".com".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".org")) {
                array.push(leadingZero(Number(8).toString(16)));
                var skip = ".org".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".edu")) {
                array.push(leadingZero(Number(9).toString(16)));
                var skip = ".edu".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".net")) {
                array.push(leadingZero(Number(10).toString(16)));
                var skip = ".net".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".info")) {
                array.push(leadingZero(Number(11).toString(16)));
                var skip = ".info".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".biz")) {
                array.push(leadingZero(Number(12).toString(16)));
                var skip = ".biz".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            } else if (_url.startsWith(".gov")) {
                array.push(leadingZero(Number(13).toString(16)));
                var skip = ".gov".length;
                _url = _url.substr(skip);
                char_remaining = char_remaining - skip;
                continue;
            }

            //var letter = _url.codePointAt(0); // else try charCodeAt()
            var letter = _url.charCodeAt(0).toString(16);
            array.push(leadingZero(letter));
            _url = _url.substr(1);
            char_remaining = char_remaining - 1;

        }
        return array;
    }

    function leadingZero(v) {
        if (v.length === 2) {
            return v;
        } else if (v.length === 1) {
            return "0" + v;
        } else {
            return "error";
        }
    }

    function render() {
        var base = [];

        base.push("0x08"); //0
        base.push("0x0008"); //1
        base.push(""); //2
        base.push("02"); //3
        base.push("01"); //4
        base.push("06"); //5
        base.push("03"); //6
        base.push("03"); //7
        base.push("aa"); //8
        base.push("fe"); //9
        base.push(""); //10
        base.push("16"); //11
        base.push("aa"); //12
        base.push("fe"); //13
        base.push("10"); //14
        base.push("00"); //15


        var processedUrl = processUrl(url);
        console.log("processed url: " + processedUrl);
        var retval = base.concat(processedUrl);
        console.log("inital value: " + retval);
        retval[2] = leadingZero(Number(retval.length - 3).toString(16));
        retval[10] = leadingZero(Number(retval.length - 11).toString(16));
        console.log('final value:' + retval);
        if (processedUrl.length === 0) {
            commandstring = "Enter a URL above.";

        } else if (retval.length <= 34) {
            commandstring = '';
            for (var j = retval.length; j < 34; j++) {
                retval.push("00");
            }
            for (var i = 0; i < retval.length; i++) {
                commandstring = commandstring + retval[i] + " ";
            }
            commandstring = commandstring.trim();
            console.log(commandstring);
        } else {
            var toolong = (retval.length - 34)
            commandstring = "Your URL is too long by " + String(toolong) + ((toolong === 1) ? " byte" : " bytes");
        }
    }
    render();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.137.185:3000/getUrl", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: commandstring
    }));
    document.getElementById('heading__main').textContent = "Sucessfully Advertised"
    document.getElementById('heading__completed_main').textContent = `Hex code is:`
    document.getElementById('heading__completed').textContent = `${commandstring}`
    document.getElementById('button').remove()
    document.getElementById('url').remove()
    document.getElementById('heading__sub').remove()
}
