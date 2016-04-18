#web

Okupainfo

come està estructurat el codi?
-
-per un cantó hi ha els fintxers ".html", que és on hi ha la 'plantilla' de lu que es mostra a cada pàgina

-hi ha els fitxers ".js", **oju, aquí és on hi ha l'organització important**:
```
-el fitxer "functions.js" --> conté les funcions de lògica de la web
-"functionsRestful.js" --> conté les funcions que fan les crides al servidor Restful (tot lu que són gets, post, update, delete, etc)

```
La lògica que hi ha darrera de l'organització de la web és:
```
-l'user interacciona amb l'html,
-l'html fa crides a funcions del "functions.js",
-el "functions.js" quan calgui info del Restful farà crides a funcions del fitxer "functionsRestful.js" i aquestes retornaran el valor a les funcions inicials del fitxer "functions.js"

-d'aquesta manera, si canviem alguna cosa del servidor/basededades, només haurem d'ajustar les funcions del fitxer "functionsRestful.js", i la resta de funcions simplement criden una funció q fa consultes al server i reb uns paràmetres com a resposta i ja fa lu q calgui amb aquests valors
```

![alt tag](https://raw.githubusercontent.com/dsaqp1516g3/web/master/organitzaciocodi.jpg)
-a part, tot lu que és estil, està al bootstrap, i auxiliarment si cal posem classes extra que creem al fitxer "estil.css"
