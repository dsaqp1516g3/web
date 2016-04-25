var logged;
/* ---------------------------------------EMERGÈNCIES-----------------------------
barra emergències */
function EmergencyBar(){
  document.getElementById("emergencydiv").innerHTML="";
  content="";
  content="<span class='glyphicon glyphicon-bullhorn'></span> ";
  content+="<h1>Alerta!</h1> ";
  content+="<h2>Estan desallotjant Can Vies</h2> ";
  content+="<u>Concentració 20h plaça de Sants</u>";
  document.getElementById("emergencydiv").innerHTML=content;

  toastr.error("ULTIMA HORA: estan desallotjant Can Vies");
}
function DisplayAlertEmergency(){
  //toastr.info("funcionalitat encara no disponible");
  window.open("alerta.html");
}

function OnLoadAlerta(){
    OnLoadDefault();
    document.body.style.backgroundImage = "url('http://3.bp.blogspot.com/-tFynHGR4fhY/U4W61P6WySI/AAAAAAAAIw8/eGoi_cJTSdw/s1600/golpe.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow= "hidden";
}

/* ---------------------------------------DEFAULT-----------------------------
lu que s'executa casi sempre a la majoria de les pàgines
les funcions q s'executen casi sempre, agrupades */
function OnLoadDefault(){
  logged="false";
  HTMLMenu();

  setTimeout(function(){ HTMLMenuUser(); }, 0);//afegeixo un delay de 0 ms pq sinó encara no ho ha carregat bé
  HTMLFooter();
  //EmergencyBar();
}
function HTMLMenu(){
  /* carrega l'html del menú i el pinta al <div id="HTMLMenu">, d'aquesta manera
  només editem el fitxer menu.html, i els canvis s'apliquen a totes les pàgines */
  $(document).ready(function(e) {
      $('#HTMLMenu').load('HTMLMenu.html',function(){
        EmergencyBar();
      });
  });

}
function HTMLMenuUser(){
  //si està true, mostra les opcions d'user
  //si està false, mostra el botó de signin i login
  if(logged=="true")
  {
    document.getElementById("loginlogoutbox").innerHTML="";
    $(document).ready(function(e) {
        $('#loginlogoutbox').load('HTMLMenuUserLogged.html',function(){

        });
    });
  }else{
    document.getElementById("loginlogoutbox").innerHTML="";
    $(document).ready(function(e) {
        $('#loginlogoutbox').load('HTMLMenuUserUnlogged.html',function(){

        });
    });
  }
}
function HTMLFooter(){
  /* carrega l'html del menú i el pinta al <div id="HTMLMenu">, d'aquesta manera
  només editem el fitxer menu.html, i els canvis s'apliquen a totes les pàgines */
  $(document).ready(function(e) {
      $('#HTMLFooter').load('HTMLFooter.html',function(){

      });
  });
}


/* ---------------------------------------INDEX-----------------------------
funcions de
index.html
*/
function OnLoadIndex(){
    OnLoadDefault();

}






function OpenPage(linkgiv){
  window.open (linkgiv,'_self',false)
}


/* -----------------------------LLISTACASALS---------------------------------------
funcions de la pàgina
llistacasals.html
*/
function OnLoadLlistaCasals(){
  OnLoadDefault();
  casalsListFromServer = getCasalsList();
/*  alert(casalsListFromServer);
  DisplayCasalsList(casalsListFromServer);*/
}
function DisplayHtmlCasalsList(casalsListFromServer){
  var cl; //CasalsList
  var itemrow;
  cl=casalsListFromServer;
  itemrow=0;
  document.getElementById("espaiBoxCasalListCasals").innerHTML="";
  content="";
  content+="<div class='row'>";
  for(var i=0; i<cl.length; i++)
  {
      if(itemrow>2)
      {/* cada 3 canvia de row */
          itemrow=0;
          content+="</div><br>";
          content+="<div class='row'>";
          content+="";
          content+="";
      }
      content+="<div id='"+cl[i].name+"_Box' class='col-md-4 portfolio-item'>";
      content+="<a href='casal.html'>";
      content+="<img class='img-responsive' src='http://placehold.it/700x400' alt=''>";
      content+="</a>";
      content+="<h3>";
      content+="<a class='linknegre' href='#'>"+cl[i].name+"</a>";
      content+="</h3>";
      content+="<p>"+cl[i].descr+"</p>";
      content+="<p>"+cl[i].web+"</p>";
      content+="<p>"+cl[i].dir+"</p>";
      content+="</div>";
      itemrow++;
  }
  content+="</div>";
  document.getElementById("espaiBoxCasalListCasals").innerHTML=content;

}
function OnCasalFromListCasalsClick(idcasal){
  alert("això al clicar et porta a la pàgina del casal");
}

