
function DisplayAlertEmergency(){
  alert("+info");
}

function OnLoadIndex(){
    EmergencyBar();
}
/* funcions de llistacasals.html */
function OnLoadLlistacasals(){
  EmergencyBar();
  casalsListFromServer = getCasalsList();
/*  alert(casalsListFromServer);
  DisplayCasalsList(casalsListFromServer);*/
}
function OnLoadSignIn(){
  document.body.style.backgroundImage = "url('images/backgroundSignin1.jpg')";
  document.body.style.backgroundSize = "cover";
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

function DisplayCasalsList(casalsListFromServer){
  var cl; //CasalsList
  cl=casalsListFromServer;

  document.getElementById("espaiBoxCasalListCasals").innerHTML="";
  content="";
  for(var i=0; i<cl.length; i++)
  {
    content+="<div id='"+cl[i].name+"_Box' class='boxCasalListCasals'>";
    content+="<h1 onClick='OnCasalFromListCasalsClick(this.id);'>"+cl[i].name+"</h1>";
    content+="<img class='imatgeCasalListCasals' src='imatgestemp/fotocasal1.png' onClick='OnCasalFromListCasalsClick(this.id);' />";
    content+="<h2>"+cl[i].descr+"</h2>";
    content+="<h3><a href='"+cl[i].web+"' target='_blank'>"+cl[i].web+"</a></h3>";
    content+="<h4>"+cl[i].dir+"</h4>";
    content+="</div>";
  }
  document.getElementById("espaiBoxCasalListCasals").innerHTML=content;

}
function OnCasalFromListCasalsClick(idcasal){
  alert("això al clicar et porta a la pàgina del casal");
}
