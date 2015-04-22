//Definir tabla auxiuliar
/*Script del Reloj */
function actualizaReloj() {
/* Capturamos la Hora, los minutos y los segundos */
marcacion = new Date()
/* Capturamos la Hora */
Hora = marcacion.getHours()
/* Capturamos los Minutos */
Minutos = marcacion.getMinutes()
/* Capturamos los Segundos */
Segundos = marcacion.getSeconds()
/*variable para el apóstrofe de am o pm*/
dn = "a.m"
if (Hora > 12) {
dn = "p.m"
Hora = Hora - 12
}
if (Hora == 0)
Hora = 12
/* Si la Hora, los Minutos o los Segundos son Menores o igual a 9, le añadimos un 0 */
if (Hora <= 9) Hora = "0" + Hora
if (Minutos <= 9) Minutos = "0" + Minutos
if (Segundos <= 9) Segundos = "0" + Segundos
/* Termina el Script del Reloj */

/*Script de la Fecha */

var Dia = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo");
var Mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
"Octubre", "Noviembre", "Diciembre");
var Hoy = new Date();
var Anio = Hoy.getFullYear();
var Fecha = Dia[Hoy.getDay()] + ", " + Hoy.getDate() + " de " + Mes[Hoy.getMonth()] + " de " + Anio + ". ";

/* Termina el script de la Fecha */

/* Creamos 2 variables para darle formato a nuestro Script */
var Script, Total

/* En Reloj le indicamos la Hora, los Minutos y los Segundos */
Script = Fecha + Hora + ":" + Minutos + ":" + Segundos + " " + dn

/* En total Finalizamos el Reloj uniendo las variables */
Total = Script

/* Capturamos una celda para mostrar el Reloj */
document.getElementById('Fecha_Reloj').innerHTML = Total

/* Indicamos que nos refresque el Reloj cada 1 segundo */
setTimeout("actualizaReloj()", 1000)
}
function mostrarFecha(days){
    milisegundos=parseInt(35*24*60*60*1000);
    
    fecha=new Date();
    day=fecha.getDate();
    // el mes es devuelto entre 0 y 11
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
    
    document.write("Fecha actual: "+day+"/"+month+"/"+year);
    
    //Obtenemos los milisegundos desde media noche del 1/1/1970
    tiempo=fecha.getTime();
    //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
    milisegundos=parseInt(days*24*60*60*1000);
    //Modificamos la fecha actual
    total=fecha.setTime(tiempo+milisegundos);
    day=fecha.getDate();
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();

    document.write("Fecha modificada: "+day+"/"+month+"/"+year);
}
function traerFecha(fecha, days){
    milisegundos=parseInt(35*24*60*60*1000);
    
    //fecha=new Date();
    day=fecha.getDate();
    // el mes es devuelto entre 0 y 11
    month=fecha.getMonth();
    year=fecha.getFullYear();
    
    //document.write("Fecha actual: "+day+"/"+month+"/"+year);
    
    //Obtenemos los milisegundos desde media noche del 1/1/1970
    tiempo=fecha.getTime();
    //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
    milisegundos=parseInt(days*24*60*60*1000);
    //Modificamos la fecha actual
    total=fecha.setTime(tiempo+milisegundos);
    day=fecha.getDate();
    month=fecha.getMonth();
    year=fecha.getFullYear();

    //document.write("Fecha modificada: "+day+"/"+month+"/"+year);
    fechaNueva = new Date(year,month,day);
    
    return fechaNueva;
}

