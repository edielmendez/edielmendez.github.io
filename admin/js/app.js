$(document).ready(function(){
	firebase.auth().onAuthStateChanged(function(user) {
		
		if(user){
			window.location = "enlaces.html";
		}
	});
})


$(document).on('click',"#btnSingIn",function(){
	var email = $("#txt_email").val();
	var password = $("#txt_password").val();
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  if(error){
		  $("#error-message").show();
	  }else{

		  $("#error-message").removeClass("red lighten-1")
		  .addClass("teal")
		  .html("Accediendo ...")
		  .show();
	  }


	});
});
