var UserProfile = (function() {
  var fname = "";
  var lname = "";
  var email = "";

  var getName = function() {
    return fname+' '+lname;    // Or pull this from cookie/localStorage
  };

  var setName = function(fname,lname) {
    fname = fname;
    lname = lname;
    // Also set this in cookie/localStorage
  };
  var getEmail = function() {
    return email ;    // Or pull this from cookie/localStorage
  };

  var setEmail = function(email) {
    email = email;
    // Also set this in cookie/localStorage
  };
  return {
    getName: getName,
    setName: setName,
    getEmail: getEmail,
    setEmail: setEmail,
  }

})();

export default UserProfile;