function calcularCal() {


  //con base en el año creamos un objeto fecha
  //var objAnio = document.getElementById("Agno");
  var objAnio = document.Fechas.Agno;
  
  //mes enero es 0, mes dic es 11 - 
  //Definimos 25 de diciembre como punto de partida para calcular Adviento
  var Navidad = new Date(objAnio.value-1, 11, 25);
  
  var numAureo = (parseInt(objAnio.value) + 1 ) % 19;
  if(numAureo == 0) {
     numAureo = 19;
  }
  var letraDom = (parseInt( parseInt(objAnio.value) / 4 ) + parseInt(objAnio.value)) % 7;
  letraDom = 10 - letraDom ;
  if (letraDom == 1) {
      letraDom = 'A';
  } else if (letraDom == 2) {
      letraDom = 'B';
  } else if (letraDom == 3) {
      letraDom = 'C';
  } else if (letraDom == 4) {
      letraDom = 'D';
  } else if (letraDom == 5) {
      letraDom = 'E';
  } else if (letraDom == 6) {
      letraDom = 'F';
  } else if (letraDom == 7) {
      letraDom = 'G';
  }
  //alert(Navidad);
  
  //Encontrar el domingo anterior
  restar = -1;
  seguir = true;
  
  dom1Adviento = null;
  dom2Adviento = null;
  dom3Adviento = null;
  dom4Adviento = null;
  
  semanaAdviento = 4;
  
  fechaCal = new Date(Navidad.getFullYear(), Navidad.getMonth(), Navidad.getDate());

  while (seguir) {
    //Restarle uno a la fecha
    fechaCal = traerFecha(fechaCal, restar);
    //alert(fechaCal);
    
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
      
    //} else {
      //  
      //  semanaAdviento-- ;
   // advientoArray[] = 
    }
    
  }
  
  /*alert('fechaCal : ' + fechaCal + '\n' +
        'dom1Adviento : ' + dom1Adviento + '\n' +
        'dom2Adviento : ' + dom2Adviento+ '\n' +
        'dom3Adviento : ' + dom3Adviento+ '\n' +
        'dom4Adviento : ' + dom4Adviento + '\n' +
        'Navidad : ' + Navidad + '\n');
  */
  document.getElementById("numAureo").value = numAureo;
  document.getElementById("letraDom").value = letraDom;
  
  //document.getElementById("dom1Adviento").value = dom1Adviento;
  
  document.getElementById("Dom1erAdviento").value = getFormattedDate(dom1Adviento);
  document.getElementById("Dom2doAdviento").value = getFormattedDate(dom2Adviento);
  document.getElementById("Dom3erAdviento").value = getFormattedDate(dom3Adviento);
  document.getElementById("Dom4toAdviento").value = getFormattedDate(dom4Adviento);
    document.getElementById("Navidad").value = getFormattedDate(Navidad);
    
  //Traer texto;
  //document.getElementById("Calendario").innerHTML = texto;
}

<!--
var meses = new Array ("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic")
var NombreDias = new Array("Sábado","Domingo","Lunes","Martes","Miércoles","Jueves","Viernes")

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Calcula la fecha del Domingo de Resurrección usando el algoritmo de Butcher (1876)
// Los resultados se dejan en: Dia_Res Ano_Res
// Algorithm por Juan Bautista José Delambre (Jean Baptiste Joseph Delambre) (1749-1822). 
// Este algoritmo es más conocido como el algoritmo de Butcher's (publicado en 1876) 
// quien a la vez lo obtuvo de un artículo anónimo en "Nature". 
//
// cidadaodomundo . weblog . com . pt / arquivo / 091530.html
//
// Para años anteriores a 1583 (Calendário Juliano):
// A = Ano MOD 4
// B = Ano MOD 7
// C = Ano MOD 19
// D = (19xC + 15) MOD 30
// E = (2xA + 4xB - D + 34) MOD 7
// F = (D + E + 114) MOD 31
// G = (D + E + 114) MOD 31
// La Pascua será el día G+1 del mes F
//
// Calendario Gregoriano (cualquier año a partir de 1583) 
// A = year
// B = year DIV 100 
// C = year MOD 100 
// D = B DIV 4
// E = B MOD 4
// F = (B + 8) DIV 25 
// G = (B - F + 1) DIV 3     
// H = (19 x A + B - D - G + 15) MOD 30     
// I = C DIV 4     
// K = C MOD 4     
// L = (32 + 2 x E + 2 x I - H - K) MOD 7     
// M = (A + 11 x H + 22 x L) DIV 451     
// P = 114 + H + L - 7 x M
// La Pascua será el día (p MOD 31)+1 del mes p DIV 31
////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CalculePascua (Agno, Calendario) {
   if (Calendario == "GREGORIANO") {
      a=Agno%19
      b=Math.floor(Agno/100)
      c=Agno%100
      d=Math.floor(b/4)
      e=b%4
      f=Math.floor((b+8)/25)
      g=Math.floor((b-f+1)/3)
      h=(19*a+b-d-g+15)%30
      i=Math.floor(c/4)
      k=c%4
      l=(32+2*e+2*i-h-k)%7
      m=Math.floor((a+11*h+22*l)/451)
      p=(h+l-7*m+114)
      // Devuelve un registro Registro.Dia_Res / Registro.Mes_Res
      return {Dia : (p%31)+1, Mes : Math.floor(p/31)}
   } else if (Calendario == "JULIANO") {
      // Para años anteriores a 1583 (Calendário Juliano):
      a = Agno % 4
      b = Agno % 7
      c = Agno % 19
      d = (19*c + 15) % 30
      e = (2*a + 4*b - d + 34) % 7
      f = Math.floor((d + e + 114) / 31)
      g = (d + e + 114) % 31
      // Devuelve un registro Registro.Dia_Res / Registro.Mes_Res
      return {Dia : g+1, Mes : f}
   } else return {Dia : 0, Mes : 0}
} // CalculePascua

