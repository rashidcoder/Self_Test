var firebaseConfig = {
  apiKey: "AIzaSyDoVIGopsMI9gOp3VKnDFibO1UggAo-ZH0",
  authDomain: "cov-checker.firebaseapp.com",
  databaseURL: "https://cov-checker.firebaseio.com",
  projectId: "cov-checker",
  storageBucket: "cov-checker.appspot.com",
  messagingSenderId: "294769795175",
  appId: "1:294769795175:web:50b13f75d815028acff4c2",
  measurementId: "G-BL8S1BW7XG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

  const symptoms = {};
  function sym(symptoms_name, value) {
      symptoms[symptoms_name]=value;
      
      console.log(symptoms);
  }
  
  const ok = () => {
    const coords = JSON.parse(localStorage.getItem("user_location"));
      db.collection("symptoms").add({
        cough:symptoms.cough,
        cold: symptoms.cold,
        diarrhea:symptoms.diarrhea,
        sorethroat:symptoms.sorethroat,
        bodypain:symptoms.bodypain,
        headache:symptoms.headache,
        fever:symptoms.fever,
        breathing:symptoms.breathing,
        fatigue:symptoms.fatigue,
        smellTaste:symptoms.smellTaste,
        infectedArea:symptoms.infectedArea,
        directContacts:symptoms.directContact,
        vaccine: symptoms.vaccine,
        phone: document.getElementById('phone').value,
        timer: document.getElementById('sw-time').innerHTML,
        holder: document.getElementById("holder").innerHTML,
        coordinates: new firebase.firestore.GeoPoint(coords[0], coords[1]),
        timestamp: Date.now(),

        }).then(function () {
          console.log("Done!");
        });
        
    };