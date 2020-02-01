var db = firebase.firestore();
var needed = [];
var user = firebase.auth().currentUser;
var email;
var index = 0;
var requestedDeleteID;
var counter = 0;


function continueDeletion(){
  requestedDeleteID = document.getElementById('requestedDeleteID').value;
  var teachersID = db.collection("teachers").doc(email);
  teachersID.get().then(function(doc){
    if (doc.exists) {
      var data = doc.data();
      for (var i = 0; i < data.tests.length; i++) {
        needed.push(data.tests[i]);
        if (data.tests[i] === requestedDeleteID) {
          index = i;
        }
      }
      needed.splice(index,1);
    } else {
      console.log("Document doesn't exist");
    }
  }).catch(function(error){
    console.log("something went wrong", error);
  });
  teachersID.update({
    tests: needed
  }).catch(function(error) {
    console.log("Something went wrong while updating the file");
  });
}


function deleteTest(){

  requestedDeleteID = document.getElementById('requestedDeleteID').value;
  if (user != null) {
    user.providerData.foreach(function(profile){
      email = profile.email;
      });
  var teachersID = db.collection("teachers").doc(email);
  var docRef = db.collection("tests").doc(testID);

teachersID.get().then(function(doc){
    tests = doc.data();
    for (var i = 0; i < tests.tests.length; i++) {
      if (tests.tests[i] === requestedDeleteID) {
        counter = 1;
      }
    }
    if (counter == 1) {
      continueDeletion();
    }
}).catch(function(error){
  console.log("Something went wrong", error);
});


}
}








//They have to own the test to be able to delete it
