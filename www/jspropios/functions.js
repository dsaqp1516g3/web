var logged;

/* ------ coses que es carreguen al començar ----*/
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});


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
  if(localStorage.getItem("userid"))
  {

    logged="true";
  }else{
    logged="false";
  }
  HTMLMenu();
  if(logged=="true")
  {
    //getCasalsListValidated();
    //getCasalsList();
    getCasalsListSimplePerComprovar();

  }else{
    setTimeout(function(){ HTMLMenuUser(); }, 500);
  }
  //setTimeout(function(){ HTMLMenuUser(); }, 2500);//afegeixo un delay de 0 ms pq sinó encara no ho ha carregat bé
  HTMLFooter();
  //EmergencyBar();

}
function HTMLMenu(){
  /* carrega l'html del menú i el pinta al <div id="HTMLMenu">, d'aquesta manera
  només editem el fitxer menu.html, i els canvis s'apliquen a totes les pàgines */
  $(window).load(function(){
      $('#HTMLMenu').load('HTMLMenu.html',function(){
        //EmergencyBar();
        //HTMLMenuUser();
      });
  });

}
function HTMLMenuUser(){
  //si està true, mostra les opcions d'user
  //si està false, mostra el botó de signin i login
  if(logged=="true")
  {
    $(document).ready(function(e) {
      document.getElementById("loginlogoutbox").innerHTML="";
        $('#loginlogoutbox').load('HTMLMenuUserLogged.html',function(){
          document.getElementById("usernameid").innerHTML=localStorage.getItem("username");
          if(localStorage.getItem("username")=="admin")
          {
            document.getElementById("liCrearEventMenu").className="";
            document.getElementById("liValidateCasals").className="";
          }else if(nomCasalDeUser!="noCasal"){
            document.getElementById("liCrearEventMenu").className="";
          }
        });
    });
  }else{
    $(document).ready(function(e) {
      document.getElementById("loginlogoutbox").innerHTML="";
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
  getCasalsList();
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
      if(itemrow>3)
      {/* cada 3 canvia de row */
          itemrow=0;
          content+="</div><br>";
          content+="<div class='row'>";
          content+="";
          content+="";
      }
      content+="<div id='"+cl[i].casalid+"_Box' onclick='OnClickOverCasalBox(this.id)' class='col-md-4 portfolio-item own-casalBox'>";
      //content+="<a href='casal.html'>";
      content+="<img class='img-responsive' src='uploadFolder/"+cl[i].image+".png' alt=''>";
      //content+="</a>";
      content+="<h3>";
      content+=cl[i].name;
      content+="</h3>";
      content+="<p>"+cl[i].description+"</p>";
      content+="<p>"+cl[i].email+"</p>";
      content+="<p>" + cl[i].latitude + " - " + cl[i].longitude + "</p>";
      content+="</div>";
      itemrow++;
  }
  content+="</div>";
  document.getElementById("espaiBoxCasalListCasals").innerHTML=content;

  //afegeix el núm de casals al badge del títol
  document.getElementById("badgeNumCasals").innerHTML=cl.length;
}
function OnClickOverCasalBox(idcasal){
  idcasal=idcasal.replace("_Box", "");
  //getCasalByCasalid(idcasal);
  //localStorage.setItem("idCasal",idcasal);
  window.open("casal.html?value="+idcasal, "_self");
}
/* crear casal */
function OnBtnValidateCasal(){
  d={
    adminid:"",
    name:"",
    description:"",
    email:"",
    localization:"",
    validated:"",
    image:""
  };
  d.adminid=localStorage.getItem("userid");
  d.name=getValById("name");
  d.description=getValById("description");
  d.email=getValById("email");
  d.localization=getValById("localization");
  d.validated=false;
  d.image=document.getElementById("image").files[0];
  if((d.email.indexOf("@") > -1)&&(d.email.indexOf(".") > -1))
  {
    crearCasal2Restful(d);
  }else{
    toastr.error("format email incorrecte");
  }
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
  getCasalByCasalid(window.location.href.split("?value=")[1]);

  //ara cal posar els esdeveniments del casal
  getEventsByCasalId(window.location.href.split("?value=")[1]);

  //i ara els comments del casal
  getCommentsCasalByCasalid(window.location.href.split("?value=")[1]);

  getValoracion(window.location.href.split("?value=")[1]);

}
function valoracion2HTML(data){
  if(data.valoraciones.length>0)
  {

  }else{
    toastr.warning("casal sense valoracions");
  }
}
function DisplayHTMLCasal(oC){
  /* 'oC' és la variable objecte on va tota la info del casal */


  document.getElementById("casalName").innerHTML=oC.name;
  document.getElementById("casalDescription").innerHTML=oC.description;
  document.getElementById("casalWeb").innerHTML=oC.email;
  document.getElementById("casalDireccio").innerHTML=oC.description;
  document.getElementById("casalMail").innerHTML=oC.mail;
  document.getElementById("image").src="uploadFolder/"+oC.image+".png";
  // aqí a partir de les coordenades es monta la url a la api q mostra el lloc
  var urlMap, marc1, marc2, marc3, marc4;
  //urlMap="http://www.openstreetmap.org/export/embed.html?bbox=2.1449947357177734%2C41.371849151666204%2C2.1689414978027344%2C41.38136509656854&amp;layer=mapnik&amp;marker=41.37659924742821%2C2.156968116760254";
  marc1=oC.latitude-0.00475009576;//longitude
  marc2=oC.longitude-0.00475009576;
  marc3=oC.latitude+0.00475009576;
  marc4=oC.longitude+0.00475009576;
  urlMap="http://www.openstreetmap.org/export/embed.html?bbox="+marc1+"%2C"+marc2+"%2C"+marc3+"%2C"+marc4+"&amp;layer=mapnik&amp;marker="+oC.longitude+"%2C"+oC.latitude;
//                                                                                                    NaN %2C   41.26815520.01     %2C  1.96617210.01&amp;layer=mapnik&amp;marker=1.9661721%2C41.2681552
  document.getElementById("iframeMap").src=urlMap;

  document.getElementById("casalDescription").innerHTML=oC.description;
}

function DisplayHTMLCommentsCasal(data){
  var content="";
  for(var i=0; i<data.comments_casals.length; i++)
  {
    content+="<div id='"+data.comments_casals[i].creatorid+"' onclick='ChargeUserById(this.id)' class='panel panel-default own-cursorPointer'>";
    content+="<div id='"+data.comments_casals[i].id+"' class='panel-heading'>";
    //content+=getUserById(data.comments_casals[i].creatorid);
    content+="</div>";
    content+="<div class='panel-body'>";
    content+=data.comments_casals[i].content;
    content+="</div>";
    content+="</div>";
  }

/*
<div class="panel panel-default">
  <div class="panel-body">
    Basic panel
  </div>
</div>
*/
  document.getElementById("commentsByCasal").innerHTML=content;

  for(var i=0; i<data.comments_casals.length; i++)
  {
    getUserById(data.comments_casals[i].creatorid, data.comments_casals[i].id);
  }
}


function DisplayHtmlEventsListByCasal(data){
  var itemrow;
  itemrow=0;
  document.getElementById("llistaEventsByCasal").innerHTML="";
  content="";
  content+="<div class='row'>";
  for(var i=0; i<data.events.length; i++)
  {
    if(itemrow>3)
    {/* cada 3 canvia de row */
        itemrow=0;
        content+="</div><br>";
        content+="<div class='row'>";
        content+="";
        content+="";
    }
    content+="<div id='"+data.events[i].id+"_"+data.events[i].casalid+"' onclick='OnClickOverEventBox(this.id)'  class='col-sm-3 col-xs-6'>";
    content+="<div class='panel panel-primary paddings-lateral fonsgris2'>";
    //content+="<div class='panel-heading'>";
    content+="  <a href='event.html'>";
    content+="    <h4 id='"+data.events[i].title+"' class='text-info'>"+data.events[i].title;//al badge surtirà el dia de l'events
    //content+="      <text id='actDia' class='label label-info pull-right'>"+data.events[i].eventdate/1000+"</text>";
    content+="    </h4>";
    //content+="  </div>";// </panel-heading
    content+="    <img class='img-responsive portfolio-item borderradius5' src='http://placehold.it/500x300' alt=''>";
    content+="  </a>";
    content+="    <p id='actDescripcio'>"+data.events[i].description+"</p>";

    //content+="    <p id='actHorari'>11h</p>";
    content+="</div>";// </ panel panel-info
    content+="</div>";// </ el[i].name+"_Box'

      itemrow++;
  }
  content+="</div>";
  document.getElementById("llistaEventsByCasal").innerHTML=content;

  //afegeix el núm d'events al badge del títol de l'inici de mostrar els events del casal
  document.getElementById("badgeNumEvents").innerHTML=data.events.length;
}

function OnClickBtnShowAddComment(idbtn){
  document.getElementById(idbtn).style.display="none";
  document.getElementById("commentAdderBox").style.display="block";
}
function OnClickBtnAddComment(){
  var d;
  d={
    casalid:"",
    content:"",
    creatorid:""
  };
  d.casalid=window.location.href.split("?value=")[1];
  d.content=document.getElementById("textAreaComment").value;
  d.creatorid=localStorage.getItem("userid");
  postComment2Restful(d);
}
/* ---------------------------------LLISTAEVENTS-----------------------------------
funcions de la pàgina
llistaevents.html
*/
function OnLoadLlistaEvents(){
  OnLoadDefault();
  getEventsList();

}
function DisplayHtmlEventsList(d){
  var itemrow;
  itemrow=0;
  document.getElementById("espaiBoxEventListEvents").innerHTML="";
  content="";
  content+="<div class='row'>";
  for(var i=0; i<d.events.length; i++)
  {
    if(itemrow>3)
    {/* cada 3 canvia de row */
        itemrow=0;
        content+="</div><br>";
        content+="<div class='row'>";
        content+="";
        content+="";
    }
      content+="<div id='"+d.events[i].id+"_"+d.events[i].casalid+"' onclick='OnClickOverEventBox(this.id)' class='col-sm-3 col-xs-6'>";
      content+="<div class='panel panel-primary paddings-lateral fonsgris2'>";
      //content+="<div class='panel-heading'>";
      content+="  <a href='event.html'>";
      content+="    <h4 id='"+d.events[i].title+"' class=''>"+d.events[i].title;//al badge surtirà el dia de l'events
      //content+="      <text id='actDia' class='label label-primary pull-right'>"+d.events[i].eventdate+"</text>";
      content+="    </h4>";
      //content+="  </div>";// </panel-heading
      content+="    <img class='img-responsive portfolio-item borderradius5' src='"+ URL_IMAGE + "/uploadFolder/" + d.events[i].image + ".png' alt=''>";
      content+="  </a>";
      content+="    <p id='actDescripcio'>"+d.events[i].description+"</p>";

      content+="</div>";// </ panel panel-info
      content+="</div>";
      itemrow++;
  }
  content+="</div>";
  document.getElementById("espaiBoxEventListEvents").innerHTML=content;

  //afegeix el núm d'events al badge del títol
  document.getElementById("badgeNumEvents").innerHTML=d.events.length;
}
function OnClickOverEventBox(idevent){
  //idevent=idevent.replace("_Box", "");v
  /*var idcasalaux;
  idevent=idevent.split("_")[0];
  idcasalaux=idevent.split("_")[1];*/
  //getCasalByCasalid(idcasal);
  //localStorage.setItem("idCasal",idcasal);
  window.open("event.html?value="+idevent, "_self");
}

/* -----------------------------------EVENT---------------------------------
funcions de la pàgina
Event.html
*/
function OnLoadEvent(){
  OnLoadDefault();
  var ideventaux, idcasalaux;
  ideventaux=window.location.href.split("?value=")[1].split("_")[0];
  idcasalaux=window.location.href.split("?value=")[1].split("_")[1];

  getEventByEventid(ideventaux, idcasalaux);
  getCasalNameByCasalid(idcasalaux);
  //getLlistaAssistencia();
  if(logged=="true")
  {
    //userAlreadyAssists();
    userAsiste(window.location.href.split("?value=")[1].split("_")[0], localStorage.getItem("userid"));
  }else{
    document.getElementById("assistireBtn").className+=" own-hidden";
  }

}
function userAlreadyAssists(data){
  if(data=="true"){
    document.getElementById("assistireBtn").className+=" own-hidden";
    toastr.success("assisteixes a l'event");
  }
}
function returnedCasalNameByCasalid(data){
  document.getElementById("casalName").innerHTML=data.name;
}
function DisplayHTMLEvent(oE){
  /* 'oC' és la variable objecte on va tota la info del Event */


  document.getElementById("eventTitle").innerHTML=oE.title;
  document.getElementById("eventHora").innerHTML=oE.hora;
  document.getElementById("eventDescription").innerHTML=oE.description;
  document.getElementById("eventLocalization").innerHTML=oE.localization;
  // aqí a partir de les coordenades es monta la url a la api q mostra el lloc
  //document.getElementById("eventMap").src="http://www.openstreetmap.org/export/embed.html?bbox=2.1449947357177734%2C41.371849151666204%2C2.1689414978027344%2C41.38136509656854&amp;layer=mapnik&amp;marker=41.37659924742821%2C2.156968116760254";
  var urlMap, marc1, marc2, marc3, marc4;
  //urlMap="http://www.openstreetmap.org/export/embed.html?bbox=2.1449947357177734%2C41.371849151666204%2C2.1689414978027344%2C41.38136509656854&amp;layer=mapnik&amp;marker=41.37659924742821%2C2.156968116760254";
  marc1=oE.latitude-0.00475009576;//longitude
  marc2=oE.longitude-0.00475009576;
  marc3=oE.latitude+0.00475009576;
  marc4=oE.longitude+0.00475009576;
  urlMap="http://www.openstreetmap.org/export/embed.html?bbox="+marc1+"%2C"+marc2+"%2C"+marc3+"%2C"+marc4+"&amp;layer=mapnik&amp;marker="+oE.longitude+"%2C"+oE.latitude;
  //                                                                                                    NaN %2C   41.26815520.01     %2C  1.96617210.01&amp;layer=mapnik&amp;marker=1.9661721%2C41.2681552
  document.getElementById("iframeMap").src=urlMap;
}
function LinkAlCasal(){
  var idcasaux= window.location.href.split("?value=")[1].split("_")[1];
  window.open("casal.html?value="+idcasaux, "_self");
}

function AssistirEvent(){
  var idevent=window.location.href.split("?value=")[1].split("_")[0];
  assistirEvent2Restful(idevent, localStorage.getItem("userid"));
}
/* ------------------------------------SIGNUP--------------------------------
funcions de la pàgina
signup.html
*/
function getValById(idgiv){
  return(document.getElementById(idgiv).value);
}
function OnBtnSignUp(){
  var d;
  d={
    loginid: "",
    password: "",
    email: "",
    fullname: "",
    description: "",
    image:""
  };
  d.loginid=getValById("username");
  d.password=getValById("password");
  d.email=getValById("email");
  d.fullname=getValById("fullname");
  d.description=getValById("description");
  d.image=document.getElementById("image").files[0];

  var form = new FormData();
  form.append("loginid", d.loginid);
  form.append("password", d.password);
  form.append("email", d.email);
  form.append("fullname", d.fullname);
  form.append("description", d.description);
  form.append("image", d.image);

  if((d.email.indexOf("@") > -1)&&(d.email.indexOf(".") > -1))
  {
    signUp2Restful(form);
  }else{
    toastr.error("format email incorrecte");
  }
}
/* ------------------------------------LOGIN--------------------------------
funcions de la pàgina
login.html
*/
function OnBtnLogIn(){
  var d;
  d={
    loginid: "",
    password: "",
  };
  d.loginid=getValById("username");
  d.password=getValById("password");
  if((d.loginid!="")&&(d.password!=""))
  {
    logIn2Restful(d);
  }else{
    toastr.error("user o password buida");
  }
}
/* ------------------------------------LOGOUT--------------------------------
funcions de logout
*/
function OnBtnLogOut(){
  var d;
  d={
    token: "",
    userid: "",
  };
  d.token=localStorage.getItem("token");
  d.userid=localStorage.getItem("userid");
  logOut2Restful(d);
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

/* ------------------------------------CREAREVENT--------------------------------
funcions de la pàgina
crearevent.html
*/

function OnLoadCrearEvent(){
  OnLoadDefault();
  document.getElementById("titolCasal").innerHTML=nomCasalDeUser;
}
function OnClickBtnCrearEvent(){
  //toastr.warning("funcionalitat a implementar");
  var d={
    casalid:"",
    title:"",
    description:"",
    localization:"",
    eventdate: "",
    image: ""
  };
  d.casalid=idCasalDeUser;
  d.title=document.getElementById("title").value;
  d.description=document.getElementById("description").value;
  d.localization=document.getElementById("localization").value;
  d.image=document.getElementById("image").files[0];

  crearEvent2Restful(d);
}


/* -------------------------- validation ----------------------------------*/
function OnLoadValidation(){
  if(localStorage.getItem("username")=="admin")
  {
    OnLoadDefault();
    getCasalsListValidated();
    getCasalsListUnvalidated();
  }else{
    window.open("index.html", "_self");
  }
}
function ValidationHTMLValidated(d){
  var aux="";

  for(var i=0; i<d.casals.length; i++)
  {
    aux+="<div class='panel panel-default'>";
    aux+="<div class='panel-body'>";
    aux+=d.casals[i].name;
    aux+="<br><span class='label label-info own-spanids'>casalid:  "+ d.casals[i].casalid + "</span>";
    aux+="<br><span class='label label-success own-spanids'>adminid:  "+ d.casals[i].adminid + "</span>";
    aux+="<div id='"+d.casals[i].casalid+"' onclick='Unvalidate(this.id)' class='btn btn-danger pull-right'> Unvalidate </div>";
    aux+="</div>";
    aux+="</div>";
  }
  document.getElementById("listCasalsValidated").innerHTML=aux;
}
function ValidationHTMLUnvalidated(d){
  var aux="";

  for(var i=0; i<d.casals.length; i++)
  {
    aux+="<div class='panel panel-default'>";
    aux+="<div class='panel-body'>";
    aux+=d.casals[i].name;
    aux+="<br><span class='label label-info own-spanids'>casalid:  "+ d.casals[i].casalid + "</span>";
    aux+="<br><span class='label label-success own-spanids'>adminid:  "+ d.casals[i].adminid + "</span>";
    aux+="<div id='"+d.casals[i].casalid+"' onclick='Validate(this.id)' class='btn btn-success pull-right'> Validate </div>";
    aux+="</div>";
    aux+="</div>";
  }
  document.getElementById("listCasalsUnvalidated").innerHTML=aux;
}
function Unvalidate(idg){
  var d;

    for(var i=0; i<validatedAux.casals.length; i++)
    {
      if(validatedAux.casals[i].casalid==idg)
      {
        casalaux=validatedAux.casals[i];
      }
    }
    casalaux.validated=false;
    delete casalaux["longitude"];
    delete casalaux["latitude"];
    delete casalaux["links"];

    d=casalaux;
    validate2Restful(d);
}
function Validate(idg){
  var d, casalaux;
/*  d={
    casalid: "",
    casal:""
  };
  d.casalid=idg;*/


  for(var i=0; i<unvalidatedAux.casals.length; i++)
  {
    if(unvalidatedAux.casals[i].casalid==idg)
    {
      casalaux=unvalidatedAux.casals[i];
    }
  }
  casalaux.validated=true;
  delete casalaux["longitude"];
  delete casalaux["latitude"];
  delete casalaux["links"];



  d=casalaux;
  validate2Restful(d);
}


function ComprovaCasalDeUser(idusergiv){
  idCasalDeUser="noCasal";
  nomCasalDeUser="noCasal";
  if(llistacasalsSimple)
  {

    for(var i=0; i<llistacasalsSimple.casals.length; i++)
    {
      if(llistacasalsSimple.casals[i].adminid==idusergiv)
      {
        idCasalDeUser=llistacasalsSimple.casals[i].casalid;
        nomCasalDeUser=llistacasalsSimple.casals[i].name;
      }
    }
  }
  toastr.info(nomCasalDeUser);
  setTimeout(function(){ HTMLMenuUser(); }, 500);
  if(document.getElementById("titolCasal"))
  {
    document.getElementById("titolCasal").innerHTML=nomCasalDeUser;
  }
}


/* -------- users ------------ */
function OnLoadLlistaUsers(){
  OnLoadDefault();
  getUsersList();
}
function DisplayHtmlUsersList(data){
  var h;
  document.getElementById("listUsers").innerHTML="";
  h="";
  h+="<div class='list-group'>";
  for(var i=0; i<data.users.length; i++)
  {
    h+="<div id='"+data.users[i].id+"' onclick='ChargeUserById(this.id)' class='own-cursorPointer'><a class='list-group-item'>";
    h+="<h3>" + data.users[i].loginid + "</h3>";
    h+=" - ";
    h+=data.users[i].email;
    h+=" - ";
    h+=data.users[i].fullname;
    h+=" - ";
    h+=data.users[i].description;
    h+="</a></div>";
  }
  h+="</div>";

  document.getElementById("listUsers").innerHTML=h;
}
function ChargeUserById(iduser){
  window.open("user.html?value="+iduser, "_self");
}

function OnLoadUser(){
  OnLoadDefault();
  getUserByIdUserHtml(window.location.href.split("?value=")[1]);
  getEventsAssistanceByUserId(window.location.href.split("?value=")[1]);
  getCasalsCommentsByUserId(window.location.href.split("?value=")[1]);
}

function OnLoadEditarUser(){
  OnLoadDefault();
  getUserByIdUserHtmlEdit(localStorage.getItem("userid"));
}
