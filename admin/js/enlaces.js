var database = firebase.database();
var referencia = firebase.database().ref();
$(document).ready(function(){
	$(".modal").modal();
	$('.sidenav').sidenav();
	$(".center-screen").fadeOut(2000);
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


	referencia.child("links").orderByChild("status").equalTo(1).on('value', function(snapshot){
			$("#contenedor").empty();
			var html = "<div class='row'>";
			var i=1;
			snapshot.forEach(function(data){
				html += createDOMNode(data.val().link,data.val().descripcion,data.key);
				if(i%3==0){
					html += "</div>";
					html += "<div class='row'>";
				}
				i++;
				//console.log(data.val());
			});

			$("#contenedor").html(html);
	});

}


function createDOMNode(link,descripcion,key){
	return "<div class='col m4 col s12'>"+
		"<div class='card'>"+
			"<div class='card-content'>"+
				"<span class='card-title activator grey-text text-darken-4'>"+descripcion+"<i class='material-icons right'>more_vert</i></span>"+
			"</div>"+
			"<div class='card-action'>"+
         "<a href='"+key+"' class='deleteLink' ><i class='material-icons red-text'>delete</i></a>"+
			"<a href='"+key+"' class='updateLink' ><i class='material-icons teal-text'>edit</i></a>"+
        "</div>"+
			"<div class='card-reveal'>"+
				"<span class='card-title grey-text text-darken-4'><i class='material-icons right'>close</i></span>"+
				"<p><a href='"+link+"' class='gray-text goTolink'>"+link+"</a></p>"+
		   "</div>"+
	  "</div>"+
	"</div>";

}

$(document).on("click",".goTolink",function(e){
	e.preventDefault();
	var link = $(this).attr("href");
	window.open(link);
})

$(document).on("click",".deleteLink",function(e){
	e.preventDefault();
	var key = $(this).attr("href");
	$("#btn_eliminar_link").attr("href",key);
	$("#modal_eliminar_link").modal("open");

})

$(document).on("click",".updateLink",function(e){
	e.preventDefault();
	var key = $(this).attr("href");
	$("#id_actualizar").val(key)
	referencia.child('links').child(key).once('value',function(snapshot){

		$("#txt_enlace_actualizar").val(snapshot.val().link);
		$("#txt_descripcion_actualizar").val(snapshot.val().descripcion);
		$("#modal_actualizar_link").modal("open");
	})




})

$(document).on("click","#btn_eliminar_link",function(e){
	e.preventDefault();
	var key = $(this).attr("href");
	database.ref().child('links').child(key).child("status").set(0,function(error){
		if(error){
			M.toast({html: 'Error al eliminar el enlace '+error})
		}else{
			M.toast({html: 'Link Eliminado '})
		}
		$("#modal1").modal("close");
	});

})



$(document).on("click","#newEnlace",function(e){

	$("#modal1").modal("open");
	e.preventDefault();
})







setData = function(link,descripcion){
	var link = {
		link : link,
		descripcion: descripcion,
		status : 1
	}
	database.ref().child('links').push(link,function(error){
		if(error){
			M.toast({html: 'Error al guardar el nuevo enlace '+error})
		}else{
			M.toast({html: 'Link guardado '})
		}
		$("#modal1").modal("close");
	});
}
$("#form_guardar").submit(function(event){
	event.preventDefault();
	var link = $("#txt_enlace").val();
	var descripcion = $("#txt_descripcion").val();
	setData(link,descripcion);
	$("#txt_enlace").val("")
	$("#txt_descripcion").val("");
})

$("#form_editar").submit(function(event){
	event.preventDefault();
	var key = $("#id_actualizar").val()
	var link = $("#txt_enlace_actualizar").val();
	var descripcion = $("#txt_descripcion_actualizar").val();
	var link = {
		descripcion : descripcion,
		link : link,
		status : 1
	}

	referencia.child("links").child(key).set(link,function (error) {
		if(error){
			M.toast({html: 'Error al Actualizar el nuevo enlace'+error})
		}else{
			M.toast({html: 'Link Actualizado '})
		}
		$("#modal_actualizar_link").modal("close");
	});
	//setData(link,descripcion);
	$("#txt_enlace_actualizar").val("")
	$("#txt_descripcion_actualizar").val("");
})



/*
referencia.child("links").on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
  console.log(newPost);
  
  console.log("Author: " + newPost.author);
  console.log("Title: " + newPost.title);
  console.log("Previous Post ID: " + prevChildKey);
});*/

$(document).on('click',"#btn_singout",function(){
	firebase.auth().signOut().then(function() {
	  console.log('Signed Out');
	}, function(error) {
	  console.error('Sign Out Error', error);
	});
})
