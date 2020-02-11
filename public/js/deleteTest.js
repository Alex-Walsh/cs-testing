const db = firebase.firestore();
var email;
var index = 0;
var requestedDeleteID;

function requestTestDeletion(){
  var counter = 0;
  var needed = [];
  var user = firebase.auth().currentUser;
  if (user != null) {
    user.providerData.forEach(function(profile){
      email = profile.email;
    });
    requestedDeleteID = document.getElementById('requestedDeleteID').value;
    db.collection("teachers").doc(email).get().then(function(doc){
      var data = doc.data();
      if (data.tests.includes(requestedDeleteID)) {
        db.collection("tests").doc(requestedDeleteID).delete().then(function(){
        }).catch(function(error){
          console.log("Error deleting document: ", error);
        });
      } else {
        console.log("Insufficient Permissions");
      }
    }).catch(function(error){
      console.log("error while getting teacher profile document: ", error);
    });
    db.collection("teachers").doc(email).get().then(function(doc){
      var data = doc.data();
      var newTests = data.tests.filter((name) => name !== requestedDeleteID);
      console.log(newTests);
      db.collection("teachers").doc(email).update({
        tests: newTests
      });
    }).catch(function(error){
      console.log("Error getting teachers profile and updating");
    });

  } else {
    console.log("You aren't signed in");
  }
}



//They have to own the test to be able to delete it
