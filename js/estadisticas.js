document.addEventListener("DOMContentLoaded", function () {

    const tiempoJuntos = document.getElementById("tiempo-juntos");
    const tiempoConocidos = document.getElementById("tiempo-conocidos");
    const nextCele = document.getElementById("nextCele");
    const nextAño = document.getElementById("nextAño");
    const nextMes = document.getElementById("nextMes");
    
    const fechaButton = document.getElementById("fecha");
    const diaButton = document.getElementById("dias");
    const horaButton = document.getElementById("horas");
    const minutosButton = document.getElementById("minutos");
    const segundosButton = document.getElementById("segundos");

    const segundo1 = document.getElementById("seg1");

    let modoActual = "fecha";

    if (fechaButton) fechaButton.addEventListener("click", () => cambiarModo("fecha"));
    if (diaButton) diaButton.addEventListener("click", () => cambiarModo("dias"));
    if (horaButton) horaButton.addEventListener("click", () => cambiarModo("horas"));
    if (minutosButton) minutosButton.addEventListener("click", () => cambiarModo("minutos"));
    if (segundosButton) segundosButton.addEventListener("click", () => cambiarModo("segundos"));

    function cambiarModo(nuevoModo) {
        modoActual = nuevoModo;
        actualizarTemporizadores();
    }

    setInterval(() => {
        actualizarTemporizadores();
    }, 1000);

    actualizarTemporizadores();

    function calcularTiempoTranscurrido(fechaInicio) {
        const ahora = new Date();
        const diffMs = ahora - fechaInicio;

        if (modoActual === "segundos") {
            const totalSeg = Math.floor(diffMs / 1000);
            return `${totalSeg.toLocaleString()} segundos`;
        }

        if (modoActual === "minutos") {
            const totalMin = Math.floor(diffMs / (1000 * 60));
            return `${totalMin.toLocaleString()} minutos`;
        }

        if (modoActual === "horas") {
            const totalHoras = Math.floor(diffMs / (1000 * 60 * 60));
            return `${totalHoras.toLocaleString()} horas`;
        }

        if (modoActual === "dias") {
            const totalDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            return `${totalDias.toLocaleString()} días`;
        }

        let años = ahora.getFullYear() - fechaInicio.getFullYear();
        let meses = ahora.getMonth() - fechaInicio.getMonth();
        let dias = ahora.getDate() - fechaInicio.getDate();
        let horas = ahora.getHours() - fechaInicio.getHours();
        let minutos = ahora.getMinutes() - fechaInicio.getMinutes();
        let segundos = ahora.getSeconds() - fechaInicio.getSeconds();

        if (segundos < 0) { segundos += 60; minutos--; }
        if (minutos < 0) { minutos += 60; horas--; }
        if (horas < 0) { horas += 24; dias--; }
        if (dias < 0) {
            const ultimoDiaMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
            dias += ultimoDiaMesAnterior;
            meses--;
        }
        if (meses < 0) { meses += 12; años--; }

        return `${años} años, ${meses} meses, ${dias} días, ${horas} h, ${minutos} m y ${segundos} s`;
    }

    function calcularTiempoRestante(ahora, fechaMeta) {
        const diffMs = fechaMeta - ahora;

        if (diffMs <= 0) return "Siiiii es ahora";

        if (modoActual === "segundos") {
            const totalSeg = Math.floor(diffMs / 1000);
            return `${totalSeg.toLocaleString()}s`;
        }

        if (modoActual === "minutos") {
            const totalMin = Math.floor(diffMs / (1000 * 60));
            return `${totalMin.toLocaleString()}m`;
        }

        if (modoActual === "horas") {
            const totalHoras = Math.floor(diffMs / (1000 * 60 * 60));
            return `${totalHoras.toLocaleString()}h`;
        }

        if (modoActual === "dias") {
            const totalDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            return `${totalDias.toLocaleString()} días`;
        }

        let meses = (fechaMeta.getFullYear() - ahora.getFullYear()) * 12 + (fechaMeta.getMonth() - ahora.getMonth());
        let dias = fechaMeta.getDate() - ahora.getDate();
        let horas = fechaMeta.getHours() - ahora.getHours();
        let minutos = fechaMeta.getMinutes() - ahora.getMinutes();
        let segundos = fechaMeta.getSeconds() - ahora.getSeconds();

        if (segundos < 0) { segundos += 60; minutos--; }
        if (minutos < 0) { minutos += 60; horas--; }
        if (horas < 0) { horas += 24; dias--; }
        if (dias < 0) {
            const ultimoDiaMesAnterior = new Date(fechaMeta.getFullYear(), fechaMeta.getMonth(), 0).getDate();
            dias += ultimoDiaMesAnterior;
            meses--;
        }

        return `${meses}m ${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    function actualizarTemporizadores() {
        const ahora = new Date();
        nextAño.textContent = calcularTiempoRestante(ahora, getProximo21Febrero(ahora));
        nextMes.textContent = calcularTiempoRestante(ahora, getProximo21Mensual(ahora));
        nextCele.textContent = calcularTiempoRestante(ahora, getProximo21FebOAgo(ahora));
        tiempoConocidos.textContent = calcularTiempoTranscurrido(new Date(2022, 5, 3, 10, 0, 0));
        tiempoJuntos.textContent = calcularTiempoTranscurrido(new Date(2023, 1, 21, 17, 35, 0));
        segundo1.textContent = segundo1.textContent == "0:01 segundos" ? "0:00 segundos" : "0:01 segundos";
    }

    function getProximo21Febrero(ahora) {
        let año = ahora.getFullYear();
        let meta = new Date(año, 1, 21, 0, 0, 0); 
        if (ahora >= meta) meta = new Date(año + 1, 1, 21, 0, 0, 0);
        return meta;
    }

    function getProximo21Mensual(ahora) {
        let año = ahora.getFullYear();
        let mes = ahora.getMonth();
        let meta = new Date(año, mes, 21, 0, 0, 0);
        if (ahora >= meta) meta = new Date(año, mes + 1, 21, 0, 0, 0);
        return meta;
    }

    function getProximo21FebOAgo(ahora) {
        let año = ahora.getFullYear();
        let feb = new Date(año, 1, 21, 0, 0, 0);
        let ago = new Date(año, 7, 21, 0, 0, 0);

        if (ahora < feb) return feb;
        if (ahora < ago) return ago;
        return new Date(año + 1, 1, 21, 0, 0, 0);
    }

});