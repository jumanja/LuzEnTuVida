function openExternal(link) {
    // Load native UI library.
    var gui = require('nw.gui');

    // Open URL with default browser.
    gui.Shell.openExternal(link);
}

function formattedToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    //var today = dd+'/'+mm+'/'+yyyy;
    var today = dd+'/'+mm+'/'+yyyy;
    //Date(year, month, day, hours, minutes, seconds, milliseconds)
    //document.getElementById("DATE").value = today;
    return today;
}    

function lectFecha() {

  document.getElementById("Agno").value = document.getElementById("lafecha").value.substring(6,10) ;
  Generar(4);
  
}
function lectHoy() {
  var today = new Date();

  document.getElementById("Agno").value = today.getFullYear();
  document.getElementById("lafecha").value = getFormattedDate(today);
  //document.getElementById("lafecha").value = new Date();
  
  Generar(4);
  
    //should connect here with DB to retrieve readings and info for that day.
/*  openCreateDB("citasHoy", 
       document.getElementById("lafecha").value,
       document.getElementById("semana").value,
       document.getElementById("dialit").value,
       document.getElementById("ciclo").value,
       document.getElementById("tipo").value,
       document.getElementById("tiempo").value,
       document.getElementById("color").value);*/
       
  openCreateDB();
       
  var lafecha = $("#lafecha").val();
  var Agno = $("#Agno").val();
  var ciclo = $("#ciclo").val();
  var tipo = $("#tipo").val();
  var tiempo = $("#tiempo").val();
  var semana = $("#semana").val();
  var dialit = $("#dialit").val();
  var color = $("#color").val();

  sqlFecha(lafecha, Agno, ciclo, tipo, tiempo, semana, dialit, color);
}
function Generar(opcion) {

    var texto = '';
    var ABC = [];
    var isPar = false;
    //var anioActual = 2014;
    var anioFijo = parseInt(document.getElementById("Agno").value);      //tomarlo del campo html
    if(anioFijo == undefined ) {
      //alert('anioFijo undefined');
      anioFijo = 2014;
    }
    if(anioFijo == null) {
      //alert('anioFijo null');
      anioFijo = 2014;
    }
    if(anioFijo == '' ) {
      //alert('anioFijo empty');
      anioFijo = 2014;
    }
    var cuentaLetra = 0;
    //Activar siguiente linea para generar desde 2014 hasta 2499
    //for	(i = 0; i <= 485; i++) {
    for	(index = 0; index <= 1; index++) {

        anioActual = anioFijo + index;
        isPar = ( anioActual %2 == 0 ) ? true : false;
        letra = ( ( cuentaLetra == 0 ) ? 'A' : ( cuentaLetra == 1 ) ? 'B' : 'C' );
        
        ABC[index] = [anioFijo + index, letra, isPar];
        
        cuentaLetra = ( ( cuentaLetra == 0 ) ? 1 : ( cuentaLetra == 1 ) ? 2 : 0 );
        //texto += '' + ABC[i] + '<br>';

        //myString = ABC[i].valueOf();
        
        if(opcion != 4) {
            texto += '<h1>Año: ' + ABC[index][0] + '&nbsp;';
            texto += 'Letra: ' + ABC[index][1] + '&nbsp;';
            texto += 'Tipo: ' + ( ABC[index][2] ? 1 : 2 ) + '</h1><p>';
        
            //texto += generaAnio(1, ABC[index][0], ABC[index][1], ( ABC[index][2] ? 1 : 2 ) );
            //texto += generaAnio(2, ABC[index][0], ABC[index][1], ( ABC[index][2] ? 1 : 2 ) );
        }
            texto += generaAnio(opcion, ABC[index][0], ABC[index][1], ( ABC[index][2] ? 1 : 2 ) );
        
        if(opcion != 4) {
            texto += '<br>Fin año</p>';
        }
    }
    if(opcion != 4) {
      document.getElementById("Calendario").innerHTML = texto;
    }
}

