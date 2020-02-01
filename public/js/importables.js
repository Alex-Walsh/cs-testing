function userSignout(){
  if (firebase.auth().currentUser) {
      // [START signout]
          firebase.auth().signOut();
          // [END signout]
        }
        firebase.auth().onAuthStateChanged(function(user) {
          if (!user) {
            window.location.href = "student-landing.html";
        }
    })
}
