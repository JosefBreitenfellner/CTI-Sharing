pragma solidity >=0.4.22 <0.8.0;

contract StoreData {

  // structure to store metadata of CTI-Reports
  struct Object {
    string id;
    string created;
    string modified;
    string description;
  }

  // struct array is created
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

  // return values of one item in 'objects' (specified by the index)
  function getObjects(uint index) public view returns(string, string, string, string) {
    return (objects[index].id, objects[index].created, objects[index].modified, objects[index].description);
  }

}
