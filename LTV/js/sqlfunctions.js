function conectarDB(par0) {
    return openDatabase('LTVDB1.0', '1.0', 'LuzEnTuVida.net', 2 * 1024 * 1024);
}

function sqlCita(par0, doClean, Header, codHeader) {

  var citaUnica = par0;
  var faltaGenerar = true;
  
  var lectura = par0.split(" o ");
  if(lectura[1] != undefined) {
      citaUnica = lectura[0];
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, " O ", par0);
      
      citaUnica = lectura[1];
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, "", par0);
      
      faltaGenerar = false;
  }

  lectura = par0.split(" y ");
  if(lectura[1] != undefined) {
      citaUnica = lectura[0];
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, " Y ", par0);
      
      citaUnica = lectura[1];
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, "", par0);
      //par0.replace("—", "-200");
      //Mr:14,1—15,47
      
      faltaGenerar = false;
  }
  
  //Caracter especial de continuación de capítulo (No es el guión común)
  lectura = par0.split("—");
  if(lectura[1] != undefined) {
      var libro = lectura[0].split(':');
      citaUnica = lectura[0] + "-100";
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, " Hasta ", par0);
      
      var cap2 = lectura[1].split(',');
      citaUnica = libro[0] + ':' + cap2[0] + ',1-' + cap2[1];
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, " HastaFin ", par0);
      //par0.replace("—", "-200");
      //Mr:14,1—15,47
      
      faltaGenerar = false;
  }
  
    //Caracter especial de continuación de capítulo (No es el guión común)
  lectura = par0.split(";");
  if(lectura[1] != undefined) {
      var libro = lectura[0].split(':');
      citaUnica = lectura[0];
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, " Hasta ", par0);
      
      //var cap2 = lectura[1].split(',');
      citaUnica = libro[0] + ':' + lectura[1];
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, " HastaFin ", par0);
      //par0.replace("—", "-200");
      //Mr:14,1—15,47
      
      faltaGenerar = false;
  }
  
  //Si aún así no se ha generado la citaUnica, hágalo ahora
  if(faltaGenerar) {
      citaUnica = par0;
      sqlCitaUnica(citaUnica, doClean, Header, codHeader, "", par0);  
  }
}
    
