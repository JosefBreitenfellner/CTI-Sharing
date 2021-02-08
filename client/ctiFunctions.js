var contractInstance = null;

function connectToBlockchain(){
  // status of html switch
  var status = document.getElementById("flexSwitchCheckDefault").checked;
  // check if switch is enabled
  if(status == true) {
    if (typeof web3 !== 'undefined') {
      // use existing provider (if MetaMask or Mist is used)
      web3 = new Web3(web3.currentProvider);
    } else {
      // set localhost (127.0.0.1) as http provider with port 7545 to connect to Ganache
      web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    }

    // first account as default account (if no from property is specified)
    web3.eth.defaultAccount = web3.eth.accounts[0];

    // abi of smart contract
    const abi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_id",
          "type": "string"
        },
        {
          "name": "_created",
          "type": "string"
        },
        {
          "name": "_modified",
          "type": "string"
        },
        {
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "setObjects",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getArrayLength",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getObjects",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

    /*
    address of smart contract (StoreData)
    adress of smart contract must be respecified after deploy process is finished
    */
    const contractAdress = '0x57DE68A3dEc3D0DAa36a01F3e6dd864C0efA31F5';

    // create new instace of smart contract (arguments: abi, adress of conract)
    contractInstance = new web3.eth.Contract(abi, contractAdress);
  }
  // if switch is diabled set conntractInstance null
  else {
    contractInstance = null;
  }
}

// file name is used to specify the path for the function loadJSON
var fileName = "";
function chooseFile() {
    // open users file system and store chosen file in fileList
    const fileList = event.target.files;
    // if fileList contains any value ...
    if(fileList[0] !== undefined) {
      //... the name of the file is stored in the variable fileName
      fileName = fileList[0].name;
    }
    // if fileList does not contain any value an empty string is stored in fileName
    else {
      fileName = "";
    }
}

/*
loadJSON is a function found on https://wiki.selfhtml.org/wiki/JSON
*/

function loadJSON(file,callback) {
  // new instance of an XMLHttpRequest is created
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  // read content of JSON file
  xobj.open('GET', file, true);
  xobj.onreadystatechange = function () {

    // readyState = 4 --> fetch operation is complete
    if (xobj.readyState == 4 ) {
    // required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
     }
  };

  // request is sent to the server
  xobj.send(null);
}

function loadJsonFile() {
  // function just works if switch is enabled and if an instance of the smart contracts exists
  if(contractInstance == null) {
    alert("Blockchain Verbindung muss für diese Funktion aktiviert sein!");
  }
  else {
    loadJSON('./Cti-Files/' + fileName, function(text){
      // all objects of a CTI-Report are stored in data
      var data = JSON.parse(text).objects;
      // loop iterates through data and checks if atrributes contain any value
      for(i in data) {
        if(data[i].id == undefined) {
          data[i].id = 'no entry for id';
        }
        if(data[i].created == undefined) {
          data[i].created = 'no entry for created';
        }
        if(data[i].modified == undefined) {
          data[i].modified = 'no entry for modified';
        }
        if(data[i].description == undefined) {
          data[i].description = 'no entry for description';
        }
        /*
        solidity function call to store objects in the smart contract 'StoreData' (from: sender account, gas: gas limit)
        sender has to be respecified after deploy process is finished
        */
        contractInstance.methods.setObjects(data[i].id, data[i].created, data[i].modified, data[i].description).send({ from: '0x3688730F57098F7D0624832E217f50C6AE8773Ec', gas:3000000 });
      }
    });
  }
}


function displayCTI() {
  // function just works if switch is enabled and if an instance of the smart contracts exists
  if(contractInstance == null) {
    alert("Blockchain Verbindung muss für diese Funktion aktiviert sein!");
  }
    else {
    var counter = 0;
    // solidity function call to get the length of the array 'objects'
    contractInstance.methods.getArrayLength().call(function(err,res) {
      if(!err){
        // res describes the length of the array 'objects'
        while(counter < res) {
          // solidity function call to get the object of the array 'objects' with the right index
          contractInstance.methods.getObjects(counter).call(function(err,res){
            if(!err){
              // store metadata in variables
              var tdId = document.createElement("td");
              tdId.innerHTML = res[0];
              var tdCreated = document.createElement("td");
              tdCreated.innerHTML = res[1];
              var tdModified = document.createElement("td");
              tdModified.innerHTML = res[2];
              var tdDescription = document.createElement("td");
              tdDescription.innerHTML = res[3];

              // append metadata to the table row tr
              var tr = document.createElement("tr");
              tr.appendChild(tdId);
              tr.appendChild(tdCreated);
              tr.appendChild(tdModified);
              tr.appendChild(tdDescription);

              // append table row tr to html table
              var table = document.getElementById("table");
              table.appendChild(tr);

            } else {
                console.log(err);
            }
          });
          counter++;
        }

      } else {
        console.log(err);
      }
    });
  }
}

function searchCTI() {
  var input, pattern, table, tr, td, text;
  input = document.getElementById("myInput");
  pattern = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows and hide those who do not match the search query
  for (var i = 0; i < tr.length; i++) {
    // description is the 4. column [3]
    td = tr[i].getElementsByTagName("td")[3];
    // if table data has any value...
    if (td) {
      // ...store content of table data in variable text
      text = td.textContent || td.innerText;
      // if text matchs with pattern...
      if (text.toUpperCase().indexOf(pattern) > -1) {
        // ...show table row
        tr[i].style.display = "";
      } else {
        // ... else hide table row
        tr[i].style.display = "none";
      }
    }
  }
}

function downloadTable() {
  // store html table in a variable
  var html = document.querySelector("table").outerHTML;
  exportTableToCsv(html, "table.csv");
}


/*
downloadCsv and exportTableToCsv are functions as found on https://codepen.io/malahovks/pen/gLxLWX
*/

function downloadCsv(csv, filename) {
  var csvFile;
  var downloadLink;

  // csv file
  csvFile = new Blob([csv], {type: "text/csv"});
  // download link
  downloadLink = document.createElement("a");
  // file name
  downloadLink.download = filename;
  // create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);
  // make sure that the link is not displayed
  downloadLink.style.display = "none";
  // add the link to your DOM
  document.body.appendChild(downloadLink);
  // click event to open the csv file
  downloadLink.click();
}

function exportTableToCsv(html, filename) {
	var csv = [];
	var rows = document.querySelectorAll("table tr");

    // loop through all rows
    for (var i = 0; i < rows.length; i++) {
		  var row = [], cols = rows[i].querySelectorAll("td, th");

      // loop through all columns
      for (var j = 0; j < cols.length; j++)
        row.push(cols[j].innerText);

      // add data to csv file
		  csv.push(row.join(","));
	}

    // download csv file
    downloadCsv(csv.join("\n"), filename);
}
