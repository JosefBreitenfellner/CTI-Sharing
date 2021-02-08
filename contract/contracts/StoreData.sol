pragma solidity >=0.4.22 <0.8.0;

contract StoreData {

  // structure to store metadata of CTI-Reports
  struct Object {
    string id;
    string created;
    string modified;
    string description;
  }

  // struct array
  Object[] objects;

  // store new values in struct array 'objects'
  function setObjects(string memory _id, string memory _created, string memory _modified, string memory _description) public {
    objects.push(Object( _id, _created, _modified, _description));
  }

  // return length of struct array 'objects'
  function getArrayLength() public view returns(uint) {
    if(objects.length != 0) {
      return objects.length;
    }
    else {
      return 0;
    }
  }

  // return values of one item in 'objects' (spezified by the index)
  function getObjects(uint index) public view returns(string, string, string, string) {
    return (objects[index].id, objects[index].created, objects[index].modified, objects[index].description);
  }

  /*

  * onchain search
  * bad performance
  * better to use offchain search

  function _toLower(string str) internal returns (string) {
  	bytes memory bStr = bytes(str);
  	bytes memory bLower = new bytes(bStr.length);
  	for (uint i = 0; i < bStr.length; i++) {
  		// Uppercase character...
  		if ((bStr[i] >= 65) && (bStr[i] <= 90)) {
  			// So we add 32 to make it lowercase
  			bLower[i] = bytes1(int(bStr[i]) + 32);
  		} else {
  			bLower[i] = bStr[i];
  		}
  	}
  	return string(bLower);
	}

  function contains (string memory pattern, string memory _text) public constant returns(bool){
    bytes memory patternBytes = bytes (pattern);
    string memory text = _toLower(_text);
    bytes memory textBytes = bytes (text);


    for (uint i = 0; i < textBytes.length - patternBytes.length + 1; i++) {
      bool success = true;
      for (uint j = 0; j < patternBytes.length; j++) {
        if (textBytes [i + j] != patternBytes [j]) {
          success = false;
        }
      }
      if(success) {
        return true;
      }
    }
    return false;
  }


  // function to search for a specific key words within the description
  function searchObject(string keyWord) public constant returns(string, string, string, string) {
    for(uint index=0; index < objects.length; index++) {
      if(contains(keyWord, objects[index].description)) {
        return (objects[index].id, objects[index].created, objects[index].modified, objects[index].description);
      }
    }
  }

  */


}