/* -----------------------------------CASAL---------------------------------
funcions de la pàgina
casal.html
*/
function OnLoadCasal(){
  OnLoadDefault();
  // aquí va la crida a la funció que agafa del sessionstorage la uri on anar a buscar la info del casal

//  getCasalById(idCasal); <-- funcio q encara no està, és la que pilla del restful
          /* mentre no tenim la api a punt, poso l'objecte hardcoded */
            var objCasal={
              description: "El Ateneu La Porka es un centro social okupado y autogestionado en una sucursal bancaria abandonada de Caja Madrid del barrio de Sant Antoni de Barcelona.",
              web: "www.laporka.org",
              direccio: "c/ Av.Mistral 33 baixos",
              mail: "ateneulaporka@riseup.net"
            };
            /* quan tinguem la api a punt, s'elimina això, i s'afegeix la crida a la funció q pilla el data del restful */

  DisplayHTMLCasal(objCasal);
  getEventsListByCasal();
}
function DisplayHTMLCasal(oC){
  /* 'oC' és la variable objecte on va tota la info del casal */


  document.getElementById("casalDescription").innerHTML=oC.description;
  document.getElementById("casalWeb").innerHTML=oC.web;
  document.getElementById("casalDireccio").innerHTML=oC.direccio;
  document.getElementById("casalMail").innerHTML=oC.mail;
  // aqí a partir de les coordenades es monta la url a la api q mostra el lloc
  document.getElementById("casalDescription").src="http://www.openstreetmap.org/export/embed.html?bbox=2.1449947357177734%2C41.371849151666204%2C2.1689414978027344%2C41.38136509656854&amp;layer=mapnik&amp;marker=41.37659924742821%2C2.156968116760254";

  document.getElementById("casalDescription").innerHTML=oC.description;
}


function DisplayHtmlEventsListByCasal(eventsListFromServer){
  var el; //EventsList
  var itemrow;
  itemrow=0;
  el=eventsListFromServer;
  document.getElementById("llistaEventsByCasal").innerHTML="";
  content="";
  content+="<div class='row'>";
  for(var i=0; i<el.length; i++)
  {
    if(itemrow>3)
    {/* cada 3 canvia de row */
        itemrow=0;
        content+="</div><br>";
        content+="<div class='row'>";
        content+="";
        content+="";
    }
      content+="<div id='"+el[i].name+"_Box' class='col-sm-3 col-xs-6'>";
      content+="<a class='linknegre' href='event.html'>";
      content+="    <h4 id='"+el[i].name+"'>"+el[i].name+"</h4>";
      content+="        <img class='img-responsive portfolio-item' src='http://placehold.it/500x300' alt=''>";
      content+="    </a>";
      content+="    <p id='actDescripcio'>"+el[i].descr+"</p>";
      content+="    <p id='actDia'>"+el[i].dia+"</p>";
      content+="</div>";

      itemrow++;
  }
  content+="</div>";
  document.getElementById("llistaEventsByCasal").innerHTML=content;

}

/* ---------------------------------LLISTAEVENTS-----------------------------------
funcions de la pàgina
llistaevents.html
*/
function OnLoadLlistaEvents(){
  OnLoadDefault();
  getEventsList();

}
function DisplayHtmlEventsList(eventsListFromServer){
  var el; //EventsList
  var itemrow;
  itemrow=0;
  el=eventsListFromServer;
  document.getElementById("espaiBoxEventListEvents").innerHTML="";
  content="";
  content+="<div class='row'>";
  for(var i=0; i<el.length; i++)
  {
    if(itemrow>3)
    {/* cada 3 canvia de row */
        itemrow=0;
        content+="</div><br>";
        content+="<div class='row'>";
        content+="";
        content+="";
    }
      content+="<div id='"+el[i].name+"_Box' class='col-sm-3 col-xs-6'>";
      content+="<a class='linknegre' href='event.html'>";
      content+="    <h4 id='"+el[i].name+"'>"+el[i].name+"</h4>";
      content+="        <img class='img-responsive portfolio-item' src='http://placehold.it/500x300' alt=''>";
      content+="    </a>";
      content+="    <p id='actDescripcio'>"+el[i].descr+"</p>";
      content+="    <p id='actDia'>"+el[i].dia+"</p>";
      //content+="    <p id='actHorari'>11h</p>";
      content+="</div>";

      /*content+="<img class='img-responsive' src='http://placehold.it/700x400' alt=''>";
      content+="</a>";
      content+="<h3>";
      content+="<a class='linknegre' href='#'>"+el[i].name+"</a>";
      content+="</h3>";
      content+="<p>"+el[i].descr+"</p>";
      content+="<p>"+el[i].web+"</p>";
      content+="<p>"+el[i].dir+"</p>";
      content+="</div>";*/
      itemrow++;
  }
  content+="</div>";
  document.getElementById("espaiBoxEventListEvents").innerHTML=content;

}

