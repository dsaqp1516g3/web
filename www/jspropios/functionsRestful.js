/* aqí van les funcions de get, post, etc */

var API_BASE_URL = "http://localhost:8080/okupainfo";

/*
$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});*/




function crearCasal2Restful(data){
  var url = API_BASE_URL + '/casals';
  $.ajax({
    url : url,
    type : 'POST',
    crossDomain : true,
    contentType : 'application/x-www-form-urlencoded',
    dataType : 'json',
    data : data
  }).done(function(data, status, jqxhr) {
        //var inf = data;
        toastr.success("casal creat correctament, falta que el validin");
        setTimeout(function(){
          window.open("index.html", "_self");
        }, 1000);

    }).fail(function() {
      toastr.error("error al crear casal");
  });
}
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
				var repos = data.casals;
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



/*--------------------------------------------Signup-------------------------------------------*/


function signUp2Restful(data){
  var url = API_BASE_URL + '/users';
  $.ajax({
    url : url,
    type : 'POST',
    crossDomain : true,
    contentType : 'application/x-www-form-urlencoded',
    dataType : 'json',
    data : data
  }).done(function(data, status, jqxhr) {
        var inf = data;
        toastr.success("registrat correctament");
        setTimeout(function(){
          window.open("login.html", "_self");
        }, 1000);

    }).fail(function() {
      toastr.error("error al signup");
  });
}


/*--------------------------------------------LOGIN-------------------------------------------*/

function logIn2Restful(data){
	var url = API_BASE_URL + '/login';

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		contentType : 'application/x-www-form-urlencoded',
		dataType : 'json',
		data : data
	}).done(function(data, status, jqxhr) {
    /*document.cookie = "token="+data.token;
    document.cookie = "userid="+data.userid;*/
    localStorage.setItem("token",data.token);
    localStorage.setItem("userid",data.userid);
    localStorage.setItem("username", getValById("username"));
    toastr.success("ets dins");
    setTimeout(function(){
      window.open("index.html", "_self");
    }, 1000);

	}).fail(function() {
    toastr.error("oooops, user o contrassenya incorrectes");
	});
}
/*--------------------------------------------LOGOUT-------------------------------------------*/

function logOut2Restful(data){
	var url = API_BASE_URL + '/login';

//aquestes dues següents linies estan aquí temporalment
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		contentType : 'application/x-www-form-urlencoded',
		dataType : 'json',
		data : data
	}).done(function(data, status, jqxhr) {
    /*document.cookie = "token="+data.token;
    document.cookie = "userid="+data.userid;*/
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    toastr.success("logged out");


	}).fail(function() {
    toastr.error("oooops, no has pogut fer log out");
	});

  setTimeout(function(){
    window.open("index.html", "_self");
  }, 1000);
}

/*-----------------------------------------FUNCIONES-GET----------------------------------------*/

function getCasalByCasalid(CasalByCasalid) {
	var url = API_BASE_URL + '/casals/' + CasalByCasalid; //En el servidor se accede mediante /casals/{Casalid}

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				DisplayHTMLCasal(data);
			}).fail(function() {
        toastr.warning("casal no trobat");
    	});
}
function getEventByEventid(EventByEventid) {
	var url = API_BASE_URL + '/events/' + EventByEventid; //En el servidor se accede mediante /casals/{Casalid}

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				DisplayHTMLEvent(data);
			}).fail(function() {
        toastr.warning("event no trobat");
    	});
}
function getCommentsCasalByCasalid(CasalByCasalid) {
	var url = API_BASE_URL + "/casals/" + CasalByCasalid + "/comments"; //En el servidor se accede mediante /casals/{Casalid}

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				DisplayHTMLCommentsCasal(data);
			}).fail(function() {
        toastr.warning("error als comentaris");
    	});
}
function postComment2Restful(data){
  var url = API_BASE_URL + "/casals/" + data.casalid + "/comments";;
  $.ajax({
    url : url,
    type : 'POST',
    crossDomain : true,
    contentType : 'application/x-www-form-urlencoded',
    dataType : 'json',
    data : data
  }).done(function(data, status, jqxhr) {
        //var inf = data;
        toastr.success("comment afegit");
        setTimeout(function(){
          location.reload();
        }, 1000);

    }).fail(function() {
      location.reload();
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
