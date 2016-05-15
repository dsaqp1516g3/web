/* aqí van les funcions de get, post, etc */

//var API_BASE_URL = "http://0.0.0.0:8880/okupainfo";

var API_BASE_URL = "http://localhost:8080/okupainfo";
var USERNAME = "idoctnef";
//temporalment, x no posar la contrassenya directament al codi...
//var PASSWORD=prompt("entra contrassenya (és temporal, per pillar del github)", "contrassenya...");
var PASSWORD = "";
//var PASSWORD = "";
$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

function getCasalsList() {
	var url = API_BASE_URL + '/casals';
	//$("#repos_result").text('');

  /* temporal pillant del github */
  cl=[{
    casalid:"",
    adminid:"",
    email:"",
    name:"",
    description:"",
    latitude:"",
    longitude:""
  }];
  clAux={
    casalid:"",
    adminid:"",
    email:"",
    name:"",
    description:"",
    latitude:"",
    longitude:""
  };
  /* fi temporal */
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data;
        n=0;
				$.each(repos, function(i, v) {
					var repo = v;


          clAux.casalid=repo.casalid;
          clAux.adminid=repo.adminid;
          clAux.email=repo.email;
          clAux.name=repo.name;
          clAux.description=repo.description;
          clAux.latitude=repo.latitude;
          clAux.longitude=repo.longitude;

          cl.push(JSON.parse(JSON.stringify(clAux)));
					/*$('<br><strong> Name: ' + repo.name + '</strong><br>').appendTo($('#repos_result'));
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result'));
					$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repos_result'));
          */
          n++;

				});
        //return(cl);
        cl.shift(); //elimina el primer element q està buit de l'array
        DisplayHtmlCasalsList(cl);


	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});


}
function getEventsList() {
	var url = API_BASE_URL + '/events';
	//$("#repos_result").text('');

  el=[{
    id:"",
    title:"",
    description:"",
    localization:"",
    latitude:"",
    longitude:"",
    eventdate:"",
    creationTimestamp:"",
    lastModified:""
  }];
  elAux={
    id:"",
    title:"",
    description:"",
    localization:"",
    latitude:"",
    longitude:"",
    eventdate:"",
    creationTimestamp:"",
    lastModified:""
  };

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data.events;
        var n=0;
				$.each(repos, function(i, v) {
					var repo = v;

          elAux.id=repo.id;
          elAux.title=repo.title;
          elAux.description=repo.description;
          elAux.localization=repo.localization;
          elAux.latitude=repo.latitude;
          elAux.longitude=repo.longitude;
          elAux.eventdate=repo.eventdate;
          elAux.creationTimestamp=repo.creationTimestamp;
          elAux.lastModified=repo.lastModified;
          el.push(JSON.parse(JSON.stringify(elAux)));
					/*$('<br><strong> Name: ' + repo.name + '</strong><br>').appendTo($('#repos_result'));
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result'));
					$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repos_result'));
          */
          n++;

				});
        //return(el);
        el.shift(); //elimina el primer element q està buit de l'array
        DisplayHtmlEventsList(el);


	}).fail(function(data) {
		toastr.warning("no events");

	});

}
function getEventsListByCasal() {
	var url = 'https://api.github.com/users/idoctnef/repos'; // del github de moment
	//$("#repos_result").text('');

  /* temporal pillant del github */
  el=[{
    name:"",
    id:"",
    descr:"",
    img:"",
    dia:""
  }];
  elAux={
    name:"",
    id:"",
    descr:"",
    img:"",
    dia:""
  };
  /* fi temporal */
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data;
        n=0;
				$.each(repos, function(i, v) {
					var repo = v;
          elAux.name=repo.name;
          elAux.id=repo.id;
          elAux.descr=repo.description;
          elAux.img=repo.html_url;
          elAux.dia=repo.id;
          el.push(JSON.parse(JSON.stringify(elAux)));
					/*$('<br><strong> Name: ' + repo.name + '</strong><br>').appendTo($('#repos_result'));
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result'));
					$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repos_result'));
          */
          n++;

				});
        //return(el);
        el.shift(); //elimina el primer element q està buit de l'array
        DisplayHtmlEventsListByCasal(el);


	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});

}








