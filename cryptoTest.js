// node.js' bult in crypto lib
const crypto = require('crypto')


// hasing
// on way process - a string that has been hashed can not be unhashed

//sha256
// const hash = crypto.createHash('sha256')

// hash.update('a') // create a hash out of the letter a

// const digest = hash.digest('hex')
// console.log('sha256', digest)

// const userPass = 'abcd123'

// function makeHash(string){
//     const hash = crypto.createHash('sha256')

// hash.update('a') // create a hash out of the letter a

// const digest = hash.digest('hex')
// return digest
// }

// console.log(makeHash(userPass))


// const bcrypt = require('bcrypt')

// const userPassword = 'hello123'

// const hashedPassword = bcrypt.hashSync(userPassword, 12)

//encryption
// two was process where data is locked in an encrypted string and you can use a key to
const cryptoJs = require('crypto-js')

const stringToEncrypt = 'hello i am a secret message'

const encryptionKey = 'myKey'

// Advanced Encryption Standard
const myEncryption = cryptoJs.AES.encrypt(stringToEncrypt, encryptionKey)
console.log(myEncryption.toString())
const decryptedMessage = cryptoJs.AES.decrypt(myEncryption.toString(), encryptionKey)
console.log(decryptedMessage.toString(cryptoJs.enc.Utf8))