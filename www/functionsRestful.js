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

function getCasalByCasalid(casalid) {
	var url = API_BASE_URL + '/casals/' + casalid; //En el servidor se accede mediante /casals/{casalid}
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


function getCasalByEmail(email) {
	var url = API_BASE_URL + '/casals/' + email; //En el servidor se accede mediante /casals/{email}
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






