/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*--------------SISTEMA-PARA-LOGUEAR-MEDIANTE-LAS-COOKIES-Y-SABER-SI-ESTAMOS-LOGUEADOS----------*/
/*
$(document).ready(function(){
	getCookie();
});
function getCookie() {

	if($.cookie('loginid')) {
		console.log("logeado");
		var user_tag = $.cookie('loginid'); // Nos guarda el nombre del usuario y lo muestra en login_info, cuando nos logueamos aparece nuestro usuario
	    $('#login_info').html('<a style="color:#1C1C1C" href="logout.html"><strong> '+ user_tag +' </strong></a>');
    }
	else
	{
		console.log('no logueado');
		$('#login_info').html('<a style="color:#1C1C1C" href="login.html" ><strong> Iniciar sesión - Registrarse </strong></a>');
	}

}
*/

/*--------------------------------------------REGISTRARSE-------------------------------------------*/

function register(login){
	console.log(login);
	var url = API_BASE_URL + '/users';
	var data = $.param(login);

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		contentType : 'application/x-www-form-urlencoded',
		dataType : 'json',
		data : data
	}).done(function(data, status, jqxhr) {
        var inf = data;
		alert("¡Te has registrado como: "+login.loginid+"! Ya puedes iniciar sesión");

  	}).fail(function() {
		alert("Error al registrarse: Nombre de usuario ya en uso");
	});
}

/*--------------------------------------------LOGIN-------------------------------------------*/

function log(loginn){
	console.log(loginn);
	var url = API_BASE_URL + '/login';
	var data = $.param(loginn);

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		contentType : 'application/x-www-form-urlencoded',
		dataType : 'json',
		data : data
	}).done(function(data, status, jqxhr) {

		var inf = data;

		/*if(inf.loginnSuccesful!= true)*/

if($("#username").val() == "sgr"){
			alert("¡Usuario se llama sgr!");
		}
		else{
				alert("¡Usuario y contraseña correctos!");
			var user_token= inf.token;
			var inputname = $('#username').val();
			var inputpass  = $('#password').val();

			$.cookie('loginid', inputname, { expires: 1 });
			var currentusr = $.cookie('loginid');

			$.cookie('password', inputpass, { expires: 1 });
			var currentpss = $.cookie('password');

			$.cookie('token', user_token, { expires: 1 });
			var token = $.cookie('token');


			console.log(user_token);
			console.log(currentusr);
			console.log(currentpss);

			alert("¡Bienvenido "+loginn.loginid+", tu id es: "+inf.userid+", y tu token de acceso es: "+inf.token+"!");
			window.location = "index.html"

		}


	}).fail(function() {
		alert("Usuario y/o contraseña incorrectos");
	});
}



/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*------------------BOTONES-QUE-TIENEN-LA-FUNCION-GET-Y-LLAMAN-UNA-FUNCION----------------------*/
/*
$("#get_casalbycasalid").click(function(e) {   //el boton tiene que tener la id get_casal_by_casalid para que llegue aquí y llame a la función
	e.preventDefault();
	getCasalByCasalid($("#CasalByCasalid").val());	//CasalByCasalid es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByCasalid
	});
$("#get_casalbyemail").click(function(e) {   //el boton tiene que tener la id get_casal_by_email para que llegue aquí y llame a la función
	e.preventDefault();
	getCasalByEmail($("#CasalByEmail").val());	//CasalByEmail es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByEmail
	});
$("#get_eventbyid").click(function(e) {   //el boton tiene que tener la id get_event_by_id para que llegue aquí y llame a la función
	e.preventDefault();
	getEventById($("#EventById").val());	//EventById es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByEmail
	});
$("#get_eventbycreatorid").click(function(e) {   //el boton tiene que tener la id get_event_by_creatorid para que llegue aquí y llame a la función
	e.preventDefault();
	getEventByCreatorId($("#EventByCreatorId").val());	//EventByCreatorId es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByEmail
	});
$("#get_eventbyuserid").click(function(e) {   //el boton tiene que tener la id get_event_by_userid para que llegue aquí y llame a la función
	e.preventDefault();
	getEventByUserId($("#EventByUserId").val());	//EventByUserId es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByEmail
});*/


