function addForbidden() {
  var email;
  var currentCheaters = [];
  var user = firebase.auth().currentUser;
  var testID = document.getElementById('testID').value;
  var test = db.collection("tests").doc(testID);
  test.get().then(function(doc) {
    if (doc.exists) {
      if (user != null) {
        user.providerData.forEach(function (profile) {
          email = profile.email;
        });
      var data = doc.data();
      if (data.cheaters.length > 0) {
        for (var i = 0; i < data.cheaters.length; i++) {
          currentCheaters.push(data.cheaters[i]);
          currentCheaters.push(email);
          test.update({
            cheaters: currentCheaters
          })
        }
      } else if (data.cheaters.length == 0) {
        for (var i = 0; i < 1; i++) {
          currentCheaters.push(email);
          console.log("cc = ", currentCheaters);
        }
        test.update({
          cheaters: currentCheaters
        });
      }
    } else {
      console.log("something went wrong");
    }
  }
  }).catch(function(error) {
    console.log("Error getting document");
  })
  test.update({
    cheaters: currentCheaters
  });
}

//Making sure that git works
