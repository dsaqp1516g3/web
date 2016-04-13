
function DisplayAlertEmergency(){
  alert("+info");
}

/* funcions de llistacasals.html */
function OnLoadLlistacasals(){
  casalsListFromServer = getCasalsList();
  DisplayCasalsList(casalsListFromServer);
}

function DisplayCasalsList(casalsListFromServer){
  alert(casalsListFromServer);
}
function OnCasalFromListCasalsClick(idcasal){
  alert("això al clicar et porta a la pàgina del casal");
}
