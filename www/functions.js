
/* ---------------------------------------EMERGÈNCIES-----------------------------
barra emergències */
function EmergencyBar(){
  document.getElementById("emergencydiv").innerHTML="";
  content="";
  content+="<h1>Alerta!</h1> ";
  content+="<h2>Registre a BlokesFantasma</h2> ";
  content+="<h3>Concentració 20h pl.Revolució</h3>";
  document.getElementById("emergencydiv").innerHTML=content;
}
function DisplayAlertEmergency(){
  toastr.info("funcionalitat encara no disponible");
}

/* ---------------------------------------DEFAULT-----------------------------
lu que s'executa casi sempre a la majoria de les pàgines
les funcions q s'executen casi sempre, agrupades */
function OnLoadDefault(){
    EmergencyBar();
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
function OnLoadLlistacasals(){
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


/* ---------------------------------LLISTAEVENTS-----------------------------------
funcions de la pàgina
llistaevents.html
*/
function OnLoadLlistaEvents(){
  OnLoadDefault();
  casalsListFromServer = getCasalsList();
/*  alert(casalsListFromServer);
  DisplayCasalsList(casalsListFromServer);*/
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
function OnSubmitSignin(){
  toastr.warning("encara no disponible");
}
