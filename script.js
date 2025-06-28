// Datos del correo simulado
const email = {
    sender: "soporte@paypal-servicio.com",
    subject: "Confirma tu cuenta ahora",
    body: "Hemos detectado actividad sospechosa en tu cuenta. Haz clic aquí para verificar tu identidad.",
    attachment: "verificacion.pdf.exe",
    type: "malicious"
};

// Cargar correo al inicio
document.getElementById("sender").textContent = email.sender;
document.getElementById("subject").textContent = email.subject;
document.getElementById("body").textContent = email.body;

if (email.attachment) {
    document.getElementById("attachment").innerHTML = "<strong>Archivo adjunto:</strong> " + email.attachment;
}

// Acciones del jugador
function deleteEmail() {
    showResult("Correo eliminado correctamente.", "correct");
}

function reportEmail() {
    showResult("Correo reportado al departamento de seguridad.", "warning");
}

function openEmail() {
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

// Mostrar resultado
function showResult(text, className) {
    const resultDiv = document.getElementById("result");
    resultDiv.className = "result " + className;
    resultDiv.textContent = text;
    resultDiv.style.display = "block";
}