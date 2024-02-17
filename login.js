document.getElementById('newCoord').addEventListener('click', function() {
    window.location.href = 'cordinators.html';
});

function login() {
    console.log("Hell")
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User successfully logged in, and userCredential contains user information.
        const user = userCredential.user;
        
        console.log("User successfully logged in:", user.email);
  
        // Display a success message to the user
        console.log("Login successful. Welcome, " + user.email);

        window.location.href = "coordMain.html"


      })
      .catch((error) => {
        // Handle errors in login
        console.log(error.message);
        document.getElementById("passwordError").textContent = "Invalid Credentials"
        // You can display an error message to the user here if needed.
      });
  }
  document.getElementById('loginButton').addEventListener('click', function() {
    login()
  })

  document.getElementById('forgotPasswordLink').addEventListener('click', function () {

    if(document.getElementById('forgotPasswordSection').style.display == 'block'){
      document.getElementById('forgotPasswordSection').style.display = 'none';
    }
    else{
      document.getElementById('forgotPasswordSection').style.display = 'block';      
    }
});

document.getElementById('sendResetLinkButton').addEventListener('click', function() {
  forgotPass()
})


function forgotPass(){
    var email = document.getElementById('forgotPasswordEmail').value;

            // Send a password reset email
            firebase.auth().sendPasswordResetEmail(email)
                .then(function () {
                    // Password reset email sent successfully
                    alert('Password reset email has been sent to your email address.');
                })
                .catch(function (error) {
                    // Handle errors
                    alert('Error sending password reset email: ' + error.message);
                });
}
