// // var language = 0; // 0 para Español, 1 para Inglés

// // document.getElementById('btn-ingles').addEventListener('click', function() {
// //     language = 1;
// // });

// // document.getElementById('btn-espanol').addEventListener('click', function() {
// //     language = 0;
// // });

// CAMBIAR ENTRE LAS SECCIONES DE LA PÁGINA (MENÚ LATERAL)
function cambiarSeccion(li) {
    let secciones, urls;
    secciones = document.querySelectorAll("li");
    urls = ["index.html", "tercera.html", "abonate.html", "info.html"];
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.remove("active");
    }
    secciones[li].classList.add("active");
        setTimeout(function() {
            window.location.href = urls[li]}, 300);
}



// GENERAR TABLA DE CLASIFICACIÓN DE LA LIGA EN tercera.html
document.addEventListener("DOMContentLoaded", function() {
    ligaXML();
});
function ligaXML(){
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        mostrarLiga(this);
    }
    xhttp.open("GET", "liga.xml");
    xhttp.send();
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



// CAMBIAR DE HTML ENTRE tercera.html Y players.html
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



// CAMBIAR ENTRE LOS APARTADOS DE info.html
function apartados(seccion) {
    let botones, secciones, i;
    botones = ['botonInfo', 'botonContacto', 'botonMapa', 'botonPatr'];
    secciones = ['seccionInfo', 'seccionContacto', 'seccionMapa', 'seccionPatr'];
    for (i = 0; i < botones.length; i++) {
        document.getElementById(botones[i]).classList.remove('activo');
        document.getElementById(secciones[i]).classList.remove('seccionActiva');
    }
    document.getElementById(botones[seccion - 1]).classList.add('activo');
    document.getElementById(secciones[seccion - 1]).classList.add('seccionActiva');
}



// CONSULTA DE JUGADORES CON BUSCADOR DE DORSAL EN players.html
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("buscador")) {
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
                    break;
                }
            }
            if (jugador) {
                let tarjeta;
                tarjeta = "<div class='tarjeta'><div class='datos'><div class='dor-nombre'><h1 class='dorsal'>" + jugador.DORSAL + "</h1><h2 class='nombre'>" + jugador.NOMBRE + "</h2></div>";
                tarjeta += "<div class='pais'>- " + jugador.NACIONALIDAD + "</div>";
                tarjeta += "<div class='posicion'>- " + jugador.POSICION + "</div></div>";
                tarjeta += "<div class='imagen'><img src='images/players/" + jugador.IMAGEN + ".jpg'></div>";
                tarjeta += "</div>";
                document.getElementById("tarjetas").insertAdjacentHTML('afterbegin', tarjeta);
                document.getElementById("dorsales").value = "";
                document.getElementById("error").innerHTML = "";
                document.getElementById("dorsales").blur();
            } else {
                document.getElementById("error").innerHTML = "No se encontró ningún jugador con ese dorsal.";
                setTimeout(function() {
                    document.getElementById("error").innerHTML = "";
                }, 1500);
                document.getElementById("dorsales").value = "";
            }
        }
        document.getElementById('two').addEventListener('click', function() {
            limpiar();
        });
        function limpiar() {
            document.getElementById("tarjetas").innerHTML = "";
            document.getElementById("error").innerHTML = "";
            document.getElementById("dorsales").value = "";
            document.getElementById("dorsales").focus();
        }
    }
});



// FORMULARIO PARA ABONARSE EN abonate.html
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('formularioPago')) {
        document.getElementById('formularioPago').addEventListener('submit', function(event) {
            event.preventDefault();
            const metodoPago = document.getElementById('metodoPago').value;
            document.getElementById('contenido').classList.add('hidden');
            if (metodoPago === 'tarjeta') {
                document.getElementById('pago-tarjeta').classList.remove('hidden');
            } else if (metodoPago === 'efectivo') {
                document.getElementById('pago-efectivo').classList.remove('hidden');
            } else if (metodoPago === 'codigo') {
                document.getElementById('pago-codigo').classList.remove('hidden');
            }
        });

        let volver = document.getElementsByClassName('volver');
        for (let i = 0; i < volver.length; i++) {
            volver[i].addEventListener('click', function() {
                document.getElementById('contenido').classList.remove('hidden');
                document.getElementById('pago-tarjeta').classList.add('hidden');
                document.getElementById('pago-efectivo').classList.add('hidden');
                document.getElementById('pago-codigo').classList.add('hidden');
            });
        }
    }
});



// MOSTRAR U OCULTAR LAS VENTAJAS DE ABONARSE
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('masInfo')) {
        document.getElementById("masInfo").addEventListener("click", function() {
            mostrarVentajas();});
}});

function mostrarVentajas() {
    if (document.getElementById('ventajas').classList.contains('hidden')) {
        document.getElementById('ventajas').classList.remove('hidden');
        document.getElementById('btn-info').classList.add('hidden');
        document.getElementById('btn-noinfo').classList.remove('hidden');
    } else {
        document.getElementById('ventajas').classList.add('hidden');
        document.getElementById('btn-noinfo').classList.add('hidden');
        document.getElementById('btn-info').classList.remove('hidden');
    };
};