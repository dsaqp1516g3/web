/* aqí van les funcions de get, post, etc */


var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";
$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});





function getCasalsList() {
	var url = API_BASE_URL + '/users/' + USERNAME + '/repos';
	//$("#repos_result").text('');

  /* temporal pillant del github */
  lc=[{
    nom:"",
    id:"",
    descr:"",
    web:"",
    dir:""
  }];
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
          lc[n].nom=repo.name;
          lc[n].id=repo.id;
          lc[n].descr=repo.description;
          lc[n].web=repo.html_url;
          lc[n].dir=repo.id;
					/*$('<br><strong> Name: ' + repo.name + '</strong><br>').appendTo($('#repos_result'));
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result'));
					$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repos_result'));
          */
          n++;

				});
        return(lc);


	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});

}
