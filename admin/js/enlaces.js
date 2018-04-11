var database = firebase.database();
$(document).ready(function(){
	firebase.auth().onAuthStateChanged(function(user) {
		
		if(user){
			//setData();
			readData();	
		}else{
			window.location = "index.html";
		}
	});
})

readData = function(){

	var starCountRef = database.ref('links');
	starCountRef.on('value', function(snapshot) {
		var arr = snapshot.val();
		var arr2 = Object.keys(arr);
		
		for (var i = 0; i < arr2.length; i++) {
			var key = arr2[i];
			var child = "<div class='row'>"+
				"<div class='col s12'>"+
				"<p>"+snapshot.val()[key].descripcion+"</p>"+
				"<a href='"+snapshot.val()[key].link+"'>"+snapshot.val()[key].link+"</a>"+
				"</div>"+
			"</div>";

			$("#contenedor").append(child);
		}

		
		
	  	//updateStarCount(postElement, snapshot.val());
	});
	
}

setData = function(link,descripcion){
	var link = {
		link : link,
		descripcion: descripcion
	}
	database.ref().child('links').push(link);
}

$(document).on('click',"#btn_guardar",function(){
	
	var link = $("#txt_enlace").val();
	var descripcion = $("#txt_descripcion").val();
	setData(link,descripcion);
	$("#txt_enlace").val("")
	$("#txt_descripcion").val("");
})

$(document).on('click',"#btn_singout",function(){
	firebase.auth().signOut().then(function() {
	  console.log('Signed Out');
	}, function(error) {
	  console.error('Sign Out Error', error);
	});
})