function generaAnio(forma, anio, letra, tipo) {        

   var Agno = anio;

   // Calcula el día de pascua del <Agno> y deja mes y dia en pascua.Mes, pascua.Dia  "GREGORIANO" o "JULIANO"
   var pascua = CalculePascua(Agno,"GREGORIANO")

   // Ahora calcula otras fechas relativas 
   // El primero domingo de Pascua es el de resurrección, le siguen el II, III hasta el VII de pascua
   // El VII domingo de Pascua (o Jueves de la 6ta semana) es la Ascensión

   var InicioCuaresma = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-46));
   var DomRamos = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-7));
   var JuevesSanto = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-3));
   var ViernesSanto = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-2));
   var SabGloria = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-1));
   var DomResurreccion = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,0));
   var Ascencion1 = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,39));   // Jueves de la 6ta semana después Resurrecion
   var Ascencion2 = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,42));   // VII domingo de Pascua
   var DomPentecostes = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,49)); // 50 dias después de Resurreción
   var DomTrinidad = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,56));    // 1 semana después de Pentecostes
   var Corpus1 = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,60));      // Jueves siguiente a la S.S Trinidad
   var Corpus2 = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,63)) ;     // Domingo siguiente a la S.S Trinidad
   var PedroYPablo = Fec2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,70)) ;     // Domingo siguiente al Corpus Christi
   
   //adicionar fecha específica no movible
   var InmaConcep = Fec2Obj(FechaRelativa(8,12,Agno-1, 0));  
      
   //mes enero es 0, mes dic es 11 - 
   //Definimos 25 de diciembre como punto de partida para calcular Adviento
   /*var Navidad = new Date(anio-1, 11, 25);
   var Dom1Adviento = null;
   var Dom2Adviento = null;
   var Dom3Adviento = null;
   var Dom4Adviento = null;*/

   //Calcule Navidad año civil actual, para luego calcular adviento (y así saber hasta que fecha calcular
   //la segunda parte del tiempo Ordinario)
   var NavidadActual = Fec2Obj(FechaRelativa(25,12,Agno, 0));    
   fechaCalActual = new Date(NavidadActual.getFullYear(), NavidadActual.getMonth(), NavidadActual.getDate());

   semanaAdvientoActual = 4;
   CristoReyActual = null;
   dom1AdvientoActual = null;
   dom2AdvientoActual = null;
   dom3AdvientoActual = null;
   dom4AdvientoActual = null;  
   
   //Encontrar el domingo anterior
   restar = -1;
   seguir = true;
   cuantosMas = 0;
   while (seguir) {
        //Restarle uno a la fecha
        fechaCalActual = traerFecha(fechaCalActual, restar);

        //el domingo anterior a Navidad Actual es el domingo 4 de adviento
        //if(fechaCalActual.getDay() == 0 || fechaCal.getDay() == 7) {
        if( fechaCalActual.getDay() == 0 ) {
            if(dom4AdvientoActual == null) {
                dom4AdvientoActual = new Date(fechaCalActual.getFullYear(), fechaCalActual.getMonth(), fechaCalActual.getDate());
            } else if(dom3AdvientoActual == null) {
                dom3AdvientoActual = new Date(fechaCalActual.getFullYear(), fechaCalActual.getMonth(), fechaCalActual.getDate());
            } else if(dom2AdvientoActual == null) {
                dom2AdvientoActual = new Date(fechaCalActual.getFullYear(), fechaCalActual.getMonth(), fechaCalActual.getDate());
            } else if(dom1AdvientoActual == null) {
                dom1AdvientoActual = new Date(fechaCalActual.getFullYear(), fechaCalActual.getMonth(), fechaCalActual.getDate());
            } else if(CristoReyActual == null) {
                CristoReyActual = new Date(fechaCalActual.getFullYear(), fechaCalActual.getMonth(), fechaCalActual.getDate());
                seguir = false;
            } else {
                seguir = false;
            }
        } else {
            cuantosMas++;
        }
        
        if(cuantosMas == 100) {
           seguir= false;
        }
        
   }  

   
   //Calcule Navidad para luego calcular adviento (año litúrgico Actual)
   var Navidad = Fec2Obj(FechaRelativa(25,12,Agno-1, 0));    
   fechaCal = new Date(Navidad.getFullYear(), Navidad.getMonth(), Navidad.getDate());

   semanaAdviento = 4;
   dom1Adviento = null;
   dom2Adviento = null;
   dom3Adviento = null;
   dom4Adviento = null;  
   
   //Encontrar el domingo anterior
   restar = -1;
   seguir = true;
   cuantosMas = 0;
   while (seguir) {
        //Restarle uno a la fecha
        fechaCal = traerFecha(fechaCal, restar);

        //el domingo anterior a Navidad es el domingo 4 de adviento
        //if(fechaCal.getDay() == 0 || fechaCal.getDay() == 7) {
        if( fechaCal.getDay() == 0 ) {
            if(dom4Adviento == null) {
                dom4Adviento = new Date(fechaCal.getFullYear(), fechaCal.getMonth(), fechaCal.getDate());
            } else if(dom3Adviento == null) {
                dom3Adviento = new Date(fechaCal.getFullYear(), fechaCal.getMonth(), fechaCal.getDate());
            } else if(dom2Adviento == null) {
                dom2Adviento = new Date(fechaCal.getFullYear(), fechaCal.getMonth(), fechaCal.getDate());
            } else if(dom1Adviento == null) {
                dom1Adviento = new Date(fechaCal.getFullYear(), fechaCal.getMonth(), fechaCal.getDate());
                seguir = false;
            } else {
                seguir = false;
            }
        } else {
            cuantosMas++;
        }
        
        if(cuantosMas == 100) {
           seguir= false;
        }
   }  
     
   /*var Dom1erAdviento = getFormattedDate(dom1Adviento);
   var Dom2doAdviento = getFormattedDate(dom2Adviento);
   var Dom3erAdviento = getFormattedDate(dom3Adviento);
   var Dom4toAdviento = getFormattedDate(dom4Adviento);
   var Navidad = getFormattedDate(Navidad);*/
     
   var figura = '';
   var string = '';
   //var cadena = '';
   var nuevaFecha = null;
   var semana = 1;
   //semana = ("0" + semana).slice (-2);
   
   
   //GENERAR ADVIENTO
   
   abrevSem = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
   for(semAcum = 0; semAcum < 4; semAcum++){
        var objFecha = null;
        if(semAcum == 0){
           objFecha = dom1Adviento;
        } else if(semAcum == 1){
           objFecha = dom2Adviento;
        } else if(semAcum == 2){
           objFecha = dom3Adviento;
        } else if(semAcum == 3){
           objFecha = dom4Adviento;            
        } else if(semAcum == 4){
           objFecha = dom4Adviento;            
        } else {
          objFecha = dom4Adviento;
        }

      //Inmaculada concepción 08/12/yyyy
     if(getFormattedDate(InmaConcep) == getFormattedDate(objFecha)) {
        //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(InmaConcep) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'INMACONCEP', 'ROJO'"+"</span>";
        
        claseH = 'navidadDOM'; 
        myDate = getFormattedDate(objFecha) ;  //se necesita getFormattedDate en este caso
        tiempo = 'ORD'; 
        semAct = 0; 
        xTitle = 'INMACONCEP';
        colour = 'ROJO';
        diaSem = objFecha.getDay();
        
        string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
        figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
        
        if(document.getElementById("lafecha").value == myDate) {
          hoyTexto = semAct
        }
        
     } else {
        //cadena += "<br><span class='advientoDOM'>'" + getFormattedDate(objFecha) + "', '" + letra + "', '" + tipo + "', 'ADV', " + (semAcum+1) + ", 'DOMADVIENTO', 'MORADO'" + "</span>";

        claseH = 'advientoDOM'; 
        myDate = getFormattedDate(objFecha) ;  //se necesita getFormattedDate en este caso;
        tiempo = 'ADV'; 
        semAct = (semAcum+1) ; 
        xTitle = 'DOMADVIENTO';
        colour = 'MORADO';
        diaSem = objFecha.getDay();
                
        string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
        figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
     }
     
     for(acum = 0; acum < 6; acum++) {
          
          nuevaFecha = Fec2Obj(FechaRelativa(objFecha.getDate(), objFecha.getMonth()+1, Agno-1, acum+1));
          if(getFormattedDate(Navidad) == getFormattedDate(nuevaFecha) ) {
             acum = 1000;
             semAcum = 1000;
          } else if(getFormattedDate(InmaConcep) == getFormattedDate(nuevaFecha)) {
              //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(InmaConcep) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'INMACONCEP', 'ROJO'"+"</span>";
              claseH = 'navidadDOM'; 
              myDate = getFormattedDate(nuevaFecha);
              tiempo = 'ORD'; 
              semAct = 0 ; 
              xTitle = 'INMACONCEP';
              colour = 'ROJO';
              diaSem = nuevaFecha.getDay();
                      
              string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
              figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          } else {
             // cadena += "<br><span class='adviento'>'" + Date2Obj(FechaRelativa(objFecha.getDate(), objFecha.getMonth()+1, Agno-1, acum+1)) + "', '" + 
             //                letra + "', '" + tipo + "', 'ADV', " + (semAcum+1) + ", '" + abrevSem[acum] + "ADVIENTO', 'MORADO'"+"</span>";

              claseH = 'adviento'; 
              //myDate = Date2Obj(FechaRelativa(objFecha.getDate(), objFecha.getMonth()+1, Agno-1, acum+1));
              myDate = getFormattedDate(nuevaFecha);
              tiempo = 'ADV'; 
              semAct = (semAcum+1) ; 
              xTitle = abrevSem[acum] + 'ADVIENTO';
              colour = 'MORADO';
              diaSem = nuevaFecha.getDay();
                            
              string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
              figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);          
          }
     }
     
   }

   //GENERAR NAVIDAD, EPIFANÍA Y BAUTISMO
   
   //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(Navidad) + "', '" + letra + "', '" + tipo + "', 'NAV', 0, 'DIADENAVIDAD', 'BLANCO'" + "</span>";
    claseH = 'navidadDOM'; 
    myDate = getFormattedDate(Navidad);
    tiempo = 'NAV'; 
    semAct = 0 ; 
    xTitle = 'DIADENAVIDAD';
    colour = 'BLANCO';
    diaSem = Navidad.getDay();
                  
    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
   
   
              
   var DiaADia = new Array("DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM");
   
   //Después de Navidad
   nuevaFecha = Fec2Obj(FechaRelativa(Navidad.getDate(), Navidad.getMonth()+1, Agno-1, 1));
   var navidadFueDomingo = false;
   if(DiaADia[nuevaFecha.getDay()] == "LUN") {
      navidadFueDomingo = true;  
   }
   if(DiaADia[nuevaFecha.getDay()] == "DOM") {
     //  cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
     //                      letra + "', '" + tipo + "', 'NAV', 0, 'SAGRADAFAM', 'BLANCO'" + "</span>";
          claseH = 'navidadDOM'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SAGRADAFAM';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();
              
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
   } else {
      // cadena += "<br><span class='navidad'>'" + getFormattedDate(nuevaFecha) + "', '" + 
      //                     letra + "', '" + tipo + "', 'NAV', 0, 'SANESTEBAN', 'ROJO'"+"</span>";
          claseH = 'navidad'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SANESTEBAN';
          colour = 'ROJO';
          diaSem = nuevaFecha.getDay();
                    
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
   }
   
   nuevaFecha = Fec2Obj(FechaRelativa(Navidad.getDate(), Navidad.getMonth()+1, Agno-1, 2));
   if(DiaADia[nuevaFecha.getDay()] == "DOM") {
     //  cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
     //                      letra + "', '" + tipo + "', 'NAV', 0, 'SAGRADAFAM', 'BLANCO'" + "</span>";
          claseH = 'navidadDOM'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SAGRADAFAM';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();
                    
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
     
   } else {
     //  cadena += "<br><span class='navidad'>'" + getFormattedDate(nuevaFecha) + "', '" + 
     //                  letra + "', '" + tipo + "', 'NAV', 0, 'SANJUANEV', 'ROJO'"+"</span>";
          claseH = 'navidad'; 
          myDate =  getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SANJUANEV';
          colour = 'ROJO';
          diaSem = nuevaFecha.getDay();
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
   }
   
   nuevaFecha = Fec2Obj(FechaRelativa(Navidad.getDate(), Navidad.getMonth()+1, Agno-1, 3));
   if(DiaADia[nuevaFecha.getDay()] == "DOM") {
      // cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
      //                     letra + "', '" + tipo + "', 'NAV', 0, 'SAGRADAFAM', 'BLANCO'"+"</span>";
          claseH = 'navidadDOM'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SAGRADAFAM';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
   } else {
     // cadena += "<br><span class='navidad'>'" + getFormattedDate(nuevaFecha) + "', '" + 
     //                  letra + "', '" + tipo + "', 'NAV', 0, 'INOCENTES', 'ROJO'"+"</span>";
          claseH = 'navidad'; 
          myDate = getFormattedDate(nuevaFecha) ;
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'INOCENTES';
          colour = 'ROJO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
   }
      
   nuevaFecha = Fec2Obj(FechaRelativa(Navidad.getDate(), Navidad.getMonth()+1, Agno-1, 4));
   if(DiaADia[nuevaFecha.getDay()] == "DOM") {
     // cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
     //                      letra + "', '" + tipo + "', 'NAV', 0, 'SAGRADAFAM', 'BLANCO'"+"</span>";
          claseH = 'navidadDOM'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SAGRADAFAM';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
   } else {
     // cadena += "<br><span class='navidad'>'" + getFormattedDate(nuevaFecha) + "', '" + 
     //                  letra + "', '" + tipo + "', 'NAV', 0, '5TOOCTAVANAV', 'BLANCO'"+"</span>";
          claseH = 'navidad'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = '5TOOCTAVANAV';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
   }
      
   nuevaFecha = Fec2Obj(FechaRelativa(Navidad.getDate(), Navidad.getMonth()+1, Agno-1, 5));
   if(DiaADia[nuevaFecha.getDay()] == "DOM") {
      //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
      //                     letra + "', '" + tipo + "', 'NAV', 0, 'SAGRADAFAM', 'BLANCO'"+"</span>";
          claseH = 'navidadDOM'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SAGRADAFAM';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
   } else {
      if(navidadFueDomingo) {
        // cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
        //                   letra + "', '" + tipo + "', 'NAV', 0, 'SAGRADAFAM', 'BLANCO'"+"</span>";
          claseH = 'navidadDOM'; 
          myDate = getFormattedDate(nuevaFecha) ;
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SAGRADAFAM';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
      } else {
        //  cadena += "<br><span class='navidad'>'" + getFormattedDate(nuevaFecha) + "', '" + 
        //                   letra + "', '" + tipo + "', 'NAV', 0, '6TOOCTAVANAV', 'BLANCO'"+"</span>";
          claseH = 'navidad'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = '6TOOCTAVANAV';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
      }
   }
         
   nuevaFecha = Fec2Obj(FechaRelativa(Navidad.getDate(), Navidad.getMonth()+1, Agno-1, 6));
   if(DiaADia[nuevaFecha.getDay()] == "DOM") {
      //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
      //                     letra + "', '" + tipo + "', 'NAV', 0, 'SAGRADAFAM', 'BLANCO'"+"</span>";
          claseH = 'navidadDOM'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SAGRADAFAM';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
   } else {
      //cadena += "<br><span class='navidad'>'" + getFormattedDate(nuevaFecha) + "', '" + 
      //                 letra + "', '" + tipo + "', 'NAV', 0, 'SANSILVESTRE', 'BLANCO'"+"</span>";
          claseH = 'navidad'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'SANSILVESTRE';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem); 
   }
         
   //1ero de Enero
   nuevaFecha = Fec2Obj(FechaRelativa(1, 1, Agno, 0));
   //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
   //                    letra + "', '" + tipo + "', 'NAV', 0, 'MADREDEDIOS', 'BLANCO'"+"</span>";
          claseH = 'navidadDOM'; 
          myDate = getFormattedDate(nuevaFecha);
          tiempo = 'NAV'; 
          semAct = 0 ; 
          xTitle = 'MADREDEDIOS';
          colour = 'BLANCO';
          diaSem = nuevaFecha.getDay();          
          
          string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          
   var despuesEpifania = false;
   for(acum = 0; acum < 14; acum++) {
       
       nuevaFecha = Fec2Obj(FechaRelativa(Navidad.getDate(), Navidad.getMonth()+1, Agno-1, 8+acum));
       // if(getFormattedDate(Navidad) != getFormattedDate(nuevaFecha) ) {
       if(DiaADia[nuevaFecha.getDay()] != "DOM") {
            //Si ya pasó epifanía es después, sino, ántes
            if(despuesEpifania) {
                //cadena += "<br><span class='epifania'>'" + getFormattedDate(nuevaFecha) + "', '" + 
                //               letra + "', '" + tipo + "', 'EPI', 0, '" + DiaADia[nuevaFecha.getDay()] + "EPIFANIA', 'BLANCO'"+"</span>";
                claseH = 'epifania'; 
                myDate = getFormattedDate(nuevaFecha);
                tiempo = 'EPI'; 
                semAct = 0 ; 
                xTitle = DiaADia[nuevaFecha.getDay()] + 'EPIFANIA';
                colour = 'BLANCO';
                diaSem = nuevaFecha.getDay();                
                
                string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
            } else {
               // cadena += "<br><span class='epifania'>''" + getFormattedDate(nuevaFecha) + "', '" + 
               //                letra + "', '" + tipo + "', 'EPI', 0, '" + (acum+1) + "ANTESEPIFANIA', 'BLANCO'"+"</span>";
                claseH = 'epifania'; 
                myDate = getFormattedDate(nuevaFecha);
                tiempo = 'EPI'; 
                semAct = (acum+1) ; 
                xTitle = 'ANTESEPIFANIA';
                colour = 'BLANCO';
                diaSem = nuevaFecha.getDay();                                
                
                string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);             
            }
       } else {
            //Si ya pasó epifanía es el Bautismo del Señor, sino, Epifanía
            if(despuesEpifania) {
                //cadena += "<br><span class='epifaniaDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
                //               letra + "', '" + tipo + "', 'EPI', 0, 'BAUTISMO', 'BLANCO'" + "</span>";
                claseH = 'epifaniaDOM'; 
                myDate = getFormattedDate(nuevaFecha);
                tiempo = 'EPI'; 
                semAct = 0 ; 
                xTitle = 'BAUTISMO';
                colour = 'BLANCO';
                diaSem = nuevaFecha.getDay();                                
                
                string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                
                despuesEpifania = true;
                
                //Fin, tenemos ya el Bautismo del Señor
                acum = 1000;
            } else {
                //cadena += "<br><span class='epifaniaDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
                //               letra + "', '" + tipo + "', 'EPI', 0, 'EPIFANIA', 'BLANCO'" + "</span>";
                
                claseH = 'epifaniaDOM'; 
                myDate = getFormattedDate(nuevaFecha);
                tiempo = 'EPI'; 
                semAct = 0 ; 
                xTitle = 'EPIFANIA';
                colour = 'BLANCO';
                diaSem = nuevaFecha.getDay();
                
                string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                
                despuesEpifania = true;
            }
        } 
   }
   
   //Bautismo del Señor quedó en el objeto nuevaFecha
   
   
   //GENERAR PRIMERA PARTE DEL TIEMPO ORDINARIO

   semanaOrdinario = 1;
   objFecha = nuevaFecha;

   for(acum = 1; acum < 140; acum++) {
        
        nuevaFecha = Fec2Obj(FechaRelativa(objFecha.getDate(), objFecha.getMonth()+1, Agno, acum) );
        
        //seguir hasta que llegue a la Cuaresma (miércoles de ceniza)
        if(getFormattedDate(InicioCuaresma) == getFormattedDate(nuevaFecha)) {
           acum = 1000;
        } else {
            
            if(DiaADia[nuevaFecha.getDay()] != "DOM") {
                //cadena += "<br><span class='ordinario'>'" + getFormattedDate(nuevaFecha) + "', '" + 
                //          letra + "', '" + tipo + "', 'ORD', " + semanaOrdinario + ", '" + DiaADia[nuevaFecha.getDay()] + "ORDINARIO', 'VERDE'" + "</span>";
                
                claseH = 'ordinario'; 
                myDate = getFormattedDate(nuevaFecha);
                tiempo = 'ORD'; 
                semAct = semanaOrdinario ; 
                xTitle = DiaADia[nuevaFecha.getDay()] + 'ORDINARIO';
                colour = 'VERDE';
                diaSem = nuevaFecha.getDay();
                
                string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                
            } else {
                //cadena += "<br><span class='ordinarioDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
                //          letra + "', '" + tipo + "', 'ORD', " + (semanaOrdinario+1) + ", '" + DiaADia[nuevaFecha.getDay()] + "ORDINARIO', 'VERDE'" + "</span>";
                
                claseH = 'ordinarioDOM'; 
                myDate = getFormattedDate(nuevaFecha);
                tiempo = 'ORD'; 
                semAct = (semanaOrdinario+1) ; 
                xTitle = DiaADia[nuevaFecha.getDay()] + 'ORDINARIO';
                colour = 'VERDE';
                diaSem = nuevaFecha.getDay();
                
                string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                
                semanaOrdinario++;
            }
        
        }
   }
   
   
   //GENERAR CUARESMA
   //cadena += "<br><span class='cuaresmaDOM'>'" + getFormattedDate(InicioCuaresma) + "', '" + letra + "', '" + tipo + "', 'CUA', 0, 'MIEDECENIZA', 'MORADO'" + "</span>";

    claseH = 'cuaresmaDOM'; 
    myDate = getFormattedDate(InicioCuaresma);
    tiempo = 'CUA'; 
    semAct = 0 ; 
    xTitle = 'MIEDECENIZA';
    colour = 'MORADO';
    diaSem = InicioCuaresma.getDay();
    
    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                
   semanaCuaresma = 0;
   objFecha = nuevaFecha;

   for(acum = 1; acum < 40; acum++) {
        
        nuevaFecha = Fec2Obj(FechaRelativa(objFecha.getDate(), objFecha.getMonth()+1, Agno, acum) );
        
        //seguir hasta que llegue al Domingo de Ramos
        if(getFormattedDate(DomRamos) == getFormattedDate(nuevaFecha)) {
           acum = 1000;
        } else {
            
            if(DiaADia[nuevaFecha.getDay()] != "DOM") {
               // cadena += "<br><span class='cuaresma'>'" + getFormattedDate(nuevaFecha) + "', '" + 
               //           letra + "', '" + tipo + "', 'CUA', " + semanaCuaresma + ", '" + DiaADia[nuevaFecha.getDay()] + "CUARESMA', 'MORADO'" + "</span>";
                  claseH = 'cuaresma'; 
                  myDate = getFormattedDate(nuevaFecha);
                  tiempo = 'CUA'; 
                  semAct = semanaCuaresma ; 
                  xTitle = DiaADia[nuevaFecha.getDay()] + 'CUARESMA';
                  colour = 'MORADO';
                  diaSem = nuevaFecha.getDay();
                  
                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                         
            } else {
               // cadena += "<br><span class='cuaresmaDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
               //           letra + "', '" + tipo + "', 'CUA', " + (semanaCuaresma+1) + ", '" + DiaADia[nuevaFecha.getDay()] + "CUARESMA', 'MORADO'" + "</span>";
                  claseH = 'cuaresmaDOM'; 
                  myDate = getFormattedDate(nuevaFecha);
                  tiempo = 'CUA'; 
                  semAct = (semanaCuaresma+1) ; 
                  xTitle = DiaADia[nuevaFecha.getDay()] + 'CUARESMA';
                  colour = 'MORADO';
                  diaSem = nuevaFecha.getDay();
                  
                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                         
                
                semanaCuaresma++;
            }
        
        }
   }
   
   //GENERAR SEMANA SANTA
   //cadena += "<br><span class='ssanta'>'" + getFormattedDate(DomRamos) + "', '" + letra + "', '" + tipo + "', 'STA', 0, 'DOMDERAMOS', 'ROJO'"+"</span>";
    claseH = 'ssanta'; 
    myDate = getFormattedDate(DomRamos);
    tiempo = 'STA'; 
    semAct = 0 ; 
    xTitle = 'DOMDERAMOS';
    colour = 'ROJO';
    diaSem = DomRamos.getDay();
                  
    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                         
                  
   nuevaFecha = Fec2Obj(FechaRelativa(DomRamos.getDate(), DomRamos.getMonth()+1, Agno, 1) );
   //cadena += "<br><span class='ssanta'>'" + getFormattedDate(nuevaFecha) + "', '" + letra + "', '" + tipo + "', 'STA', 0, 'LUNSANTO', 'ROJO'"+"</span>";
    claseH = 'ssanta'; 
    myDate = getFormattedDate(nuevaFecha);
    tiempo = 'STA'; 
    semAct = 0 ; 
    xTitle = 'LUNSANTO';
    colour = 'ROJO';   
    diaSem = nuevaFecha.getDay();

    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
  
   nuevaFecha = Fec2Obj(FechaRelativa(DomRamos.getDate(), DomRamos.getMonth()+1, Agno, 2) );
   //cadena += "<br><span class='ssanta'>'" + getFormattedDate(nuevaFecha) + "', '" + letra + "', '" + tipo + "', 'STA', 0, 'MARSANTO', 'ROJO'"+"</span>";
    claseH = 'ssanta'; 
    myDate = getFormattedDate(nuevaFecha);
    tiempo = 'STA'; 
    semAct = 0 ; 
    xTitle = 'MARSANTO';
    colour = 'ROJO';   
    diaSem = nuevaFecha.getDay();

    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
       
   nuevaFecha = Fec2Obj(FechaRelativa(DomRamos.getDate(), DomRamos.getMonth()+1, Agno, 3) );
   //cadena += "<br><span class='ssanta'>'" + getFormattedDate(nuevaFecha) + "', '" + letra + "', '" + tipo + "', 'STA', 0, 'MIESANTO', 'ROJO'"+"</span>";
    claseH = 'ssanta'; 
    myDate = getFormattedDate(nuevaFecha);
    tiempo = 'STA'; 
    semAct = 0 ; 
    xTitle = 'MIESANTO';
    colour = 'ROJO';  
    diaSem = nuevaFecha.getDay();

    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
       
   //cadena += "<br><span class='ssanta'>'" + getFormattedDate(JuevesSanto) + "', '" + letra + "', '" + tipo + "', 'STA', 0, 'JUESANTO', 'ROJO'"+"</span>";
    claseH = 'ssanta'; 
    myDate = getFormattedDate(JuevesSanto);
    tiempo = 'STA'; 
    semAct = 0 ; 
    xTitle = 'JUESANTO';
    colour = 'ROJO'; 
    diaSem = JuevesSanto.getDay(); 

    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
       
   //cadena += "<br><span class='ssanta'>'" + getFormattedDate(ViernesSanto) + "', '" + letra + "', '" + tipo + "', 'STA', 0, 'VIESANTO', 'ROJO'"+"</span>";
    claseH = 'ssanta'; 
    myDate = getFormattedDate(ViernesSanto);
    tiempo = 'STA'; 
    semAct = 0 ; 
    xTitle = 'VIESANTO';
    colour = 'ROJO';  
    diaSem = ViernesSanto.getDay();

    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
          
   //cadena += "<br><span class='ssanta'>'" + getFormattedDate(SabGloria) + "', '" + letra + "', '" + tipo + "', 'STA', 0, 'SABSANTO', 'ROJO'"+"</span>";
    claseH = 'ssanta'; 
    myDate = getFormattedDate(SabGloria);
    tiempo = 'STA'; 
    semAct = 0 ; 
    xTitle = 'SABSANTO';
    colour = 'ROJO';  
    diaSem = SabGloria.getDay();

    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
             
   //cadena += "<br><span class='ssanta'>'" + getFormattedDate(DomResurreccion) + "', '" + letra + "', '" + tipo + "', 'PAS', 0, 'DOMPASCUA', 'ROJO'"+"</span>";
    claseH = 'ssanta'; 
    myDate = getFormattedDate(DomResurreccion);
    tiempo = 'PAS'; 
    semAct = 0 ; 
    xTitle = 'DOMPASCUA';
    colour = 'ROJO';
    diaSem = DomResurreccion.getDay();  

    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                
   nuevaFecha = Fec2Obj(FechaRelativa(DomResurreccion.getDate(), DomResurreccion.getMonth()+1, Agno, 0) );

   //GENERAR PASCUA 
   objFecha = nuevaFecha;
   semanaPascua = 1;
   for(acum = 1; acum < 100; acum++) {
        
        nuevaFecha = Fec2Obj(FechaRelativa(objFecha.getDate(), objFecha.getMonth()+1, Agno, acum) );
        
        //seguir hasta que llegue al inicio de la segunda parte del tiempo ordinario, el último día es Pentecostés
        if(getFormattedDate(DomPentecostes) == getFormattedDate(nuevaFecha)) {
           acum = 10000;
        } else {
            if(getFormattedDate(Ascencion2) == getFormattedDate(nuevaFecha)) {
              //cadena += "<br><span class='pascuaDOM'>'" + getFormattedDate(Ascencion2) + "', '" + letra + "', '" + tipo + "', 'PAS', 0, 'ASCENCION2', 'ROJO'"+"</span>";
                  claseH = 'pascuaDOM'; 
                  myDate = getFormattedDate(Ascencion2);
                  tiempo = 'PAS'; 
                  semAct = 0 ; 
                  xTitle = 'ASCENCION2';
                  colour = 'ROJO';  
                  diaSem = Ascencion2.getDay();

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
            
                  semanaPascua++;
            } else if(DiaADia[nuevaFecha.getDay()] != "DOM") {
               // cadena += "<br><span class='pascua'>'" + getFormattedDate(nuevaFecha) + "', '" + 
               //           letra + "', '" + tipo + "', 'PAS', " + semanaPascua + ", '" + DiaADia[nuevaFecha.getDay()] + "PASCUA', 'ROJO'" + "</span>";
                  claseH = 'pascua'; 
                  myDate = getFormattedDate(nuevaFecha);
                  tiempo = 'PAS'; 
                  semAct = semanaPascua ; 
                  xTitle = DiaADia[nuevaFecha.getDay()] + 'PASCUA';
                  colour = 'ROJO';  
                  diaSem = nuevaFecha.getDay();

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                
            } else {
                //cadena += "<br><span class='pascuaDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
                //          letra + "', '" + tipo + "', 'PAS', " + (semanaPascua+1) + ", '" + DiaADia[nuevaFecha.getDay()] + "PASCUA', 'ROJO'" + "</span>";
                  claseH = 'pascuaDOM'; 
                  myDate = getFormattedDate(nuevaFecha);
                  tiempo = 'PAS'; 
                  semAct = (semanaPascua+1) ; 
                  xTitle = DiaADia[nuevaFecha.getDay()] + 'PASCUA';
                  colour = 'ROJO';  
                  diaSem = nuevaFecha.getDay();

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                                
                semanaPascua++;
            }
        
        }
   }
    //  cadena += "<br><span class='pascuaDOM'>'" + getFormattedDate(DomPentecostes) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'PENTECOSTES', 'ROJO'"+"</span>";
    claseH = 'pascuaDOM'; 
    myDate = getFormattedDate(DomPentecostes);
    tiempo = 'ORD'; 
    semAct = 0 ; 
    xTitle = 'PENTECOSTES';
    colour = 'ROJO';  
    diaSem = DomPentecostes.getDay();

    string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
    
    semanaOrdinario++;
    semanaOrdinario++; //Sumar una adicional para sincronizar el segundo tiempo ordinario
                             
   //GENERAR SEGUNDA PARTE DEL TIEMPO ORDINARIO, va desde el Domingo de Resureccion (almacenado en nuevaFecha)
   //hasta el día anterior al 1er domingo de Adviento del siguiente Año Litúrgico (almacenado en dom1AdvientoActual)
   //en semanaOrdinario está almacenada la última semana del tiempo ordinario
   objFecha = nuevaFecha;

   for(acum = 1; acum < 1400; acum++) {
        
        nuevaFecha = Fec2Obj(FechaRelativa(objFecha.getDate(), objFecha.getMonth()+1, Agno, acum) );
        
        //seguir hasta que llegue a la Cuaresma (miércoles de ceniza)
        if(getFormattedDate(dom1AdvientoActual) == getFormattedDate(nuevaFecha)) {
           acum = 10000;
        } else {
            
            if(getFormattedDate(CristoReyActual) == getFormattedDate(nuevaFecha)) {
              //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(CristoReyActual) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'CRISTOREY', 'ROJO'"+"</span>";
                  claseH = 'navidadDOM'; 
                  myDate = getFormattedDate(CristoReyActual);
                  tiempo = 'ORD'; 
                  semAct = 0 ; 
                  xTitle = 'CRISTOREY';
                  colour = 'ROJO';  
                  diaSem = CristoReyActual.getDay();

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
            
                  semanaOrdinario++;
            } else if(getFormattedDate(Ascencion2) == getFormattedDate(nuevaFecha)) {
              //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(Ascencion2) + "', '" + letra + "', '" + tipo + "', 'PAS', 0, 'ASCENCION2', 'BLANCO'"+"</span>";
                  claseH = 'navidadDOM'; 
                  myDate = getFormattedDate(Ascencion2);
                  tiempo = 'PAS'; 
                  semAct = 0 ; 
                  xTitle = 'ASCENCION2';
                  colour = 'BLANCO';  
                  diaSem = Ascencion2.getDay();

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  
            } else if(getFormattedDate(DomTrinidad) == getFormattedDate(nuevaFecha)) {
              //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(DomTrinidad) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'SANTRINIDAD', 'BLANCO'"+"</span>";
                  claseH = 'navidadDOM'; 
                  myDate = getFormattedDate(DomTrinidad);
                  tiempo = 'ORD'; 
                  semAct = 0 ; 
                  xTitle = 'SANTRINIDAD';
                  colour = 'BLANCO';  
                  diaSem = DomTrinidad.getDay();             

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  
                  semanaOrdinario++;
                  
            } else if(getFormattedDate(Corpus2) == getFormattedDate(nuevaFecha)) {
              //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(Corpus2) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'CORPUS2', 'ROJO'"+"</span>";
                  claseH = 'navidadDOM'; 
                  myDate = getFormattedDate(Corpus2);
                  tiempo = 'ORD'; 
                  semAct = 0 ; 
                  xTitle = 'CORPUS2';
                  colour = 'ROJO'; 
                  diaSem = Corpus2.getDay();               

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  
                  semanaOrdinario++;

            } else if(getFormattedDate(PedroYPablo) == getFormattedDate(nuevaFecha)) {
              //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(PedroYPablo) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'CORPUS2', 'ROJO'"+"</span>";
                  claseH = 'navidadDOM'; 
                  myDate = getFormattedDate(PedroYPablo);
                  tiempo = 'ORD'; 
                  semAct = 0 ; 
                  xTitle = 'PEDROYPABLO';
                  colour = 'ROJO'; 
                  diaSem = PedroYPablo.getDay();               

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  
                  semanaOrdinario++;
            } else {
            
              if(DiaADia[nuevaFecha.getDay()] != "DOM") {
                //  cadena += "<br><span class='ordinario'>'" + getFormattedDate(nuevaFecha) + "', '" + 
                //            letra + "', '" + tipo + "', 'ORD', " + semanaOrdinario + ", '" + DiaADia[nuevaFecha.getDay()] + "ORDINARIO', 'VERDE'" + "</span>";
                  claseH = 'ordinario'; 
                  myDate = getFormattedDate(nuevaFecha);
                  tiempo = 'ORD'; 
                  semAct = semanaOrdinario ; 
                  xTitle = DiaADia[nuevaFecha.getDay()] + 'ORDINARIO';
                  colour = 'VERDE';  
                  diaSem = nuevaFecha.getDay();

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  
              } else {
                 // cadena += "<br><span class='ordinarioDOM'>'" + getFormattedDate(nuevaFecha) + "', '" + 
                 //           letra + "', '" + tipo + "', 'ORD', " + (semanaOrdinario+1) + ", '" + DiaADia[nuevaFecha.getDay()] + "ORDINARIO', 'VERDE'" + "</span>";
                  
                  semanaOrdinario++;
                  
                  claseH = 'ordinarioDOM'; 
                  myDate = getFormattedDate(nuevaFecha);
                  tiempo = 'ORD'; 
                  semAct = semanaOrdinario;
                  xTitle = DiaADia[nuevaFecha.getDay()] + 'ORDINARIO';
                  colour = 'VERDE'; 
                  diaSem = nuevaFecha.getDay(); 

                  string += getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);
                  figura += getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem);

              }
            }
        }
   }

   //cadena += "<br>'" + getFormattedDate(Ascencion1) + "', '" + letra + "', '" + tipo + "', 'PAS', 0, 'ASCENCION1', 'BLANCO'";
   //cadena += "<br>'" + getFormattedDate(Ascencion2) + "', '" + letra + "', '" + tipo + "', 'PAS', 0, 'ASCENCION2', 'BLANCO'";

   //cadena += "<br>'" + getFormattedDate(Corpus1) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'CORPUS1', 'ROJO'";
   //cadena += "<br>'" + getFormattedDate(Corpus2) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'CORPUS2', 'ROJO'";
 
   //return cadena;
   if(forma == 1) {
      return string;
   } else if(forma == 2) {   
      //return '<br><br>&nbsp;Do&nbsp;&nbsp;Lu&nbsp;&nbsp;Ma&nbsp;&nbsp;Mi&nbsp;&nbsp;Ju&nbsp;&nbsp;Vi&nbsp;&nbsp;Sa&nbsp;' + figura;
      return figura;
   } else if(forma == 3) { 
      return '<table><tr><td>' + figura + '</td><td style="font-size:14px">' + string + '</td></tr></table>';
   } else {
   
      //opcion 4 es buscar lecturas para una fecha en la BD
      //traeLecturas();
      return;
   }
} // MuestreResultados

    
function getString(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem){
    //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(InmaConcep) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'INMACONCEP', 'ROJO'"+"</span>";
    
    eldia = (myDate.getDay ? ("0" + myDate.getDay()).slice (-2) : getFormattedDate(myDate).substring(0, 2));
    elmes = (myDate.getMonth ? ("0" + myDate.getMonth()).slice (-2) : getFormattedDate(myDate).substring(3, 5));

    eldia = parseInt(eldia);
    elmes = parseInt(elmes)-1;        
    
    valor = "<br><span class='" + claseH + 
            "'>'" + getFormattedDate(myDate) + 
            "', '" + letra + 
            "', '" + tipo + 
            "', '" + tiempo + 
            "',  " + semAct +
            ", '" + xTitle + 
            "', '" + colour + 
            "' </span>";
            
    //Si es la fecha
    if(document.getElementById("lafecha").value == myDate){
       document.getElementById("semana").value = semAct;
       document.getElementById("dialit").value = xTitle;
       document.getElementById("ciclo").value = letra;
       document.getElementById("tipo").value = tipo;
       document.getElementById("tiempo").value = tiempo;
       document.getElementById("color").value = colour;
    }
    return valor;
}
    
