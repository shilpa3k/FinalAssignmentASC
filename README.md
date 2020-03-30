ADDING USERS AND IPFS LINK

DEPENDENCIES

IPFS
Inter Planetary File Storage IPFS works similarly to the bittorent client in that it uses a content based lookup system instead of an address based on like HTTP. This enables users to request files stored on the network that are the closest to the client, vs at a predefined address. Theoretically if someone from Mars downloaded a movie from IPFS, the first load would take a day or so, but other Mars network users would then get the file from that local source, rather than having to re-download it from Earth!



RUNNING THE APPLICATION

npm install -g truffle
git clone <REPOSITORY>
cd TO FILE
npm install
This smart contract will save entries data on IPFS and the user's ethereum address will store the address to fetch the correct data for the profiles.
  

SECURITY CONSIDERATION

The contract has been designed 
  I.    To allow one address to sign up as one user with a single username.
  II.   To not allow an address to take up someone elses username but show it as taken with the booleon function.
  III.  To show the count of the users so that it can help in making sure whether the number of users is increasing or not after signing up or to whom ever wants to know the count.
  
  