/*-----------------------------------------FUNCIONES-GET----------------------------------------*/

function getCasalByCasalid(CasalByCasalid) {
	var url = API_BASE_URL + '/casals/' + CasalByCasalid; //En el servidor se accede mediante /casals/{Casalid}
	$("#result_getCasalByCasalid").text(''); // En result_getCasalByCasalid es donde se van a poner los resultados

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var casal = data;
				//Esto es lo que nos va a escribir en el html donde tengamos puesto el result_getCasalByCasalid
				$("#result_getCasalByCasalid").text();
				$('<strong> Casalid: </strong>' + casal.casalid + '<br>').appendTo($('#result_getCasalByCasalid'));
				$('<strong> Loginid: </strong> ' + casal.loginid + '<br>').appendTo($('#result_getCasalByCasalid'));
				$('<strong> Email: </strong>' + casal.email + '<br>').appendTo($('#result_getCasalByCasalid'));
				$('<strong> Nombre: </strong> ' + casal.fullname + '<br>').appendTo($('#result_getCasalByCasalid'));
				$('<strong> Descripción: </strong>' + casal.description + '<br>').appendTo($('#result_getCasalByCasalid'));

			}).fail(function() {
				$('<div class="alert alert-danger"> No existe un casal con esta id </div>').appendTo($("#result_getCasalByCasalid"));
	});
}
function getCasalByEmail(CasalByEmail) {
	var url = API_BASE_URL + '/casals/' + CasalByEmail; //En el servidor se accede mediante /casals/{email}
	$("#result_getCasalByEmail").text(''); // En result_getCasalByEmail es donde se van a poner los resultados

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var casal = data;
				//Esto es lo que nos va a escribir en el html donde tengamos puesto el result_getCasalByEmail
				$("#result_getCasalByEmail").text();
				$('<strong> Casalid: </strong>' + casal.casalid + '<br>').appendTo($('#result_getCasalByEmail'));
				$('<strong> Loginid: </strong> ' + casal.loginid + '<br>').appendTo($('#result_getCasalByEmail'));
				$('<strong> Email: </strong>' + casal.email + '<br>').appendTo($('#result_getCasalByEmail'));
				$('<strong> Nombre: </strong> ' + casal.fullname + '<br>').appendTo($('#result_getCasalByEmail'));
				$('<strong> Descripción: </strong>' + casal.description + '<br>').appendTo($('#result_getCasalByEmail'));

			}).fail(function() {
				$('<div class="alert alert-danger"> No existe un casal con este email </div>').appendTo($("#result_getCasalByEmail"));
	});
}
function getEventById(EventById) {
	var url = API_BASE_URL + '/eventos/' + EventById; //En el servidor se accede mediante /eventos/{id}
	$("#result_getEventById").text(''); // En result_getEventById es donde se van a poner los resultados

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var event = data;
				//Esto es lo que nos va a escribir en el html donde tengamos puesto el result_getEventById
				$("#result_getEventById").text();
				$('<strong> Id: </strong>' + event.id + '<br>').appendTo($('#result_getEventById'));
				$('<strong> Casalid: </strong> ' + event.casalid + '<br>').appendTo($('#result_getEventById'));
				$('<strong> Title: </strong>' + event.title + '<br>').appendTo($('#result_getEventById'));
				$('<strong> Descripción: </strong>' + event.description + '<br>').appendTo($('#result_getEventById'));

			}).fail(function() {
				$('<div class="alert alert-danger"> No existe un evento con este id </div>').appendTo($("#result_getEventById"));
	});
}
function getEventByCreatorId(EventByCreatorId) {
	var url = API_BASE_URL + '/eventos/' + EventByCreatorId; //En el servidor se accede mediante /eventos/{creatorid}
	$("#result_getEventByCreatorId").text(''); // En result_getCasalByEmail es donde se van a poner los resultados

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var event = data;
				//Esto es lo que nos va a escribir en el html donde tengamos puesto el result_getEventByCreatorId
				$("#result_getEventByCreatorId").text();
				$('<strong> Id: </strong>' + event.id + '<br>').appendTo($('#result_getEventByCreatorId'));
				$('<strong> Casalid: </strong> ' + event.casalid + '<br>').appendTo($('#result_getEventByCreatorId'));
				$('<strong> Title: </strong>' + event.title + '<br>').appendTo($('#result_getEventByCreatorId'));
				$('<strong> Descripción: </strong>' + event.description + '<br>').appendTo($('#result_getEventByCreatorId'));

			}).fail(function() {
				$('<div class="alert alert-danger"> No existe un evento con este creatorid </div>').appendTo($("#result_getEventByCreatorId"));
	});
}
function getCasalByUserId(CasalByUserId) {
	var url = API_BASE_URL + '/casals/' + CasalByUserId; //En el servidor se accede mediante /eventos/{userid}
	$("#result_getCasalByUserId").text(''); // En result_getCasalByUserId es donde se van a poner los resultados

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var event = data;
				//Esto es lo que nos va a escribir en el html donde tengamos puesto el result_getCasalByUserId
				$("#result_getCasalByUserId").text();
				$('<strong> Id: </strong>' + event.id + '<br>').appendTo($('#result_getCasalByUserId'));
				$('<strong> Casalid: </strong> ' + event.casalid + '<br>').appendTo($('#result_getCasalByUserId'));
				$('<strong> Title: </strong>' + event.title + '<br>').appendTo($('#result_getCasalByUserId'));
				$('<strong> Descripción: </strong>' + event.description + '<br>').appendTo($('#result_getCasalByUserId'));

			}).fail(function() {
				$('<div class="alert alert-danger"> No existe un evento con este userid </div>').appendTo($("#result_getCasalByUserId"));
	});
}




