# Compromised Password Tester

Small web-app to test the new v2 of the [Have I Been Pwned API](https://haveibeenpwned.com/API/v2).

## Security 
This site never stores or transmits your password. It simply takes the SHA-1 hash (using the [CryptoJS library](https://code.google.com/archive/p/crypto-js/)) and uses the [k-anonymity aspect](https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange) of the API for more security. This only sends the first 5 characters of the hash to the API, which returns a list of related hash suffixes. The site then compares the full hash of your password **locally** to see if there is a match. All of this logic is stored in main.js. 

## Built With

* [Bootstrap](https://getbootstrap.com/)
* [CryptoJS](https://code.google.com/archive/p/crypto-js/)
* [HIBP API](https://haveibeenpwned.com/API/v2) - Troy Hunt is a wizard. 


## Authors
Peter Fiorella - [@PTRFRLL](https://twitter.com/PTRFRLL)