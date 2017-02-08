//Counter <code></code>

var button = document.getElementById("counter");

button.onclick = function () {
    //Make a request to counter endpoint

    //Capture the response and store it in a variable
    var request = new XMLHttpRequest();
    //Display the value of the span  from the variable.
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById("countertext");
                span.innerHTML = counter.toString();
            }
        }
    };

    //make the request 
    request.open('GET', "http://localhost:8080/counter", true);
    request.send(null);
  }

  //Submit name

  
  var submit = document.getElementById("submit_btn");
  submit.onclick = function () {
      //Should make a request to server and send name
    //Capture the response and store it in a variable
    var request = new XMLHttpRequest();
    //Display the value of the span  from the variable.
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
               //Capture the list of names and display them.
                var names = request.responseText;
                names  = JSON.parse(names);

                var list = "";
                var listDom = document.getElementById("names_list");
                for (var i=0; i< names.length; i++){
                    list += "<li>" + names[i] + "</li>" + "\n"
                }

                listDom.innerHTML = list; 
            }
        }
    };

    var nameInput = document.getElementById("name");
    var name = nameInput.value;
    //make the request 
    request.open('GET', "http://localhost:8080/submit-name?name=" + name, true);
    request.send(null);
    
  }
