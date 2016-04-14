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