/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*------------------BOTONES-QUE-TIENEN-LA-FUNCION-POST-Y-LLAMAN-UNA-FUNCION---------------------*/

$("#post_createCasal").click(function(e) {   //el boton tiene que tener la id post_createCasal para que llegue aquí y llame a la función
	e.preventDefault();
    var Casal = new Object();
    Casal.adminid = $("#post_createCasal_adminid").val(); //añadimos los valores que escribimos en su variable respectiva
	Casal.email = $("#post_createCasal_email").val();
	Casal.name = $("#post_createCasal_name").val();
	Casal.description = $("#post_createCasal_description").val();
	Casal.localization = $("#post_createCasal_localization").val();
	Casal.latitude = $("#post_createCasal_latitude").val();
	Casal.longitude = $("#post_createCasal_longitude").val();
	Casal.validadet = $("#post_createCasal_validadet").val();
    postCreateCasal(Casal);
});
$("#post_createEvent").click(function(e) {   //el boton tiene que tener la id post_createEvent para que llegue aquí y llame a la función
	e.preventDefault();
    var Event = new Object();
    Event.casalid = $("#post_createEvent_casalid").val(); //añadimos los valores que escribimos en su variable respectiva
	Event.title = $("#post_createEvent_title").val();
	Event.description = $("#post_createEvent_description").val();
	Event.localization = $("#post_createEvent_localization").val();
	Event.latitude = $("#post_createEvent_latitude").val();
	Event.longitude = $("#post_createEvent_longitude").val();
    postCreateEvent(Event);
});


/*-----------------------------------------FUNCIONES-POST---------------------------------------*/

