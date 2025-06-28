// Lista de correos simulados - 10 NIVELES
const emailList = [
    {
        sender: "soporte@paypal-servicio.com",
        subject: "Confirma tu cuenta ahora",
        body: "Hemos detectado actividad sospechosa en tu cuenta. Haz clic aquí para verificar tu identidad.",
        attachment: "verificacion.pdf.exe",
        type: "malicious"
    },
    {
        sender: "no-reply@empresaoficial.com",
        subject: "Actualización de políticas internas",
        body: "Adjuntamos las nuevas políticas de uso interno. Por favor, revísalas.",
        attachment: "",
        type: "safe"
    },
    {
        sender: "actualizacion-segura@microsftonline.com",
        subject: "Tu contraseña ha expirado",
        body: "Haz clic aquí para restablecer tu contraseña antes de que sea demasiado tarde.",
        attachment: "documento_seguridad.docx",
        type: "suspicious"
    },
    {
        sender: "soporte@netflix-actualizacion.com",
        subject: "Tu membresía está a punto de vencer",
        body: "Hemos notado que tu forma de pago no es válida. Haz clic aquí para actualizarla.",
        attachment: "",
        type: "suspicious"
    },
    {
        sender: "banco@bbva-serviciocliente.com",
        subject: "Inicia sesión para desbloquear tu cuenta",
        body: "Se ha detectado un inicio de sesión desde otro dispositivo. Haz clic aquí para verificar.",
        attachment: "verificacion_seguridad.exe",
        type: "malicious"
    },
    {
        sender: "notificaciones@dhl.com",
        subject: "Tu paquete ha sido enviado",
        body: "Tu envío con número de seguimiento 123456789 ya fue despachado. Descarga la información adjunta.",
        attachment: "guia_envio.pdf",
        type: "safe"
    },
    {
        sender: "premios@ganadores-amazon.net",
        subject: "¡Has ganado $1000 en Amazon!",
        body: "Haz clic en el enlace para reclamar tu premio antes de que expire.",
        attachment: "",
        type: "suspicious"
    },
    {
        sender: "alerta@whatsapp.com",
        subject: "Tu cuenta será eliminada",
        body: "Hemos detectado actividad sospechosa. Haz clic aquí para proteger tu cuenta.",
        attachment: "proteccion_cuenta.apk",
        type: "malicious"
    },
    {
        sender: "rrhh@empresaoficial.com",
        subject: "Actualización de datos laborales",
        body: "Adjuntamos documento con los formularios necesarios para actualizar tu información personal.",
        attachment: "formulario_actualizacion.docx",
        type: "safe"
    },
    {
        sender: "soporte@app-messenger.net",
        subject: "Nueva actualización disponible",
        body: "Descarga la última versión de Messenger Pro desde el enlace adjunto.",
        attachment: "MessengerProSetup.exe",
        type: "malicious"
    }
];

let currentEmailIndex = 0;
let timerInterval;
let score = 0;
let totalTime = 0;

function loadEmail(index) {
    clearInterval(timerInterval);

    const email = emailList[index];
    document.getElementById("sender").textContent = email.sender;
    document.getElementById("subject").textContent = email.subject;
    document.getElementById("body").textContent = email.body;

    if (email.attachment) {
        document.getElementById("attachment").innerHTML = "<strong>Archivo adjunto:</strong> " + email.attachment;
    } else {
        document.getElementById("attachment").innerHTML = "";
    }

    document.getElementById("result").style.display = "none";
    document.getElementById("nextButton").style.display = "none";

    startTimer(30); // Iniciar temporizador de 30 segundos
}

function deleteEmail() {
    const email = emailList[currentEmailIndex];
    let isCorrect = email.type === "malicious" || email.type === "suspicious";
    handleAction(isCorrect);
}

function reportEmail() {
    const email = emailList[currentEmailIndex];
    let isCorrect = email.type === "malicious" || email.type === "suspicious";
    handleAction(isCorrect);
}

function openEmail() {
    const email = emailList[currentEmailIndex];
    let message, className;

    if (email.type === "safe") {
        message = "Este correo es seguro. ¡Buen trabajo!";
        className = "correct";
        handleAction(true);
    } else if (email.type === "suspicious") {
        message = "Este correo parece sospechoso. Ten cuidado.";
        className = "warning";
        handleAction(false);
    } else if (email.type === "malicious") {
        message = "¡Alerta! Este correo es malicioso. No debiste abrirlo.";
        className = "danger";
        handleAction(false);
    }

    showResult(message, className);
}

function handleAction(isCorrect) {
    clearInterval(timerInterval);
    if (isCorrect) {
        score++;
    }
    document.getElementById("nextButton").style.display = "inline-block";
}

function showResult(text, className) {
    const resultDiv = document.getElementById("result");
    resultDiv.className = "result " + className;
    resultDiv.textContent = text;
    resultDiv.style.display = "block";
}

function nextEmail() {
    totalTime += (30 - parseInt(document.querySelector("#timer span").textContent));
    currentEmailIndex++;

    if (currentEmailIndex < emailList.length) {
        loadEmail(currentEmailIndex);
        document.getElementById("level").textContent = "Nivel " + (currentEmailIndex + 1);
    } else {
        showFinalSummary();
    }
}

function startTimer(duration) {
    let timeLeft = duration;
    const timerElement = document.querySelector("#timer span");
    timerElement.textContent = timeLeft;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResult("⏰ Tiempo agotado. ¡Inténtalo de nuevo!", "danger");
            document.getElementById("nextButton").style.display = "inline-block";
        }
    }, 1000);
}

function showFinalSummary() {
    document.querySelector(".game-container").style.display = "none";
    const summary = document.getElementById("summary");
    summary.style.display = "block";

    const percentage = Math.round((score / emailList.length) * 100);
    document.getElementById("finalScore").textContent = `Puntaje final: ${score} de ${emailList.length}`;
    document.getElementById("percentage").textContent = `Acierto: ${percentage}%`;
    document.getElementById("totalTime").textContent = `Tiempo total: ${totalTime} segundos`;

    let message = "";
    if (percentage === 100) {
        message = "🎉 ¡Excelente trabajo! Eres un experto en seguridad cibernética.";
    } else if (percentage >= 70) {
        message = "👍 Buen trabajo. Tienes buen criterio para identificar correos peligrosos.";
    } else {
        message = "⚠️ Puedes mejorar. Practica más para reconocer señales de phishing.";
    }
    document.getElementById("finalMessage").textContent = message;
}

// Cargar primer correo al inicio
window.onload = function () {
    loadEmail(currentEmailIndex);
    document.getElementById("level").textContent = "Nivel " + (currentEmailIndex + 1);
};
