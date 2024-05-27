ligaXML()
  
function ligaXML(){
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        mostrarLiga(this);
    }
    xhttp.open("GET", "liga.xml");
    xhttp.send();
}

function paginaJugadores(li) {
    let urls;
    if (li === 0) {
        document.body.classList.add("oscuro");
        document.getElementById("menu").classList.add("oscuro")
    }
    else {
        document.body.classList.add("claro");
    }
    urls = ["players.html", "tercera.html"];
    setTimeout(function() {
        window.location.href = urls[li]}, 400);
}

function mostrarLiga(xml) {
    let xmlDoc, table, equipos, i, pos, nombre, pts, pj, pg, pe, pp, dg;
    xmlDoc = xml.responseXML;
    table = "<table class='tabla'>";
    table += "<tr><th>Puesto</th><th>Equipo</th><th>Pts</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>DG</th></tr>";
    equipos = xmlDoc.getElementsByTagName("equipo").length;
    for(i=0; i<equipos; i++) {
        nombre = xmlDoc.getElementsByTagName("nombre")[i].childNodes[0].nodeValue;
        pos = xmlDoc.getElementsByTagName("puesto")[i].childNodes[0].nodeValue;
        pts = xmlDoc.getElementsByTagName("puntos")[i].childNodes[0].nodeValue;
        pj = xmlDoc.getElementsByTagName("jugado")[i].childNodes[0].nodeValue;
        pg = xmlDoc.getElementsByTagName("ganados")[i].childNodes[0].nodeValue;
        pe = xmlDoc.getElementsByTagName("empatados")[i].childNodes[0].nodeValue;
        pp = xmlDoc.getElementsByTagName("perdidos")[i].childNodes[0].nodeValue;
        dg = xmlDoc.getElementsByTagName("diferencia")[i].childNodes[0].nodeValue;
        table += "<tr><td>" + pos + "</td><td>" + nombre + "</td><td>" + pts + "</td><td>" + pj + "</td><td>" + pg + "</td><td>" + pe + "</td><td>" + pp + "</td><td>" + dg + "</td></tr>";
    }
    table += "</table>";
    document.getElementById("liga").innerHTML = table;
}

function cambiarSeccion(li) {
    let secciones, urls;
    secciones = document.querySelectorAll("li");
    urls = ["index.html", "tercera.html", "abonate.html", "campus.html"];
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.remove("active");
    }
    secciones[li].classList.add("active");
        setTimeout(function() {
            window.location.href = urls[li]}, 300);
}

document.getElementById("buscador").addEventListener("submit", function(event) {
    event.preventDefault();
    let dorsal = document.getElementById("dorsales").value;
    consultarJugadores(dorsal);
});

function consultarJugadores(dorsal) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      jugadores = JSON.parse(xhr.responseText).PLAYER;
      mostrarJugador(dorsal);
    };
    xhr.open("GET", "players_catalog.json");
    xhr.send();
}
  
function mostrarJugador(dorsal) {
let jugador;
jugador = null;
for (let i = 0; i < jugadores.length; i++) {
    if (jugadores[i].DORSAL === dorsal) {
    jugador = jugadores[i];
    break;}
}
if (jugador) {
    let tarjeta;
    tarjeta = "<div class='tarjeta'><div class='datos'><div class='dor-nombre'><h1 class='dorsal'>" + jugador.DORSAL + "</h1><h2 class='nombre'>" + jugador.NOMBRE + "</h2></div>";
    tarjeta += "<div class='pais'>- " + jugador.NACIONALIDAD +"</div>";
    tarjeta += "<div class='posicion'>- " + jugador.POSICION + "</div></div>";
    tarjeta += "<div class='imagen'><img src='images/players/" +jugador.IMAGEN+ ".jpg'></div>";
    tarjeta += "</div>";
    document.getElementById("tarjetas").insertAdjacentHTML('afterbegin', tarjeta);
    document.getElementById("dorsales").value = "";
    document.getElementById("dorsales").focus();
    document.getElementById("error").innerHTML = "";
} else {
    document.getElementById("error").innerHTML = "No se encontró ningún jugador con ese dorsal.";
    setTimeout(function() {
        document.getElementById("error").innerHTML = ""}, 1500)
    document.getElementById("dorsales").value = "";
}
}

function limpiar(){
    document.getElementById("tarjetas").innerHTML = "";
    document.getElementById("error").innerHTML = "";
    document.getElementById("dorsales").value = "";
    document.getElementById("dorsales").focus();
}  


function apartados(seccion) {
    let botones, secciones, i;
    botones = ['botonInfo', 'botonPago', 'botonMapa'];
    secciones = ['seccionInfo', 'seccionPago', 'seccionMapa'];

    for (i = 0; i < botones.length; i++) {
        document.getElementById(botones[i]).classList.remove('activo');
        document.getElementById(secciones[i]).classList.remove('seccionActiva');
    }
    document.getElementById(botones[seccion - 1]).classList.add('activo');
    document.getElementById(secciones[seccion - 1]).classList.add('seccionActiva');
}