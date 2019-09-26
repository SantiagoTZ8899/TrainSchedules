// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBRhCqhTh-Jyprabxs9R74cznOImojqzuA",
    authDomain: "train-13586.firebaseapp.com",
    databaseURL: "https://train-13586.firebaseio.com",
    projectId: "train-13586",
    storageBucket: "",
    messagingSenderId: "56955142852",
    appId: "1:56955142852:web:cda13b728e55958c3cff91"
};

firebase.initializeApp(firebaseConfig);

// firebase variable
let database = firebase.firestore();

// button for adding submited form
$('#addTrain').on('click', function(e) {
    e.preventDefault();

    let trainName = $('#trainNameInput').val().trim(),
        destination = $('#destinationInput').val().trim(),
        startTrain = moment($('#startTrainInput').val().trim(), 'HH:mm').format('HH:mm');
        frequency = $('#frequency').val().trim(),

    // object for firebase made of user inputs
    newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: startTrain,
        frequency: frequency
    }

    // push submited form to firebase
    database.ref().push(newTrain);

    console.log(newTrain);

    $('#trainNameInput').val('');
    $('#destinationInput').val('');
    $('#startTrainInput').val('');
    $('#frequency').val('');

}); 

// update current page with submited form info

database.ref().on('child_added', function(childSnapshot) {
    console.log(childSnapshot.val());

    let trainName = childSnapshot.val().name,
        destination = childSnapshot.val().destination,
        startTrain = childSnapshot.val().firstTrain,
        frequency = childSnapshot.val().frequency;

    let convertedTime = moment(startTrain, "HH:mm").subtract(1, 'years'),
        differenceTime = moment().diff(moment(convertedTime), 'minutes'),
        timeLeft = differenceTime % frequency,
        minutesAway = frequency - timeLeft,
        nextTrain = moment().add(minutesAway, 'minutes').format("HH:mm");

        console.log(convertedTime);
        console.log(differenceTime);
        console.log(startTrain);
        console.log(frequency);

    let infoLine = $('<tr>').append(
        $('<tr>').text(trainName),
        $('<tr>').text(destination),
        $('<tr>').text(frequency),
        $('<tr>').text(nextTrain),
        $('<tr>').text(minutesAway)
    );

    $('#trainTable > tbody').append(infoLine);

});