function postCreateCasal(Casal) {
    var url = API_BASE_URL + '/casals';
	var data = $.param(Casal);
	var auth_tokens = $.cookie('token');      //Este sistema te da el token directamente a partir del usuario logueado, si no no puede hacer el post
	/*var auth_tokens = '4ddf5787be1a11e5b0d800155d077819';*/	//Esta sería una forma de pasar el token directamente
	$("#result_postCreateCasal").text('');
	console.log(Casal.adminid);
	console.log(Casal.email);
	console.log(Casal.name);

		$.ajax({
			url : url,
			type : 'POST',
			crossDomain : true,
			dataType : 'json',
			data : data,
			contentType : 'application/x-www-form-urlencoded',   //ahora tenemos que acceder mediante urlencoded
			headers: { "X-Auth-Token":auth_tokens	}   //en la cabecera le pasamos el token, al igual que en la api

		}).done(function(data, status, jqxhr) {
			$("#result_postCreateCasal").empty("#result_postCreateCasal");
			$('Se ha creado el casal correctamente y su Casalid es:'+data.casalid+'').appendTo($("#result_postCreateCasal")); //Nos muestra por pantalla la Id del casal que se ha creado
			alert("¡Se ha creado el casal correctamente y su Casalid es:"+data.casalid+"");

		}).fail(function() {
			$("#result_postCreateCasal").empty("#result_postCreateCasal");
			$('<div class="alert alert-danger"> <strong>Error</strong></div>').appendTo($("#result_postCreateCasal"));
			alert("¡No se ha creado el casal!");
		});

}
function postCreateEvent(Event) {
    var url = API_BASE_URL + '/eventos';
	var data = $.param(Event);
	var auth_tokens = $.cookie('token');      //Este sistema te da el token directamente a partir del usuario logueado, si no no puede hacer el post
	/*var auth_tokens = '4ddf5787be1a11e5b0d800155d077819';*/	//Esta sería una forma de pasar el token directamente
	$("#result_postCreateEvent").text('');
	console.log(Event.casalid);
	console.log(Event.title);

		$.ajax({
			url : url,
			type : 'POST',
			crossDomain : true,
			dataType : 'json',
			data : data,
			contentType : 'application/x-www-form-urlencoded',   //ahora tenemos que acceder mediante urlencoded
			headers: { "X-Auth-Token":auth_tokens	}   //en la cabecera le pasamos el token, al igual que en la api

		}).done(function(data, status, jqxhr) {
			$("#result_postCreateEvent").empty("#result_postCreateEvent");
			$('Se ha creado el evento correctamente y su ID es:'+data.id+'').appendTo($("#result_postCreateEvent")); //Nos muestra por pantalla la Id del evento que se ha creado
			alert("¡Se ha creado el evento correctamente y su ID es:"+data.id+"");

		}).fail(function() {
			$("#result_postCreateEvent").empty("#result_postCreateEvent");
			$('<div class="alert alert-danger"> <strong>Error</strong></div>').appendTo($("#result_postCreateEvent"));
			alert("¡No se ha creado el evento!");
		});

}




/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*------------------BOTONES-QUE-TIENEN-LA-FUNCION-DELETE-Y-LLAMAN-UNA-FUNCION-------------------*/

$("#delete_deleteCasal").click(function(e) {    //el boton tiene que tener la id delete_deleteCasal para que llegue aquí y llame a la función
	e.preventDefault();
	deleteCasal($("#deleteCasal").val());
});
$("#delete_deleteEvent").click(function(e) {    //el boton tiene que tener la id delete_deleteEvent para que llegue aquí y llame a la función
	e.preventDefault();
	deleteEvent($("#deleteEvent").val());
});


/*-----------------------------------------FUNCIONES-DELETE-------------------------------------*/