function sqlCitaUnica(par0, doClean, Header, codHeader, operator, original) {
  //Open or Create DB
  var db2 = conectarDB();
  
  var paso1 = par0.split(':');
  var paso2 = paso1[1].split(',');
  var paso3 = paso2[1].split('-');

 //$('#consoleListView').html(paso1 + '<pre>   </pre>' + paso2 + '<pre>   </pre>' + paso3);
  
  var libro = paso1[0];
  var capini = paso2[0];
  var capfin = paso2[0];
  var versini = paso3[0];
  if(versini.indexOf(".") != -1 ) {
     var aux = versini.split(".");
     versini = aux[0];
  }
  if(versini.indexOf("-") != -1 ) {
     var aux = versini.split("-");
     versini = aux[0];
  }
  if(versini.indexOf("+") != -1 ) {
     var aux = versini.split("+");
     versini = aux[0];
  }
  
  //var versfin = paso3[1];
  var versfin = paso3[paso3.length-1];
  if(versfin.indexOf(".") != -1 ) {
     var aux = versfin.split(".");
     versfin = aux[aux.length-1];
  }
  if(versfin.indexOf("-") != -1 ) {
     var aux = versfin.split("-");
     versfin = aux[aux.length-1];
  }
  if(versfin.indexOf("-") != -1 ) {
     var aux = versfin.split("+");
     versfin = aux[aux.length-1];
  }
  
  var texto = "";
          
  var cuantosRegistros2 = 0;
  var encontrados2 = "";
  
  var sql2 = 'SELECT idreg, orden, libro, capit, versini, versfin, titulo, contenido, estadoreg,media,audio from ' + 
            'biblia WHERE idreg > 0 ' +
             (libro == '' ? '' : " and libro = '" + libro + "' ") +
             (texto == '' ? '' : " and contenido like '%" + texto + "%' ") +
             (capfin == '' ? '' : " and (capit >= '" + capini + "' and capit <= '" + capfin + "') ") +
             (versfin == '' ? '' : " and (versini >= '" + versini + "' and versini <= '" + versfin + "') ") +
             "order by orden limit 100";
             
 // $('#consoleListView').html(sql2);
  if(doClean) {
     $('#buscarListView').html("");
  }
  db2.transaction(function (tx2) {

      tx2.executeSql(sql2, [], function (tx2, results2) {
        //cuantosRegistros2 = results2.rows.item(0).cuenta;
            
        if(operator != " HastaFin ") {
        //citaActual
            var citaAImprimir = par0;
            if(operator == " Hasta ") {
               citaAImprimir = original
            }
            var citaActual = citaAImprimir;//class="ui-btn ui-shadow ui-corner-all ui-icon-arrow-d ui-btn-icon-left"
            $('#buscarListView').append('<br><br><div>' + codHeader + '<h2>' + Header +  ':&nbsp;&nbsp;' +
                      '<a href="#buscar"  onclick="javascript:buscarCita(\'' + 
                      citaActual + '\');">' +
                      citaActual + "</a></h2>");
        }

        var len = results2.rows.length, i;
        for (i = 0; i < len; i++) {
          //alert(results2.rows.item(i).contenido);
          
          /*$('#buscarListView').append('<a href="#buscar" class="ui-btn ui-shadow ui-corner-all ui-icon-arrow-d ui-btn-icon-left" onclick="javascript:buscarCita(\'' . 
              results2.rows.item(i).libro + ':' + 
              results2.rows.item(i).capit + ',1-200\');">' + 
              results2.rows.item(i).libro + ':' + results2.rows.item(i).capit . "</a>&nbsp;&nbsp;");*/
            
            //Extract links from titulo    
    	      if(results2.rows.item(i).titulo != '') {
              var nuevotit = results2.rows.item(i).titulo;
              var titenlaces = nuevotit.split("@");
              nuevotit = titenlaces[0];
              relaclinks = "";
              for(k = 0; k < titenlaces.length; k++) {
                var item = titenlaces[k];
                if( item != nuevotit ) {
                    relaclinks = relaclinks + '&nbsp;&nbsp;&nbsp;<a title="' + item + 
                                   '" class="linksuperpequeno" valign="top" href="#" onclick="javascript:buscarCita(\'' + item +
                                   '\')";>' + item + '</a>';
                }
              }
              
              //class="ui-btn ui-shadow ui-corner-all ui-icon-arrow-d ui-btn-icon-left"
              $('#buscarListView').append('<h5 >' + 
                  nuevotit + (relaclinks == "" ? '' : ' (' + relaclinks + ' )' ) + '</h5>');

            }
            var lbesteverso = "(" + (results2.rows.item(i).versini != results2.rows.item(i).versfin ? 
                                    results2.rows.item(i).versini + '-' + results2.rows.item(i).versfin : results2.rows.item(i).versfin) + ")";
                                    
            var lbaltverso = "(" + results2.rows.item(i).libro + ':' +
                                   results2.rows.item(i).capit + ',' + 
                                   (results2.rows.item(i).versini != results2.rows.item(i).versfin ? 
                                    results2.rows.item(i).versini + '-' + results2.rows.item(i).versfin : results2.rows.item(i).versfin) + ")";

            var lkesteverso = results2.rows.item(i).libro + ':' +
                              results2.rows.item(i).capit + ',' + 
                              (results2.rows.item(i).versini + '-' + results2.rows.item(i).versfin);
          
            
            $('#buscarListView').append('<a title="' + lbaltverso + '" ' +
                        ' onclick="javascript:buscarCita(\'' + lkesteverso + '\');" ' +
                        ' class="linksuperpequeno" valign="top" href="#">' + lbesteverso + '</a> ');
              
            $('#buscarListView').append(parsear(results2.rows.item(i).contenido));

        }
        var footer = "";
        if(Header == "Primera Lectura" || Header == "Segunda Lectura" ) {
           footer = "<br><br><b>Lector(a):</b>&nbsp;&nbsp;Palabra de Dios.<br><b>Todos:</b>&nbsp;&nbsp;Te alabamos, Señor.";
        }
        if(Header == "El Santo Evangelio" ) {
           footer = "<br><br><b>Lector(a):</b>&nbsp;&nbsp;Palabra del Señor.<br><b>Todos:</b>&nbsp;&nbsp;Gloria a tí, Señor Jesús.";
        }
           
        if(operator != "" ) {
            if(operator != " Hasta " && operator != " HastaFin " ) {
                $('#buscarListView').append(footer + '<br><br></div>');
                $('#buscarListView').append('<h2>' + operator + '</h2>');
            }
        
        } else {
                $('#buscarListView').append(footer + '<br><br></div>');
        }
            //alert("Encontrados:" + cuantosRegistros + "\n" + encontrados);
            //$('#consoleListView').html(sql2);
            //$('#buscarListView').append(encontrados2);
            //console.log(encontrados);
            
           // encontrados2 = encontrados2 + "</td></tr>";

            //return encontrados2;
            
      }, function (err) {
            alert('2. should be rolling back caused by: ' + err.message );
            return false;
      });
      
  }, function (err) {
        alert('3. should be rolling back caused by: ' + err.message );
        return false;
  });
  
  //$("#buscarListView").listview("refresh");
}

