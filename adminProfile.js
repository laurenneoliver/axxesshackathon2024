const loadingSpinner = document.getElementById("loading-spinner");
function toggleEdit(fieldId, button) {
    var inputField = document.getElementById(fieldId);

    if (inputField.readOnly) {
        // If input is readonly, switch to "Done" mode
        inputField.removeAttribute("readonly");
        inputField.style.border = "1px solid hsl(0, 0%, 4%)";
        button.innerHTML = "Done";
        inputField.style.backgroundColor = "gray"
    } else {
        // If input is not readonly, switch to "Edit" mode
        inputField.readOnly = true;
        inputField.style.border = "none"; // Remove the border
        button.innerHTML = "Edit";
        inputField.style.backgroundColor = "white"
    }
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      const uid = user.uid;
      const email = user.email;
      // You can access the user's information and perform actions here.
      console.log("User is signed in:", uid);
      loadingSpinner.style.display = 'block'; 
      getData(uid)
      getImage(uid)
    } else {
      // No user is signed in.
      document.getElementById("loginerr").style.display = "block"
      console.log("No user is signed in.");
    }
  });
  function getImage(uid){

    const storage = firebase.storage();
    const imageId = uid;
    const pathToImage = "adminImages";
  
    // Get a reference to the image
    const imageRef = storage.ref().child(pathToImage + "/image.jpg");
  
    // Get the download URL of the image
    imageRef.getDownloadURL()
      .then((url) => {
        // Use the URL to display the image in an HTML element
        document.getElementById("adminImg").src = url;
      })
      .catch((error) => {
        console.error("Error getting download URL: ", error);
      });
  }


  

  function getData(documentId){

        const db = firebase.firestore();
        const docRef = db.collection('admin').doc(documentId);
        const name = document.getElementById('name')
        const phone = document.getElementById('phone')
        const age = document.getElementById('age')
        const education = document.getElementById('education')
        const profession = document.getElementById('profession')
        const motherTongue = document.getElementById('mother-tongue')
        const village = document.getElementById('village')
        const city = document.getElementById('city')
        const district  = document.getElementById('district')
        const state = document.getElementById('state')
        const country = document.getElementById('country')
       

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              // Document data is available in the 'doc.data()' object
              const data = doc.data();
              console.log("Document data:", data);
              // You can process the data or return it from the function
              name.value = data.name
              phone.value = data.phone
              age.value = data.age
              education.value = data.education
              profession.value = data.profession
              motherTongue.value = data.motherTongue
              village.value = data.village
              city.value = data.city
              district.value = data.district
              state.value = data.state
              country.value = data.country
              pincode.value = String(data.pincode)


            } else {
              console.log("No such document!");
            }
            loadingSpinner.style.display = 'none'; 
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });

          const saveButton = document.getElementById("saveButton");
            saveButton.addEventListener("click", function() {
            console.log("updating")
            saveUpdates(documentId)

            })
      }
  
      

function saveUpdates(documentId){

const db = firebase.firestore();
const docRef = db.collection('admin').doc(documentId);
docRef.update({
    "name": document.getElementById('name').value,
    "phone": document.getElementById('phone').value,
    "age":document.getElementById('age').value,
    "education":document.getElementById('education').value,
    "profession":document.getElementById('profession').value,
    "motherTongue":document.getElementById('mother-tongue').value,
    "vilage":document.getElementById('village').value,
    "city": document.getElementById('city').value,
    "district":document.getElementById('district').value,
    "state":document.getElementById('state').value,
    "country":document.getElementById('country').value,
    "pincode":document.getElementById('pincode').value,
    // "experience":document.getElementById('ministryExperience').value,
    // "coordinatorType":document.getElementById('typeOfCoordinator').value



})
.then(() => {
    console.log("Specific fields updated successfully!");
})
.catch((error) => {
    console.error("Error updating specific field: ", error);
});
}

document.getElementById('name').valuedocument.getElementById('name').valuedocument.getElementById('name').value