function deleteCasal(deleteCasal) {

	var USERNAME = $.cookie('loginid');  //igual que antes, necesitamos pasarle el loginid y el password
	var PASSWORD = $.cookie('password');

	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});

	var url = API_BASE_URL + '/casals/' + deleteCasal; //En el servidor se accede mediante /casals/{casalid}

	$("#result_deleteCasal").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json'

	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Casal eliminado correctamente</div>').appendTo($("#result_deleteCasal"));
		window.location.reload();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> No hay casals con esta ID! </div>').appendTo($("#result_deleteCasal"));
	});

}
function deleteEvent(deleteEvent) {

	var USERNAME = $.cookie('loginid');  //igual que antes, necesitamos pasarle el loginid y el password
	var PASSWORD = $.cookie('password');

	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});

	var url = API_BASE_URL + '/eventos/' + deleteEvent; //En el servidor se accede mediante /eventos/{id}

	$("#result_deleteEvent").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json'

	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Evento eliminado correctamente</div>').appendTo($("#result_deleteEvent"));
		window.location.reload();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> No hay eventos con esta ID! </div>').appendTo($("#result_deleteEvent"));
	});

}




/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/
/*------------------BOTONES-QUE-TIENEN-LA-FUNCION-UPDATE-Y-LLAMAN-UNA-FUNCION-------------------*/

$("#put_casal_updateProfile").click(function(e) {
	e.preventDefault();
    var casal = new Object();
	casal.casalid = $("#casalUpdateProfile_casalid").val();
	casal.email = $("#casalUpdateProfile_email").val();
	casal.name = $("#casalUpdateProfile_name").val();
	casal.description = $("#casalUpdateProfile_description").val();
	casalUpdateProfile(casal);
});
$("#put_casal_updateLocation").click(function(e) {
	e.preventDefault();
    var casal = new Object();
	casal.casalid = $("#casalUpdateLocation_casalid").val();
	casal.localization = $("#casalUpdateLocation_localization").val();
	casal.latitude = $("#casalUpdateLocation_latitude").val();
	casal.longitude = $("#casalUpdateLocation_longitude").val();
	casalUpdateLocation(casal);
});
$("#put_evento_updateProfile").click(function(e) {
	e.preventDefault();
    var evento = new Object();
	evento.id = $("#eventoUpdateProfile_id").val();
	evento.title = $("#eventoUpdateProfile_title").val();
	evento.description = $("#eventoUpdateProfile_description").val();
	eventoUpdateProfile(evento);
});
$("#put_evento_updateLocation").click(function(e) {
	e.preventDefault();
    var evento = new Object();
	evento.id = $("#eventoUpdateLocation_id").val();
	evento.localization = $("#eventoUpdateLocation_localization").val();
	evento.latitude = $("#eventoUpdateLocation_latitude").val();
	evento.longitude = $("#eventoUpdateLocation_longitude").val();
	eventoUpdateLocation(evento);
});

/*-----------------------------------------FUNCIONES-UPDATE-------------------------------------*/


function casalUpdateProfile(casal) {

	var url = API_BASE_URL + '/casals/' + casal.casalid;
	var data = JSON.stringify(casal);

	$("#result_casalUpdateProfile").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Casal modificado</div>').appendTo($("#result_casalUpdateProfile"));
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Error </strong></div>').appendTo($("#result_casalUpdateProfile"));
	});

}
function casalUpdateLocation(casal) {

	var url = API_BASE_URL + '/casals/' + casal.casalid;
	var data = JSON.stringify(casal);

	$("#result_casalUpdateLocation").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Localización modificada</div>').appendTo($("#result_casalUpdateLocation"));
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Error </strong></div>').appendTo($("#result_casalUpdateLocation"));
	});

}
function eventoUpdateProfile(evento) {

	var url = API_BASE_URL + '/eventos/' + evento.id;
	var data = JSON.stringify(evento);

	$("#result_eventoUpdateProfile").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Comentario modificado</div>').appendTo($("#result_eventoUpdateProfile"));
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Error </strong></div>').appendTo($("#result_eventoUpdateProfile"));
	});

}
function casalUpdateLocation(evento) {

	var url = API_BASE_URL + '/eventos/' + evento.id;
	var data = JSON.stringify(evento);

	$("#result_eventoUpdateLocation").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Localización modificada</div>').appendTo($("#result_eventoUpdateLocation"));
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Error </strong></div>').appendTo($("#result_eventoUpdateLocation"));
	});

}
