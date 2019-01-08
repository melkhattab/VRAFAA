var UserProfile = (function() {
  var user_id = null;
  var first_name = "mahmoud";
  var last_name = "el khattab";
  var addr_email = null;

  var getUserId = function() {
    return user_id;    // Or pull this from cookie/localStorage
  };
  var setUserId = function(id) {
    user_id = id;    // Or pull this from cookie/localStorage
  };
  var getFirstName = function() {
    return first_name;    // Or pull this from cookie/localStorage
  };
  var setFirstName = function(fname) {
    first_name = fname;
  };
  var getLastName = function() {
    return last_name;    // Or pull this from cookie/localStorage
  };

  var setLastName = function(lname) {
    last_name = lname;
  };
  var getEmail = function() {
    return addr_email ;    // Or pull this from cookie/localStorage
  };
  var setEmail = function(email) {
    addr_email = email;
  };
  var setUser = function(user) {
    setUserId(user._id);
    setFirstName(user.fname);
    setLastName(user.lname);
    setEmail(user.email);
  };
  return {
    getUserId: getUserId,
    setUserId: setUserId,
    getFirstName: getFirstName,
    getLastName: getLastName,
    setFirstName: setFirstName,
    setLastName: setLastName,
    getEmail: getEmail,
    setEmail: setEmail,
    setUser: setUser,
  }

})();

export default UserProfile;
