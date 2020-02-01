var db = firebase.firestore();
var current = [];
var email;

function registerTest() {
  var testID = document.getElementById("name").value;
  var challenge = document.getElementById("challenge").value;
  var percentage = document.getElementById("percentage").value;
  var user = firebase.auth().currentUser;
  var docRef = db.collection("tests").doc(testID);

  while (current.length > 0) {
    current.pop();
  }
  docRef.get().then(function(doc) {
      if (doc.exists) {
          window.alert("test already exists")
      } else {
        if (user != null) {
          user.providerData.forEach(function(profile) {
            email = profile.email;
          });
        } else {
          window.alert("you aren't signed in")
        }
        db.collection("tests").doc(testID).set({
          name: testID,
          challenge: challenge,
          percentage: percentage,
          email: email
        });
        window.alert("test created");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  teachers = db.collection("teachers");
  if (user != null) {
    user.providerData.forEach(function(profile) {
      email = profile.email;
    });
  var teachersID = db.collection("teachers").doc(email);
  teachersID.get().then(function(doc){
    if (doc.exists) {
      var data = doc.data();
      console.log(data);
      for (var i = 0; i < data.tests.length; i++) {
        current.push(data.tests[i])
      }
      current.push(testID)
      teachersID.update({
        tests: current
      }).catch(function(error){
        console.log("Error updating document", error);
      });
    } else {
      console.log("Document doesn't exist");
    }
  })
}
//get the array, for each - push to local array
//push TestID
//update(
}

// TODO: make a delete test function
