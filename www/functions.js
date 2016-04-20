
function DisplayAlertEmergency(){
  alert("+info");
}

/* funcions OnLoad */
function OnLoadDefault(){
  /* les funcions q s'executen casi sempre, agrupades */
    EmergencyBar();
}
function OnLoadIndex(){
    OnLoadDefault();
}
/* funcions de llistacasals.html */
function OnLoadLlistacasals(){
  OnLoadDefault();
  casalsListFromServer = getCasalsList();
/*  alert(casalsListFromServer);
  DisplayCasalsList(casalsListFromServer);*/
}
function OnLoadLlistaEvents(){
  OnLoadDefault();
  casalsListFromServer = getCasalsList();
/*  alert(casalsListFromServer);
  DisplayCasalsList(casalsListFromServer);*/
}
function OnLoadCasal(){
  OnLoadDefault();
  // aquí va la crida a la funció que agafa del sessionstorage la uri on anar a buscar la info del casal
}
function OnLoadSignIn(){
  document.body.style.backgroundImage = "url('images/backgroundSignin1.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.overflow= "hidden";
}



function EmergencyBar(){
  document.getElementById("emergencydiv").innerHTML="";
  content="";
  content+="<h1>Alerta!</h1> ";
  content+="<h2>Registre a BlokesFantasma</h2> ";
  content+="<h3>Concentració 20h pl.Revolució</h3>";
  document.getElementById("emergencydiv").innerHTML=content;
}
function OpenPage(linkgiv){
  window.open (linkgiv,'_self',false)
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
          content+="</div>";
          content+="<div class='row'>";
          content+="";
          content+="";
      }
      content+="<div id='"+cl[i].name+"_Box' class='col-md-4 portfolio-item'>";
      content+="<a href='#'>";
      content+="<img class='img-responsive' src='http://placehold.it/700x400' alt=''>";
      content+="</a>";
      content+="<h3>";
      content+="<a href='#'>"+cl[i].name+"</a>";
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
