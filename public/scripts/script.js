document.addEventListener("DOMContentLoaded", function() {
    const envelope = document.querySelector(".envelope");
    const openButton = document.querySelector(".open-button");
    const confirmButton = document.querySelector(".confirm-button");
    const nameInput = document.getElementById("nameInput");
    const errorMessage = document.getElementById("error-message");
    const thankYouMessage = document.querySelector(".thank-you-message");
    const confettiContainer = document.getElementById("confetti-container");

    openButton.addEventListener("click", function() {
        envelope.classList.add("open");
    });

    nameInput.addEventListener("input", function() {
        validateName();
    });

    confirmButton.addEventListener("click", function() {
        if (validateName()) {
            sendEmail(nameInput.value.trim());
            envelope.classList.remove("open");
            envelope.style.transition = "transform 1s ease-in-out, opacity 1s ease-in-out";
            envelope.style.transform = "translate(50vw, -50vh) rotate(360deg)";
            envelope.style.opacity = "0";
            setTimeout(function() {
                envelope.style.display = "none";
                thankYouMessage.style.display = "block";
                createConfetti();
            }, 1000);
        }
    });

    function validateName() {
        const name = nameInput.value.trim();
        const namePattern = /^[A-Za-z]+$/;
        if (name === "") {
            errorMessage.textContent = "";
            confirmButton.disabled = true;
            confirmButton.style.opacity = "0.5";
            return false;
        }
        if (!/^[A-Z]/.test(name)) {
            errorMessage.textContent = "Precisa começar com letra maiúscula.";
            confirmButton.disabled = true;
            confirmButton.style.opacity = "0.5";
            return false;
        }
        if (name.length > 10) {
            errorMessage.textContent = "O nome não pode passar de 10 caracteres.";
            confirmButton.disabled = true;
            confirmButton.style.opacity = "0.5";
            return false;
        }
        if (!namePattern.test(name)) {
            errorMessage.textContent = "O nome pode conter apenas letras.";
            confirmButton.disabled = true;
            confirmButton.style.opacity = "0.5";
            return false;
        }
        errorMessage.textContent = "";
        confirmButton.disabled = false;
        confirmButton.style.opacity = "1";
        return true;
    }

    function sendEmail(name) {
        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.text())
        .then(data => {
            console.log('SUCCESS!', data);
        })
        .catch((error) => {
            console.error('FAILED...', error);
        });
    }

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confettiContainer.appendChild(confetti);
        }
    }
});
