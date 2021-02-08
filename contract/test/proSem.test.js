const StoreData = artifacts.require('./StoreData.sol');

contract('StoreData', async () => {
  it('Should deploy smart contract succesfully', async () => {
    const storeData = await StoreData.deployed();
    const address = await storeData.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });
  it('Should add a structure to objects array and return the right values', async () => {
    const storeData = await StoreData.deployed();
    await storeData.setObjects('testID', 'testCreated', 'testModified', 'testDescription');
    const result = await storeData.getObjects(0);
    assert.equal(result[0], 'testID');
    assert.equal(result[1], 'testCreated');
    assert.equal(result[2], 'testModified');
    assert.equal(result[3], 'testDescription');
  });
  it('Should output the rigth length of array objects', async () => {
    const storeData = await StoreData.deployed();
    const result = await storeData.getArrayLength();
    assert.equal(result.toNumber(), 1);
  })
});
