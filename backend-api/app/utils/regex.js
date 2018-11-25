// at least one uppercase or one number (min. 4 chars)
const password = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{4,})';

// check 'account@email'	  
const email = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';

module.exports.password = password;
module.exports.email = email;