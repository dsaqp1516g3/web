/* aqí van les funcions de get, post, etc */

var API_BASE_URL = "http://eetacdsa1c.upc.es:8080/okupainfo";
var URL_IMAGE = "http://eetacdsa1c.upc.es";
//var API_BASE_URL = "http://localhost:8080/okupainfo";

/*
$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});*/


var unvalidatedAux, validatedAux, llistacasalsSimple, nomCasalDeUser, idCasalDeUser;

function crearCasal2Restful(data){
  var url = API_BASE_URL + '/casals';
  /*$.ajax({
    url : url,
    type : 'POST',
    crossDomain : true,
    contentType : 'application/x-www-form-urlencoded',
    //application/vnd.dsa.okupainfo.casal+json
    headers: {"X-Auth-Token": localStorage.getItem("token"),
  "Content-Type": "application/vnd.dsa.okupainfo.casal+json"},
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
  });*/
  var form = new FormData();
  form.append("image", data.image);
  form.append("localization", data.localization);
  form.append("email", data.email);
  form.append("name", data.name);
  form.append("description", data.description);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": url,
  "method": "POST",
  "headers": {
    "x-auth-token": localStorage.getItem("token"),
    "cache-control": "no-cache",
    "postman-token": "d7530090-3506-a39b-207e-61e10cf75e78"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
};

$.ajax(settings).done(function (data) {
    toastr.success("casal creat correctament, falta que el validin");
    setTimeout(function(){
      window.open("index.html", "_self");
    }, 1000);
  }).fail(function() {
    toastr.error("error al crear casal");
  });
}
function getCasalsList() {
	var url = API_BASE_URL + '/casals/validated';
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
          clAux.image=repo.image;

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
		//$("#repos_result").text("No repositories.");
	});


}
function getCasalsListSimplePerComprovar() {
	var url = API_BASE_URL + '/casals';

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				console.log(data);
        llistacasalsSimple=data;
        ComprovaCasalDeUser(localStorage.getItem("userid"));

	}).fail(function() {
		console.log("no casals");
	});
}
function getCasalsListValidated() {
	var url = API_BASE_URL + '/casals/validated';
	//$("#repos_result").text('');


	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
    headers: {"X-Auth-Token": "41c46d242e5a11e69a23dc85de8e365f"},
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				console.log(data);
        validatedAux=data;
        ValidationHTMLValidated(data);


	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});


}

function getCasalsListUnvalidated() {
	var url = API_BASE_URL + '/casals/unvalidated';
	//$("#repos_result").text('');


	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
    headers: {"X-Auth-Token": "41c46d242e5a11e69a23dc85de8e365f"},
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				console.log(data);
        unvalidatedAux=data;
        ValidationHTMLUnvalidated(data);

	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});


}
function validate2Restful(data){
  var url = API_BASE_URL + '/casals/'+data.casalid;
  /*$.ajax({
    url : url,
    type : 'PUT',
    crossDomain : true,
    //ontentType : 'application/x-www-form-urlencoded',//application/vnd.dsa.okupainfo.casal+json
    headers: {
      "Content-Type": "application/vnd.dsa.okupainfo.casal+json"
    },
    dataType : 'json',
    data : data
  }).done(function(data, status, jqxhr) {
        console.log(data);
        setTimeout(function(){
          window.open("validation.html", "_self");
        }, 1000);
    }).fail(function() {
      toastr.error("error al update");
  });*/
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "PUT",
    "headers": {
      "content-type": "application/vnd.dsa.okupainfo.casal+json",
      "cache-control": "no-cache",
      "postman-token": "83c2adbc-ec51-e525-d2f4-471689c05cf0"
    },
      "data": "{\n  \"casalid\": \""+data.casalid+"\",\n  \"adminid\": \""+data.adminid+"\",\n  \"email\": \""+data.email+"\",\n  \"name\": \""+data.name+"\",\n  \"description\": \""+data.description+"\",\n  \"validated\": "+data.validated+",\n  \"localization\": \""+data.localization+"\"\n}"
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    toastr.success("actualitzat");
    setTimeout(function(){
      window.open("validation.html", "_self");
    }, 1000);
  }).fail(function() {
    toastr.error("error al update");
  });
}

function getEventsList() {
	var url = API_BASE_URL + '/events';
	//$("#repos_result").text('');


	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

        DisplayHtmlEventsList(data);


	}).fail(function(data) {
		toastr.warning("no events");

	});

}
function getUsersList() {
	var url = API_BASE_URL + '/users';
	//$("#repos_result").text('');


	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

        DisplayHtmlUsersList(data);


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
  /*$.ajax({
    url : url,
    type : 'POST',
    crossDomain : true,
    mimeType : 'multipart/form-data',
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
  });*/
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://eetacdsa1c.upc.es:8080/okupainfo/users",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "1566ec8e-cf16-ed71-0c45-0235309e523b"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": data
}

