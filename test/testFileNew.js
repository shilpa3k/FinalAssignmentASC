const FileLogin = artifacts.require("FileLogin");
const assert = require("assert");
var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

contract("FileLogin", accounts => {
  const owner = accounts[0];
  const account1 = accounts[1];
  const account2 = accounts[2];
  const account3 = accounts[3];
  const username1 = "ShilpaK";
  const username2 = "ABCSGF";
  const username3 = "User3";
  const ipfsHash = "QmQBRN4iaNbwXpDP8ogYcSwhXGkFu1Bbi9sXA8b7tm8gS6";

  it("sets an owner", async () => {
    const fileLogin = await FileLogin.new();
    assert.equal(await fileLogin.owner.call(), owner);
  });

  it("should create a User successfully", async () => {
    const userProfile = await FileLogin.deployed();

    await userProfile.createUser(
      web3.utils.utf8ToHex(username1),
      web3.utils.utf8ToHex(ipfsHash),
      {
        from: account1
      }
    );
    const userCount = await userProfile.getUserCount({ from: account1 });
    // one user is created by the contract creation
    assert.equal(userCount, 1);
  });

  it("should only allow one user to be created per address & username", async () => {
    const userProfile = await FileLogin.deployed();
    try {
      await userProfile.createUser(
        web3.utils.utf8ToHex(username1),
        web3.utils.utf8ToHex(ipfsHash),
        { from: account1 }
      );
      assert(true, "the contract should throw here");
    } catch (error) {
      assert(
        /invalid opcode|revert/.test(error),
        "the error message should be invalid opcode or revert"
      );
    }
  });

  it("should allow profile creation from a new address & username", async () => {
    const userProfile = await FileLogin.deployed();
    await userProfile.createUser(
      web3.utils.utf8ToHex(username2),
      web3.utils.utf8ToHex(ipfsHash),
      { from: account2 }
    );
    const userCount = await userProfile.getUserCount({ from: account2 });
    // one user is created by the contract creation
    assert.equal(userCount, 3);
  });

  it("should not allow profile creation from a new address with existing username", async () => {
    const userProfile = await FileLogin.deployed();
    try {
      await userProfile.createUser(
        web3.utils.utf8ToHex(username3),
        web3.utils.utf8ToHex(ipfsHash),
        { from: account3 }
      );
      assert(true, "the contract should throw here");
    } catch (error) {
      assert(
        /invalid opcode|revert/.test(error),
        "the error message should be invalid opcode or revert"
      );
    }
  });
});
