function checkAccessToken() {
    var currentUrl = window.location.href;

    if (currentUrl.indexOf('index.html') !== -1 && localStorage.getItem('token')) {
        window.location.href = 'profile.html';
        showDataInDiv();
    } else if (currentUrl.indexOf('profile.html') !== -1 && !localStorage.getItem('token')) {
        window.location.href = 'index.html';
    }
}



// Check access token on page load
window.onload = function() {
    checkAccessToken();
};


function validateForm(event) {
    event.preventDefault();


    var fullname = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    var confirmPassword = document.getElementById('confirm-pass').value;
    var errorSpan = document.getElementById('error-span');
    var errDiv = document.getElementById('error-div');
    var SuccessDiv = document.getElementById('successfully-div');
    var logout = document.getElementById('logout');


    if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
        //   alert('Please fill in all fields.');
        errDiv.style.display = "block";
        errorSpan.innerHTML = `All the fields are mandatory `;
        setTimeout(() => {
            errDiv.style.display = "none";
        }, 5000);

        return;
    }


    if (password !== confirmPassword) {
        //   alert('Passwords do not match.');

        errDiv.style.display = "block";
        errorSpan.innerHTML = `Passwords do not match.`;
        setTimeout(() => {
            errDiv.style.display = "none";
        }, 5000);
        return;
    }


    console.log('Full Name:', fullname);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);


    document.getElementById('form').reset();
    SuccessDiv.style.display = "block";
    SuccessDiv.innerHTML = `Successfully Signed Up!`;
    setTimeout(() => {
        SuccessDiv.style.display = "none";
    }, 5000);


    var randomToken = generateRandomToken();
    console.log(randomToken);
    saveDataToLocalStorage("name", fullname);
    saveDataToLocalStorage("email", email);
    saveDataToLocalStorage("password", password);
    saveDataToLocalStorage("token", randomToken);

    loadUrl("./profile.html");


}



function loadUrl(urlThis) {
    setTimeout(() => {
        window.location.href = urlThis;
    }, 3000);

}

function saveDataToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}



function generateRandomToken() {
    var randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);

    var token = Array.from(randomBytes, function(byte) {
        return ('0' + byte.toString(16)).slice(-2);
    }).join('');

    return token;
}