$.ajax(settings).done(function (data) {
  var inf = data;
  toastr.success("registrat correctament");
  setTimeout(function(){
    window.open("login.html", "_self");
  }, 1000);
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
  localStorage.removeItem("username");
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
    //toastr.error("oooops, no has pogut fer log out");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    toastr.success("logged out");
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
function getCasalNameByCasalid(CasalByCasalid) {
	var url = API_BASE_URL + '/casals/' + CasalByCasalid; //En el servidor se accede mediante /casals/{Casalid}

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
    returnedCasalNameByCasalid(data);
			}).fail(function() {
        toastr.warning("casal no trobat");
    	});
}
function getEventByEventid(EventByEventid, idcasalaux) {
	var url = API_BASE_URL + '/casals/'+idcasalaux+'/events/' + EventByEventid; //En el servidor se accede mediante /casals/{Casalid}

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
function getUserById(idg, idhtml){
  var url = API_BASE_URL + "/users/" + idg; //En el servidor se accede mediante /casals/{Casalid}
  var loginidaux="";
  $.ajax({
    url : url,
    type : 'GET',
    crossDomain : true,
    dataType : 'json',
  }).done(function(data, status, jqxhr) {

      loginidaux=data.loginid;
      document.getElementById(idhtml).innerHTML=loginidaux;
    }).fail(function() {
      loginidaux="no user";
    });
    return(loginidaux);
}
function getUserByIdUserHtml(iduser){
  var url = API_BASE_URL + "/users/" + iduser;
  $.ajax({
    url : url,
    type : 'GET',
    crossDomain : true,
    dataType : 'json',
  }).done(function(data, status, jqxhr) {

      document.getElementById("loginid").innerHTML="user: <b>" + data.loginid + "</b>";
      document.getElementById("email").innerHTML="email: <b>" + data.email + "</b>";
      document.getElementById("fullname").innerHTML="nom complet: <b>" + data.fullname + "</b>";
      document.getElementById("description").innerHTML="descripció: <b>" + data.description + "</b>";
      if(data.image)
      {
        document.getElementById("imgUser").src=URL_IMAGE + "/uploadFolder/" + data.image + ".png";
      }

    }).fail(function() {
      loginidaux="no user";
    });
}
function getUserByIdUserHtmlEdit(iduser){
  var url = API_BASE_URL + "/users/" + iduser;
  $.ajax({
    url : url,
    type : 'GET',
    crossDomain : true,
    dataType : 'json',
  }).done(function(data, status, jqxhr) {

      document.getElementById("username").value=data.loginid;
      document.getElementById("email").value=data.email;
      document.getElementById("fullname").value=data.fullname;
      document.getElementById("description").value=data.description;


    }).fail(function() {
      loginidaux="no user";
    });
}
function getEventsAssistanceByUserId(iduser){
  var url = API_BASE_URL + "/events/assistance/" + iduser;
  /*$.ajax({
    url : url,
    type : 'GET',
    crossDomain : true,
    dataType : 'json',
  }).done(function(data, status, jqxhr) {
    //for(var i=0; i<data.events.length; i++)
  //  {
//      document.getElementById("assistance").innerHTML=data.events[i].title;
//    }
    document.getElementById("assistance").innerHTML="";
    var h;
    h="<hr><b>Esdeveniments on assisteix l'user:</b><br>";
    h+="<ul class='list-group'>";
		for(var i=0; i<data.events[i].length; i++)
    {
      h+="<li class='list-group-item'>";
      h+=data.events[i].title;
      h+="</li>";
    }
    h+="</ul>";
    document.getElementById("comments").innerHTML=h;


    }).fail(function() {
      toastr.warning("no user");
    });*/
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET",
      "headers": {
        "x-auth-token": localStorage.getItem("token"),
        "cache-control": "no-cache",
        "postman-token": "b92dfac5-efdd-d311-4e85-8384abfbd176"
      }
    }

    $.ajax(settings).done(function (data) {
      document.getElementById("assistance").innerHTML="";
      var h;
      h="<hr><b>Esdeveniments on assisteix l'user:</b><br>";
      h+="<ul class='list-group'>";
  		for(var i=0; i<data.events.length; i++)
      {
        h+="<li class='list-group-item'>";
        h+=data.events[i].title;
        h+="</li>";
      }
      h+="</ul>";
      document.getElementById("assistance").innerHTML=h;
    });
}
function getCommentsCasalByCasalid(CasalByCasalid) {
	var url = API_BASE_URL + "/casals/" + CasalByCasalid + "/comments"; //En el servidor se accede mediante /casals/{Casalid}

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
    headers: {"X-Auth-Token": localStorage.getItem("token")},
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				DisplayHTMLCommentsCasal(data);
			}).fail(function() {
        //toastr.warning("error als comentaris");
        toastr.warning("per veure els comentaris has d'estar dins");
        document.getElementById("caixaComments").className=" own-hidden";
    	});
}
function getEventsByCasalId(casalid){
  var url = API_BASE_URL + "/casals/" + casalid + "/events"; //En el servidor se accede mediante /casals/{Casalid}

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
    headers: {"X-Auth-Token": localStorage.getItem("token")},
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				DisplayHtmlEventsListByCasal(data);
			}).fail(function() {
        document.getElementById("llistaEventsByCasal").innerHTML="sense esdeveniments";
    	});
}
function postComment2Restful(data){
  var url = API_BASE_URL + "/casals/" + data.casalid + "/comments";;
  $.ajax({
    url : url,
    type : 'POST',
    crossDomain : true,
    contentType : 'application/x-www-form-urlencoded',
    headers: {"X-Auth-Token": localStorage.getItem("token")},
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


function crearEvent2Restful(d){
  var url = API_BASE_URL + '/casals/' + d.casalid; //En el servidor se accede mediante /eventos/{userid}

  var form = new FormData();
  form.append("title", d.title);
  form.append("description", d.description);
  form.append("localization", d.localization);
  form.append("image", d.image);
  form.append("eventdate", "26012016");

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "POST",
    "headers": {
      "x-auth-token": localStorage.getItem("token"),
      "cache-control": "no-cache",
      "postman-token": "49c22e67-2087-f58b-7dfc-cbe386b419e6"
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
  }

  $.ajax(settings).done(function (data) {
    toastr.success("event creat");
    setTimeout(function(){
      window.open("llistaevents.html", "_self");
    }, 1000);

  });
}
function assistirEvent2Restful(idevent, userid){
  var url = API_BASE_URL + '/events/' + idevent+"/"+userid;

  var settings = {
  "async": true,
  "crossDomain": true,
  "url": url,
  "method": "POST",
  "headers": {
    "x-auth-token": localStorage.getItem("token"),
    "cache-control": "no-cache",
    "postman-token": "e9fc3076-4e8a-ffae-f02a-a597ec9bfc28"
  }
}

$.ajax(settings).done(function (response) {
  toastr.info("assistiràs a l'event");

  window.open("event.html?value=" + window.location.href.split("?value=")[1], "_self");
});
}

function getCasalsCommentsByUserId(userid){
  var url = API_BASE_URL + "/casals/comments/" + userid; //En el servidor se accede mediante /casals/{Casalid}

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
    headers: {"X-Auth-Token": localStorage.getItem("token")},
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
    document.getElementById("comments").innerHTML="";
    var h;
    h="<hr><b>Comentaris de l'user:</b><br>";
    h+="<ul class='list-group'>";
		for(var i=0; i<data.comments_casals.length; i++)
    {
      h+="<li class='list-group-item'>";
      h+=data.comments_casals[i].content;
      h+="</li>";
    }
    h+="</ul>";
    document.getElementById("comments").innerHTML=h;

	}).fail(function() {
    if(document.getElementById("llistaEventsByCasal"))
    {
      document.getElementById("llistaEventsByCasal").innerHTML="sense esdeveniments";
    }
	});
}


function OnBtnActualitzaUser(){
  var url = API_BASE_URL + '/users/'+localStorage.getItem("userid");

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "PUT",
    "headers": {
      "content-type": "application/vnd.dsa.okupainfo.casal+json",
      "cache-control": "no-cache",
      "postman-token": "83c2adbc-ec51-e525-d2f4-471689c05cf0"
    },
      "data": "{\n  \"casalid\": \""+data.casalid+"\",\n  \"adminid\": \""+data.adminid+"\",\n  \"email\": \""+data.email+"\",\n  \"name\": \""+data.name+"\",\n  \"description\": \""+data.description+"\",\n  \"validated\": "+data.validated+",\n  \"localization\": \""+data.localization+"\"\n}"
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    toastr.success("actualitzat");
    setTimeout(function(){
      window.open("validation.html", "_self");
    }, 1000);
  }).fail(function() {
    toastr.error("error al update");
  });
}
function userAsiste(eventid, userid){
  var url = API_BASE_URL + '/events/' + eventid + "/" + userid;
  $.ajax({
    url : url,
    type : 'GET',
    crossDomain : true,
    dataType : 'json',
  }).done(function(data, status, jqxhr) {
    //userAlreadyAssists(data);
    if(data==true){
      document.getElementById("assistireBtn").className+=" own-hidden";
      toastr.success("assisteixes a l'event");
    }
      }).fail(function() {
      });
}

function getValoracion(casalid){
  var url = API_BASE_URL + '/casals/' + casalid + "/valoracion";
  $.ajax({
    url : url,
    type : 'GET',
    crossDomain : true,
    dataType : 'json',
  }).done(function(data, status, jqxhr) {
    //userAlreadyAssists(data);
    valoracion2HTML(data);
      }).fail(function() {
      });
}

function AddValoracionPos(){
  var url = API_BASE_URL + '/casals/' + window.location.href.split("?value=")[1] + '/valoracion';
  var data={
    creatorid: localStorage.getItem("userid"),
    valoracion: true
  };
  $.ajax({
    url : url,
    type : 'POST',
    crossDomain : true,
    contentType : 'application/x-www-form-urlencoded',
    dataType : 'json',
    data : data
  }).done(function(data, status, jqxhr) {

    alert(data);

  }).fail(function() {
    toastr.error("no s'ha pogut afegir la valoració");
  });
}