function ValideAno(Agno) {
// Verifica que el año esté entre 1583 y 2499.
var ok = false;
 if(Agno<1583) alert("¡El año debe ser posterior o igual a 1583!" )
 else if(Agno>2499) alert("¡El año debe ser anterior a 2499!" )
 else if(isNaN(Agno)) alert("¡El año debe estar entre 1583 y 2499!")
 else return (true);
 return (false);
} // ValideAno

function ValideFecha(dia,mes,agno) {
// Verifica la corrección de la fecha
// Año posterior al año 1
// Mes entre 1 y 12
// Días entre los días del mes (teniendo en cuenta si el año es bisiesto)
   var ok = false;
   var nd = numDiasMes(mes,agno)

   if (agno <= 0) alert("EL año debe ser igual o posterior al año 1")
   else if (mes<1 || mes>12) alert("¡El mes no existe.\nEl mes debe estar entre 1 y 12!")
   else if (dia<1 || dia>nd) alert(" ¡El día no existe.\nPara el mes dado, el día debe estar entre 1 y " + nd + "!")
   else if ((agno == 1582) && (mes == 10) && (dia > 4) && (dia < 15))
      alert ("¡Día suprimido de la reforma gregoriana del 1582");
   else return (true);
   return (false);
}  // Valide fecha
  
function EsBisiesto (Agno) {
// Los cálculos del año bisiesto cambiam a partir de la reforma Gregoriana del 1582
// 1. A partir Octubre 15 de 1582, i.e. a partir de 1583 (año > 1583): 
//    Un año es bisiesto si es divisible por 4, excepto aquellos divisibles por 100 pero no por 400.
// 2. Antes de Octubre 4 de 1582, i.e. antes de 1581 (año < 1583): 
//    Un año es bisiesto si es divisible por 4.
   if (Agno%4 == 0) {
      if (Agno > 1583)
         if (Agno%100 == 0 && Agno%400 != 0) { return false }
      return true
   } else { return false }
} // Es bisiesto
    
function numDiasMes(mes,Agno){
// Devuelve la cantidad de Dias del mes
// 0 si ha error
   if (mes<1 || mes>12 || Agno<=0) {  return 0 }

   if(mes==2) { 
   // Si un año es bisiesto, Febrero tendrá 29 días y no 28
      if (EsBisiesto (Agno)) return 29
      else return 28
   } 
   else if (mes==7) { return 31 }
   else { return 30 +((mes % 7) % 2) }
} // numDiasMes