/* -----------------------------------EVENT---------------------------------
funcions de la pàgina
Event.html
*/
function OnLoadEvent(){
  OnLoadDefault();
  // aquí va la crida a la funció que agafa del sessionstorage la uri on anar a buscar la info del Event

//  getEventById(idEvent); <-- funcio q encara no està, és la que pilla del restful
          /* mentre no tenim la api a punt, poso l'objecte hardcoded */
            var objEvent={
              title: "Taller de reparació bicis",
              description: "<b>Vine a apendre a reparar la teva bici!</b> <br> Material necessari: <br>-bici",
              localization: "c/ Av.Mistral 33 baixos",
              mail: "ateneulaporka@riseup.net",
              casalsid: "idcasalcreador",
              hora: "18h-20h"
            };
            /* quan tinguem la api a punt, s'elimina això, i s'afegeix la crida a la funció q pilla el data del restful */

  DisplayHTMLEvent(objEvent);
}
function DisplayHTMLEvent(oE){
  /* 'oC' és la variable objecte on va tota la info del Event */


  document.getElementById("eventTitle").innerHTML=oE.title;
  document.getElementById("eventHora").innerHTML=oE.hora;
  document.getElementById("eventDescription").innerHTML=oE.description;
  document.getElementById("eventLocalization").innerHTML=oE.localization;
  // aqí a partir de les coordenades es monta la url a la api q mostra el lloc
  document.getElementById("eventMap").src="http://www.openstreetmap.org/export/embed.html?bbox=2.1449947357177734%2C41.371849151666204%2C2.1689414978027344%2C41.38136509656854&amp;layer=mapnik&amp;marker=41.37659924742821%2C2.156968116760254";

}

/* ------------------------------------SIGNIN--------------------------------
funcions de la pàgina
signin.html
*/
function OnLoadSignIn(){
  document.body.style.backgroundImage = "url('images/backgroundSignin1.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.overflow= "hidden";
}

function OnSubmitLogin(){
  e.preventDefault();
	if($("#username").val() == "" || $("#password").val() == "")
	{
		if($("#username").val() == "")
		{
			document.getElementById('username').style.background='#585858';
			$('#username').attr('placeholder','Usuario...');
		}
		if($("#password").val() == "")
		{
			document.getElementById('password').style.background='#585858';
			$('#password').attr('placeholder','Contraseña...');
		}
	}
	else
	{
		var loginn = new Object();
		loginn.loginid = $("#username").val();
		loginn.password = $("#password").val();
		log(loginn);
	}

  //toastr.warning("encara no disponible");
}

function OnSubmitSignin(){
e.preventDefault();
	if($("#username").val() == "" || $("#password").val() == "" || $("#email").val() == "" || $("#description").val() == "" || $("#fullname").val() == "")
	{
		if($("#username").val() == "")
		{
			document.getElementById('username').style.background='#585858';
			$('#username').attr('placeholder','Usuario...');
		}
		if($("#password").val() == "")
		{
			document.getElementById('password').style.background='#585858';
			$('#password').attr('placeholder','Contraseña...');
		}

		if($("#email").val() == "")
		{
			document.getElementById('email').style.background='#585858';
			$('#email').attr('placeholder','email...');
		}
		if($("#description").val() == "")
		{
			document.getElementById('description').style.background='#585858';
			$('#description').attr('placeholder','description...');
		}
		if($("#fullname").val() == "")
		{
			document.getElementById('fullname').style.background='#585858';
			$('#fullname').attr('placeholder','fullname...');
		}

	}
	else
	{
		var login = new Object();
		login.loginid = $("#username").val();
		login.password = $("#password").val();
		login.email = $("#email").val();
		login.fullname = $("#fullname").val();
		login.description = $("#description").val();
		register(login);
	}
//toastr.warning("encara no disponible");
}

function OnSubmitLogout(){
e.preventDefault();
	if(($.removeCookie('loginid'))&&($.removeCookie('password'))&&($.removeCookie('token'))){
		alert("¡Hasta pronto!");
		window.location = "index.html"
	}
	else
	{
		alert("¡Antes debes iniciar sesión");
	}
//toastr.warning("encara no disponible");
}

/* ------------------------------------Editar Perfil--------------------------------
perfiluser.html
 */

function  OnloadPerfilmodificar()
{
    document.body.style.backgroundImage = "url('images/Can Vies.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow= "hidden";
}

/* ------------------------------------SIGNIN--------------------------------
funcions de la pàgina
signin.html
*/
function OnLoadCrearEvent(){
  EmergencyBar();
}
