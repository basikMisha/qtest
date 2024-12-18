(function () {
    emailjs.init("N8olyyWpF1M58bJ9A");
})();

function validateInput(inputElement, validationFn, errorClass = "is-invalid", successClass = "is-valid") {
    const value = inputElement.value.trim();
    if (validationFn(value)) {
        inputElement.classList.remove(errorClass);
        inputElement.classList.add(successClass);
        return true;
    } else {
        inputElement.classList.add(errorClass);
        return false;
    }
}

function validateForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const seminarInput = document.getElementById("seminar");

    const isNameValid = validateInput(nameInput, value => value.length >= 2 && /^[а-яА-Яa-zA-Z\s]+$/.test(value));
    const isEmailValid = validateInput(emailInput, value => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value));
    const isSeminarValid = validateInput(seminarInput, value => value !== "");

    return isNameValid && isEmailValid && isSeminarValid;
}

function sendFormData(form) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const seminarSelect = document.getElementById('seminar');
    const seminarText = seminarSelect.options[seminarSelect.selectedIndex].text;

    const formData = { name, email, seminar: seminarText };

    emailjs.send("service_s9lh0uq", "template_65vexfv", formData)
        .then(response => {
            console.log("succ:", response.status, response.text);
            document.getElementById('seminar-form').style.display = 'none';
            document.getElementById('success-message').classList.remove('d-none');
        })
        .catch(error => {
            console.error("Error:", error);
            alert('Ошибка отправки формы.');
        });
}

document.getElementById('seminar-form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
        sendFormData(this);
    }
});
