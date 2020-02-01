var db = firebase.firestore();
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
          db.collection("teachers").doc(email).get().then(function(doc){
            var data = doc.data();
            for (var i = 0; i < data.tests.length; i++) {
              needed.push(data.tests[i]);
            }
            for (var i = 0; i < data.tests.length; i++) {
              if (data.tests[i] == requestedDeleteID) {
                break;
              } else {
                counter += 1;
              }
            }
            needed.splice(counter, 1);
            console.log(needed);
            db.collection("teachers").doc(email).update({
              tests: needed
            }).catch(function(error){
              console.log("Error while updating teacher's tests: ", error);
            });
          }).catch(function(error){
            console.log(error);
          });
          location.reload();
        }).catch(function(error){
          console.log("Error deleting document: ", error);
        });
      } else {
        console.log("Insufficient Permissions");
      }
    }).catch(function(error){
      console.log("error while getting teacher profile document: ", error);
    });

  } else {
    console.log("You aren't signed in");
  }
}



//They have to own the test to be able to delete it
