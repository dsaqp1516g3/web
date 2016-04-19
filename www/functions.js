
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
  var itemrow;
  cl=casalsListFromServer;
  itemrow=0;

  document.getElementById("espaiBoxCasalListCasals").innerHTML="";
  content="";
  content+="<div class='row'>";
  /*
  content+="";
  */
  for(var i=0; i<cl.length; i++)
  {
      if(itemrow>2)
      {
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


    /*versio anterior, sense bootstrap
    content+="<div id='"+cl[i].name+"_Box' class='boxCasalListCasals'>";
    content+="<h1 onClick='OnCasalFromListCasalsClick(this.id);'>"+cl[i].name+"</h1>";
    content+="<img class='imatgeCasalListCasals' src='imatgestemp/fotocasal1.png' onClick='OnCasalFromListCasalsClick(this.id);' />";
    content+="<h2>"+cl[i].descr+"</h2>";
    content+="<h3><a href='"+cl[i].web+"' target='_blank'>"+cl[i].web+"</a></h3>";
    content+="<h4>"+cl[i].dir+"</h4>";
    content+="</div>";*/
  }
  content+="</div>";
  document.getElementById("espaiBoxCasalListCasals").innerHTML=content;

}
function OnCasalFromListCasalsClick(idcasal){
  alert("això al clicar et porta a la pàgina del casal");
}


	
