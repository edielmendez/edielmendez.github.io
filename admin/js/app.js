$(document).ready(function(){
	/*
	 $("#error-message").removeClass("red lighten-1")
	 .addClass("teal")
	 .html("Accediendo ...").show();*/

	firebase.auth().onAuthStateChanged(function(user) {

		if(user){
			$("#error-message").removeClass("red lighten-1")
	  	 	.addClass("teal")
			.css({"padding":"20px","color":"white"})
	  	 	.html("Accediendo, Espere Por favor").show();
			//console.log("in");
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
	  }


	});
});