function sqlFecha(lafecha, Agno, ciclo, tipo, tiempo, semana, dialit, color) {
  //Open or Create DB
  var db = conectarDB()

  //idreg, letra, tipo, semana, codigo, tiempo, color, primera, salmo, segunda, evangelio

  /*
  lafecha, 
  Agno, 
  ciclo, 
  tipo, 
  tiempo, 
  semana, 
  dialit, 
  color
  */
            $('#consoleListView').html("");
            $('#buscarListView').html("");
            
  var cuantosRegistros = 0;
  var encontrados = "";
  var sql = 'SELECT * from lecturas where codigo like "' + dialit + '%" and ' +
            '(semana = "' + semana + '") and ' +
            '(letra = "' + letra + '" or letra = "0") and ' +
            '(tipo = "' + tipo + '" or tipo = "0" ) ';
            
  //          $('#consoleListView').html(sql);
  

            
  db.transaction(function (tx) {
      tx.executeSql(sql, [], function (tx, results) {
        //cuantosRegistros = results.rows.item(0).cuenta;
            
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          //alert(results.rows.item(i).text);

          var codheader = lafecha + '&nbsp;' +  
                              results.rows.item(i).letra + '&nbsp;' +  
                              results.rows.item(i).tipo + '&nbsp;' +  
                              results.rows.item(i).tiempo + '&nbsp;' +  
                              results.rows.item(i).semana + '&nbsp;' +  
                              results.rows.item(i).codigo + '&nbsp;' +  
                              results.rows.item(i).color;
          var citaActual ="";
  
          var colorcode = assignColor(results.rows.item(i).color);
          $('#divleft').css("background-color", colorcode);
          $('#divright').css("background-color", colorcode);
          
          citaActual = results.rows.item(i).primera;
          if(citaActual != "") {
             sqlCita(citaActual, false, "Primera Lectura", codheader);
          }
          
          citaActual = results.rows.item(i).segunda;
          if(citaActual != "") {
             sqlCita(citaActual, false, "Segunda Lectura", "");
          }
          
          citaActual = results.rows.item(i).salmo;
          if(citaActual != "") {
             sqlCita(citaActual, false, "Salmo Responsorial", "");
          }
          
          citaActual = results.rows.item(i).evangelio;
          if(citaActual != "") {
             sqlCita(citaActual, false, "El Santo Evangelio", "");
          }
          
        }
            //alert("Encontrados:" + cuantosRegistros + "\n" + encontrados);
            //$('#consoleListView').html(sql);
            //console.log(encontrados);


      }, function (err) {
            alert('4. should be rolling back caused by: ' + err.message );
            return false;
      });
      
  }, function (err) {
        alert('5. sqlfunctions: should be rolling back caused by: ' + err.message );
        return false;
  });
  
  //$("#buscarListView").listview("refresh");
}