function GetDayofWeek(dia,mes,agno) {
// Obtiene el día de la semana dada una fecha desde el año 1

   dia = parseInt(dia, 10);
   if (isNaN(dia))dia = 0; 

   mes = parseInt(mes, 10);
   if (isNaN(mes))mes = 0; 

   agno = parseInt(agno, 10);
   if (isNaN(agno))agno = 0; 

   if (!ValideFecha (dia, mes, agno)) return

   var s=0; var m=1;
   // Obtiene en "s" el número de días desde el 1 de enero hasta el mes actual
   while (m<mes) s += numDiasMes(m++,agno)
   
   // El siguiente cálculo es común antes y después de la reforma Gregoriana
   var w = agno + Math.floor((agno - 1) / 4) + s + dia;

   // Los siguientes cálculos dependen de si la fecha es antes o después de la reforma
   if ((agno < 1582) || ((agno == 1582) && (mes < 10)) || ((agno == 1582) && (mes == 10) && (dia < 5)))
      // Si la fecha es antes de la reforma Gregoriana 4-10-1582
      w = w - 2;
   else // Si la fecha es despues de la reforma Gregoriana 15-10-1582
      w = w - Math.floor((agno - 1) / 100) + Math.floor((agno - 1) / 400);

   var p = (w % 7);
   
   return p;
} // GetDayofWeek

function FechaRelativa (Dia, Mes, Agno, DiferenciaDias) {
// Devuelve un registro con dos enteros con una fecha relativa a la 
// Pascua (Resurrección), sumando (en forma positiva o negativa) 
// una cantidad de dias

   var ndiasmes=0

   if (DiferenciaDias == 0) return {Dia:Dia,Mes:Mes,Ano:Agno}
 
   if (DiferenciaDias > 0) {
      Dia++   
      // Avanza mes tras mes hasta llegar a la fecha relativa
      while (DiferenciaDias>0) {
         ndiasmes = numDiasMes(Mes,Agno)
         if (DiferenciaDias > ndiasmes - Dia + 1) {
            if (Mes < 12) { Mes++ }
            else { Mes=1; Agno++ }
            DiferenciaDias -= ndiasmes - Dia + 1;
            Dia = 1
         } else { 
            Dia += DiferenciaDias - 1
            DiferenciaDias = -1
         }
      } // end while
   } // Endif
   else { // DiferenciaDias > 0
      DiferenciaDias *= -1;
      while (DiferenciaDias>0) {
         if (DiferenciaDias >= Dia) {
            if (Mes > 1) {Mes--}
            else { Mes=12; Agno-- }
            // dias del mes anterior
            DiferenciaDias -= Dia;
            ndiasmes = numDiasMes(Mes,Agno)
            Dia = ndiasmes
         } else { 
            Dia -= DiferenciaDias
            DiferenciaDias = -1;
         }
      } // end while
   } // End else

   return {Dia : Dia, Mes : Mes, Ano : Agno}
} // FechaRelativa

function Date2String (Fec,NombreDia) {
// Devuelve una cadena con una fecha compuesta por Dia-Mes-Ano, 
// Fec es un registro con 3 campos: dia, mes ano

   CodDia=GetDayofWeek(Fec.Dia,Fec.Mes,Fec.Ano)
   return (Fec.Dia + " " + meses[Fec.Mes-1] + " " + Fec.Ano  + (NombreDia?", "+NombreDias[CodDia]:""));
} // Date2String

function NumDiasEntreDiasSemana (CodDiaIni,CodDiaFin,direccion) {
// Devuelve el número de días que hay entre dos dias de la semana (Lunes, Martes...Domingo)
// hacia adelanta o hacia atras
// direccion = 1 => hacia el futuro :: direccion = -1 => hacia el pasado
// codday[Ini,Fin] : codigo del día correspondiente a la fecha 0:sabado 1:domingo 2:lunes ... 6:viernes
   if (CodDiaIni==CodDiaFin) return 0
   else if (direccion == 1) {
	   if (CodDiaFin > CodDiaIni) return (CodDiaFin - CodDiaIni)
		else return (CodDiaFin + 7 - CodDiaIni)
	} else if (direccion == -1) return (CodDiaIni + 7 - CodDiaFin)%7
   else return -1
} // NumDaysBetweenWeekDays

function Date2Obj (Fec) {
// Devuelve un objeto de tipo String
// Fec es un registro con 3 campos: dia, mes ano

   return getFormattedDate(new Date(Fec.Ano, Fec.Mes-1, Fec.Dia));
} // Date2String

