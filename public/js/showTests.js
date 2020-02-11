var db = firebase.firestore();
var current = [];
var email;
let html = '';
const testti = document.querySelector('.tests');
var cheaters = [];
var test;

function showTests() {
  db.collection("tests").doc("cdfr").get().then(function(doc){
    test = doc.data();
    for(var i = 0; i < test.cheaters.length;i++){
      cheaters.push(test.cheaters[i]);
    }
  }).catch(function(error){
    console.log(error);
  });
  var user = firebase.auth().currentUser;
  var teachers = db.collection("teachers");
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
        const indivTests = `
        <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${data.tests[i]}</span>
          <p>${data.tests[i]}</p>
          <p>${cheaters[i]}</p>
        </div>
        <div class="card-action">
          <button onclick="deleteTest()">Delete</button>
          <a href="testSettings.html">Settings</a>
        </div>
      </div>
    </div>
  </div>

        `;
        html += indivTests;
      }
      testti.innerHTML = html;


    } else {
      console.log("Doc doesn't exist");
    }
  })
}
//get the array, for each - push to local array
//push TestID
//update(
}
