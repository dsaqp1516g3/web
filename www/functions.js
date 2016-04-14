
function DisplayAlertEmergency(){
  alert("+info");
}

/* funcions de llistacasals.html */
function OnLoadLlistacasals(){
  casalsListFromServer = getCasalsList();
/*  alert(casalsListFromServer);
  DisplayCasalsList(casalsListFromServer);*/
}

function DisplayCasalsList(casalsListFromServer){
  var cl; //CasalsList
  cl=casalsListFromServer;

  document.getElementById("espaiBoxCasalListCasals").innerHTML="";
  content="";
  for(var i=0; i<cl.length; i++)
  {
    content+="<div id='"+cl[i].name+"_Box' class='boxCasalListCasals' onClick='OnCasalFromListCasalsClick(this.id);'>";
    content+="<h1>"+cl[i].name+"</h1>";
    content+="<img class='imatgeCasalListCasals' src='imatgestemp/fotocasal1.png' />";
    content+="<h2>"+cl[i].descr+"</h2>";
    content+="<h3>"+cl[i].web+"</h3>";
    content+="<h4>"+cl[i].dir+"</h4>";
    content+="</div>";
  }
  document.getElementById("espaiBoxCasalListCasals").innerHTML=content;

}
function OnCasalFromListCasalsClick(idcasal){
  alert("això al clicar et porta a la pàgina del casal");
}
