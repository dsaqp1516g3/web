/* aqí van les funcions de get, post, etc */


var API_BASE_URL = "https://api.github.com";
var USERNAME = "idoctnef";
//temporalment, x no posar la contrassenya directament al codi...
//var PASSWORD=prompt("entra contrassenya (és temporal, per pillar del github)", "contrassenya...");
var PASSWORD = "pleirlerpol11";
//var PASSWORD = "";
$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

function getCasalsList() {
	var url = API_BASE_URL + '/users/' + USERNAME + '/repos';
	//$("#repos_result").text('');

  /* temporal pillant del github */
  cl=[{
    name:"",
    id:"",
    descr:"",
    web:"",
    dir:""
  }];
  clAux={
    name:"",
    id:"",
    descr:"",
    web:"",
    dir:""
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
          clAux.name=repo.name;
          clAux.id=repo.id;
          clAux.descr=repo.description;
          clAux.web=repo.html_url;
          clAux.dir=repo.id;
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
        DisplayCasalsList(cl);


	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});

}



/*------------------BOTONES-QUE-TIENEN-LA-FUNCION-GET-Y-LLAMAN-UNA-FUNCION---------------------*/

$("#get_casal_by_casalid").click(function(e) {   //el boton tiene que tener la id get_casal_by_casalid para que llegue aquí y llame a la función
	e.preventDefault();
	getCasalByCasalid($("#CasalByCasalid").val());	//CasalByCasalid es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByCasalid
	});
$("#get_casal_by_email").click(function(e) {   //el boton tiene que tener la id get_casal_by_email para que llegue aquí y llame a la función
	e.preventDefault();
	getCasalByEmail($("#CasalByEmail").val());	//CasalByEmail es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByEmail
	});
$("#get_event_by_id").click(function(e) {   //el boton tiene que tener la id get_event_by_id para que llegue aquí y llame a la función
	e.preventDefault();
	getEventById($("#EventById").val());	//EventById es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByEmail
	});
$("#get_event_by_creatorid").click(function(e) {   //el boton tiene que tener la id get_event_by_creatorid para que llegue aquí y llame a la función
	e.preventDefault();
	getEventByCreatorId($("#EventByCreatorId").val());	//EventByCreatorId es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByEmail
	});
$("#get_event_by_userid").click(function(e) {   //el boton tiene que tener la id get_event_by_userid para que llegue aquí y llame a la función
	e.preventDefault();
	getEventByUserId($("#EventByUserId").val());	//EventByUserId es el sitio donde se tiene que poner la id del casal para que llame a la función getCasalByEmail
	});


/*-----------------------------------------fUNCIONES-GET----------------------------------------*/

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


















