// Lista de correos simulados
const emailList = [
    {
        sender: "soporte@paypal-servicio.com",
        subject: "Confirma tu cuenta ahora",
        body: "Hemos detectado actividad sospechosa en tu cuenta. Haz clic aquí para verificar tu identidad.",
        attachment: "verificacion.pdf.exe",
        type: "malicious"
    },
    {
        sender: "no-reply@indecopi.com",
        subject: "Actualización de políticas internas",
        body: "Adjuntamos las nuevas políticas de uso interno. Por favor, revísalas.",
        attachment: "",
        type: "safe"
    },
    {
    sender: "supportserviciocliente@bancoazul.com",
    subject: "Cuenta bloqueada temporalmente",
    body: "Hemos detectado actividad inusual. Inicia sesión para desbloquear tu cuenta.",
    attachment: "acceso_seguro.zip",
    type: "malicious"
    },
    {
        sender: "actualizacion-segura@microsftonline.com",
        subject: "Tu contraseña ha expirado",
        body: "Haz clic aquí para restablecer tu contraseña antes de que sea demasiado tarde.",
        attachment: "documento_seguridad.docx",
        type: "suspicious"
    }
];

let currentEmailIndex = 0;

function loadEmail(index) {
    const email = emailList[index];
    document.getElementById("sender").textContent = email.sender;
    document.getElementById("subject").textContent = email.subject;
    document.getElementById("body").textContent = email.body;

    if (email.attachment) {
        document.getElementById("attachment").innerHTML = "<strong>Archivo adjunto:</strong> " + email.attachment;
    } else {
        document.getElementById("attachment").innerHTML = "";
    }

    // Limpiar resultado anterior
    document.getElementById("result").style.display = "none";
    document.getElementById("result").textContent = "";
}

function deleteEmail() {
    showResult("Correo eliminado correctamente.", "correct");
}

function reportEmail() {
    showResult("Correo reportado al departamento de seguridad.", "warning");
}

function openEmail() {
    const email = emailList[currentEmailIndex];
    let message, className;

    if (email.type === "safe") {
        message = "Este correo es seguro. ¡Buen trabajo!";
        className = "correct";
    } else if (email.type === "suspicious") {
        message = "Este correo parece sospechoso. Ten cuidado.";
        className = "warning";
    } else if (email.type === "malicious") {
        message = "¡Alerta! Este correo es malicioso. No debiste abrirlo.";
        className = "danger";
    }

    showResult(message, className);
}

function showResult(text, className) {
    const resultDiv = document.getElementById("result");
    resultDiv.className = "result " + className;
    resultDiv.textContent = text;
    resultDiv.style.display = "block";

    // Habilitar botón siguiente
    document.getElementById("nextButton").style.display = "inline-block";
}

function nextEmail() {
    currentEmailIndex++;
    if (currentEmailIndex < emailList.length) {
        loadEmail(currentEmailIndex);
        document.getElementById("nextButton").style.display = "none";
        document.getElementById("level").textContent = "Nivel " + (currentEmailIndex + 1);
    } else {
        document.querySelector(".email-box").style.display = "none";
        document.querySelector(".buttons").style.display = "none";
        document.getElementById("result").className = "result correct";
        document.getElementById("result").textContent = "🎉 ¡Felicidades! Has completado todos los niveles.";
        document.getElementById("result").style.display = "block";
        document.getElementById("nextButton").style.display = "none";
    }
}

// Cargar primer correo al inicio
window.onload = function () {
    loadEmail(currentEmailIndex);
    document.getElementById("level").textContent = "Nivel " + (currentEmailIndex + 1);
};