function getFigura(myDate, xTitle, claseH, letra, tipo, tiempo, semAct, colour, diaSem){
    //cadena += "<br><span class='navidadDOM'>'" + getFormattedDate(InmaConcep) + "', '" + letra + "', '" + tipo + "', 'ORD', 0, 'INMACONCEP', 'ROJO'"+"</span>";
//getFormattedDate(myDate)
            //"'>'" +  getFormattedDate(myDate).substring(0, 2) + 
    eldia = (myDate.getDay ? ("0" + myDate.getDay()).slice (-2) : getFormattedDate(myDate).substring(0, 2));
    elmes = (myDate.getMonth ? ("0" + myDate.getMonth()).slice (-2) : getFormattedDate(myDate).substring(3, 5));
    
    eldia = parseInt(eldia);
    elmes = parseInt(elmes)-1;
    
    valor =  "<a href='#' class='" + claseH + 
            "' title='" +
            myDate + ' ' + diaSem + '\n' + xTitle +
            " " + letra + 
            " " + tipo + 
            " " + semAct +
            " " + tiempo + 
            "'>&nbsp;" +  (myDate.getDate ? ("0" + myDate.getDate()).slice (-2) : getFormattedDate(myDate).substring(0, 2)) + 
            "&nbsp;</a>";
    //eldia = (eldia == '01' ? '<br>' : '');
    /*if(diaSem == 0){
          return ('<br>' + valor);
    } else {*/
       if(eldia == 1) {
          dummy = '&nbsp;Do&nbsp;&nbsp;Lu&nbsp;&nbsp;Ma&nbsp;&nbsp;Mi&nbsp;&nbsp;Ju&nbsp;&nbsp;Vi&nbsp;&nbsp;Sa&nbsp;<br>';
          for(micuenta = 1; micuenta <= diaSem; micuenta++){
              dummy += '&nbsp;__&nbsp;';
          }
          
          abrevMes = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
          return ('<br><h3>' + abrevMes[elmes] + '</h3>' +  dummy + (diaSem == 0 ? '<br>' : '')  + valor);
          
       } else {
          return ((diaSem == 0 ? '<br>' : '') + valor);
       }   
    //}
}