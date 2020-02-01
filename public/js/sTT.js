function sTT() {
  var user = firebase.auth().currentUser;
  console.log(user);
  if (user != null) {
    window.location.href = "takeTest.html";
  }
}