function Fec2Obj (Fec) {
// Devuelve un objeto de tipo Date
// Fec es un registro con 3 campos: dia, mes ano

   return new Date(Fec.Ano, Fec.Mes-1, Fec.Dia);
} // Date2String

function getFormattedDate(date) {
  if(date != null && date != undefined) {
      if (date.getFullYear) {
          var year = date.getFullYear();
          var month = (1 + date.getMonth()).toString();
          month = month.length > 1 ? month : '0' + month;
          var day = date.getDate().toString();
          day = day.length > 1 ? day : '0' + day;
          //return year + '/' + month + '/' + day;
          return year + '-' + month + '-' + day;
          //return day + '/' + month + '/' + year;
      } else {
         return date;
      }    
  } else   {
      return '00/00/0000';
  }
}
//-->
function MuestreResultados() {
   var Agno = document.Fechas.Agno.value
   
   // Valida si el año es correcto
   if (!ValideAno(Agno)) { 
      LimpieCampos()
      return 
   }

   // Calcula el día de pascua del <Agno> y deja mes y dia en pascua.Mes, pascua.Dia  "GREGORIANO" o "JULIANO"
   var pascua = CalculePascua(Agno,"GREGORIANO")

   // Ahora calcula otras fechas relativas 
   // El primero domingo de Pascua es el de resurrección, le siguen el II, III hasta el VII de pascua
   // El VII domingo de Pascua (o Jueves de la 6ta semana) es la Ascensión
   /*document.Fechas.InicioCuaresma.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-46),false)
   document.Fechas.DomRamos.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-7),false)
   document.Fechas.DomResurreccion.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,0),false)
   document.Fechas.Asencion1.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,39),true)   // Jueves de la 6ta semana después Resurrecion
   document.Fechas.Asencion2.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,42),true)   // VII domingo de Pascua
   document.Fechas.DomPentecostes.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,49),true) // 50 dias después de Resurreción
   document.Fechas.DomTrinidad.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,56),true)    // 1 semana después de Pentecostes
   document.Fechas.Corpus1.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,60),true)      // Jueves siguiente a la S.S Trinidad
   document.Fechas.Corpus2.value=Date2String(FechaRelativa(pascua.Dia,pascua.Mes,Agno,63),true)      // Domingo siguiente a la S.S Trinidad*/

   document.Fechas.InicioCuaresma.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-46),false)
   document.Fechas.DomRamos.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-7),false)
   document.Fechas.JuevesSanto.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-3),false)
   document.Fechas.ViernesSanto.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-2),false)
   document.Fechas.SabGloria.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,-1),false)
   document.Fechas.DomResurreccion.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,0),false)
   document.Fechas.Asencion1.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,39),true)   // Jueves de la 6ta semana después Resurrecion
   document.Fechas.Asencion2.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,42),true)   // VII domingo de Pascua
   document.Fechas.DomPentecostes.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,49),true) // 50 dias después de Resurreción
   document.Fechas.DomTrinidad.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,56),true)    // 1 semana después de Pentecostes
   document.Fechas.Corpus1.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,60),true)      // Jueves siguiente a la S.S Trinidad
   document.Fechas.Corpus2.value=Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,63),true)      // Domingo siguiente a la S.S Trinidad
   
   //document.getElementById("Pascua").value = Date2Obj(FechaRelativa(pascua.Dia,pascua.Mes,Agno,0),false);
   calcularCal();

} // MuestreResultados

function LimpieCampos(){
   document.Fechas.Agno.value=2014
   document.Fechas.Agno.focus()

   document.Fechas.DomRamos.value=""
   document.Fechas.JuevesSanto.value=""
   document.Fechas.ViernesSanto.value=""
   document.Fechas.SabGloria.value=""
   document.Fechas.DomResurreccion.value=""
   document.Fechas.Asencion1.value=""
   document.Fechas.Asencion2.value=""
   document.Fechas.DomPentecostes.value=""
   document.Fechas.DomTrinidad.value=""
   document.Fechas.Corpus1.value=""
   document.Fechas.Corpus2.value=""
   document.Fechas.InicioCuaresma.value=""
} // LimpieCampos

