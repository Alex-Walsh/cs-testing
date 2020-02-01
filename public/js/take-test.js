var db = firebase.firestore();
const testti = document.querySelector('.insert');
var determine = 0;
var currentCheaters = [];
var illegalTests = [];

function base(){
  determine = 0;
  var testID = document.getElementById('testID').value;
  var docRef = db.collection("tests").doc(testID);
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    user.providerData.forEach(function(profile) {
      email = profile.email;
    });
  } else {
    console.log("You aren't signed in");
  }
  dr = db.collection("students").doc(email);

  dr.get().then(function(doc) {
      if (doc.exists) {
          //console.log("Document data:", doc.data());
          var student = doc.data();
          for (var i = 0; i < student.forbidden.length; i++) {
            if (testID === student.forbidden[i]) {
              determine = 1;
              break;
            } else {
              continue;
            }


          }
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      if (determine == 1) {
        window.alert("You are forbidden from this test due to cheating on this test, talk to your teacher if you want to retake the test") } else {
          docRef.get().then(function(doc) {
          if (doc.exists) {
              var test = doc.data();
              let html = '';
              const li = `<ul>
              <div class="test-challenge"> ${test.challenge} </div>
              <div class="test-percentage"> ${test.percentage} </div>
            </ul>
            `;
            html += li;
            testti.innerHTML = html;
            //show the editor once the testID has been submitted
            document.getElementById("editor").style.display = "block";
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
        }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}

var counter = 0;
function cheatCheck() {
  if (!document.hidden && counter != 1) {
    document.getElementById("wrapper").style.display = "none";
    var user = firebase.auth().currentUser;
    var email;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        email = profile.email;
      });
    } else {
      console.log("You aren't signed in");
    }
    console.log(email);
      var db = firebase.firestore();
      // var docRef = db.collection("students").doc(email);
      var students = db.collection("students");
      students.doc(email).update({
        cheat: true });
        addForbidden();
      dr = db.collection("students").doc(email);

      dr.get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              var student = doc.data();
              console.log(student.forbidden[0]);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      counter = 1;
    }

    //if ('make a count variable' < 1) {
      //change the users cheat status, consider making the cheat status client side
    //}
}
document.addEventListener("visibilitychange", function() {
  cheatCheck();
});
