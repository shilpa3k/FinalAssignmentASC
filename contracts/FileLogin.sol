pragma solidity ^0.4.19;


contract FileLogin {
    // We declare high level variables & types used throughout contract
    mapping(address => uint256) private addressToIndex;
    mapping(bytes16 => uint256) private usernameToIndex;
    address[] private addresses;
    address public owner;
    bytes16[] private usernames;
    bytes[] private ipfsHashes;

    // Events will let us emit 'callbacks' back for the User Interface to pickup
    event LogUserCreated(address userAddress);

    // contract owner
    function FileLogin() public {
        owner = msg.sender;
    }

    // Logic in functions can be used to ensure validations that accounts have a
    // unique address or username
    function hasUser(address userAddress)
        public
        view
        returns (bool takenAddress)
    {
        return (addressToIndex[userAddress] > 0);
    }

    function usernameTaken(bytes16 username)
        public
        view
        returns (bool takenUsername)
    {
        return (usernameToIndex[username] > 0);
    }

    function createUser(bytes16 username, bytes ipfsHash)
        public
        returns (bool success)
    {
        // first we validate inputs using the helpers

        require(!hasUser(msg.sender));
        require(!usernameTaken(username));

        // then collect the senders address into the array
        addresses.push(msg.sender);

        // collect the user name
        usernames.push(username);

        // save the IPFS hash that is the reference to an uploaded profile picture
        // IPFS is a web 3.0 File System will cover below
        ipfsHashes.push(ipfsHash);

        // index new entry based on the existing size of addresses in the contract
        addressToIndex[msg.sender] = addresses.length - 1;
        usernameToIndex[username] = addresses.length - 1;

        return true;
    }

    // Other public functions a DApp might want for use in the front-end
    function getUserCount() public view returns (uint256 count) {
        return addresses.length;
    }
}