function sqlBuscar(texto, libro, capini, capfin, versini, versfin, muestraver) {
  //Open or Create DB
  var db = conectarDB()

  var cuantosRegistros = 0;
  var encontrados = "";
  var sql = 'SELECT idreg, orden, libro, capit, versini, versfin, titulo, contenido, estadoreg,media,audio from ' + 
            'biblia WHERE idreg > 0 ' +
             (libro == '' ? '' : " and libro = '" + libro + "' ") +
             (texto == '' ? '' : " and contenido like '%" + texto + "%' ") +
             (capfin == '' ? '' : " and (capit >= '" + capini + "' and capit <= '" + capfin + "') ") +
             (versfin == '' ? '' : " and (versini >= '" + versini + "' and versini <= '" + versfin + "') ") +
             "order by orden limit 100";
  db.transaction(function (tx) {
      tx.executeSql(sql, [], function (tx, results) {
        //cuantosRegistros = results.rows.item(0).cuenta;
            
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          //alert(results.rows.item(i).text);

          encontrados = encontrados + '<a href="#buscar" class="ui-btn ui-shadow ui-corner-all ui-icon-arrow-d ui-btn-icon-left" onclick="javascript:buscarCita(\'' + 
              results.rows.item(i).libro + ':' + results.rows.item(i).capit + ',1-200\');">' +
              results.rows.item(i).libro + ':' + results.rows.item(i).capit + "</a>&nbsp;&nbsp;";

          //meter la imagen
          var imagenHoy = 'img/MyImgmis.jpg';
           if ( results.rows.item(i).media == ''  ) {
              if (results.rows.item(i).libro == 'Mr') {
                 imagenHoy = 'Ilustra/sanmarcos.jpg';
              }
              if (results.rows.item(i).libro == 'Mt') {
                 imagenHoy = 'Ilustra/sanmateo.jpg';
              }
              if (results.rows.item(i).libro == 'Lc') {
                 imagenHoy = 'Ilustra/sanlucas.jpg';
              }
              if (results.rows.item(i).libro == 'Jn') {
                 imagenHoy = 'Ilustra/sanjuan.jpg';
              }
           } else {
             
             imagenHoy = 'Ilustra/' + results.rows.item(i).media;
             
             encontrados = encontrados + "<a target='image' href='" +
                imagenHoy + 
                "'><img class='ui-corner-bottom' " + 
                "style=';width:12%;heigth:12%;float:left;margin-top:20px;margin-right:10px' " + 
                "src='". imagenHoy + "' '></a>";

           }


          encontrados = encontrados + "<p>" + resaltar(texto, parsear(results.rows.item(i).contenido)) + "</p>";
          /*
          encontrados = encontrados + "<b>" + results.rows.item(i).idreg + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).orden + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).libro + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).capit + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).versini + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).versfin + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).titulo + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).contenido + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).estadoreg + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).media + "</b>";
          encontrados = encontrados + "<b>" + results.rows.item(i).audio + "</b>";
          encontrados = encontrados + "</p>"; */
        }
            //alert("Encontrados:" + cuantosRegistros + "\n" + encontrados);
            //$('#consoleListView').html(sql);
            $('#buscarListView').html(encontrados);
            //console.log(encontrados);
            
            encontrados = encontrados + "</td></tr>";

      }, function (err) {
            alert('2. should be rolling back caused by: ' + err.message );
            return false;
      });
      
  }, function (err) {
        alert('3. should be rolling back caused by: ' + err.message );
        return false;
  });
  
  //$("#buscarListView").listview("refresh");
}


function assignColor(color) {
   var colorcode = "";
  switch(color) {
      case "ROJO":
          colorcode = "#a70115";
          break;
      case "MORADO":
          colorcode = "#390574";
          break;
      case "VERDE":
          colorcode = "#025505";
          break;
      case "BLANCO":
          colorcode = "#fdfffa";
          break;
      case "AZUL":
          colorcode = "#5aa8cf";
          break;
      case "ROSA":
          colorcode = "#cd6b68";
          break;
      case "NEGRO":
          colorcode = "#070707";
          break;
      default:
          //default ordinario (verde)
          //do nothing oro = #E49E56
          colorcode = "#025505";
          break;
  }
  return colorcode;
}

function parsear(texto) {
  texto = texto.replace(/#/gi, " ");            
  texto = texto.replace(/_/gi, " ");            
  texto = texto.replace(/\//gi, " ");
  return texto;
}

function resaltar(texto, contenido) {
  var re = new RegExp(texto,"gi");
  texto = contenido.replace(re, "<mark>" + texto + "</mark>");            
  return texto;
}