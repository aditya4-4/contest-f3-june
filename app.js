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

// Retrieving data from local storage
function getDataFromLocalStorage(key) {
    var value = localStorage.getItem(key);
    return value ? value : null;
}

function showDataInDiv() {

    var nameShow = getDataFromLocalStorage("name")
    var emailShow = getDataFromLocalStorage("email")
    var passShow = getDataFromLocalStorage("password")
    console.log(nameShow, emailShow, passShow, "usershow")
        // getDataFromLocalStorage("token")
    var div = `<div>Full Name : <span id="show-name">${nameShow}</span></div>
    <div>Email : <span id="show-email">${emailShow}</span></div>
    <div>Password : <span id="show-password">${passShow}</span></div>`;
    var showAllData = document.getElementById('show-all-data');
    showAllData.innerHTML = div;
}
showDataInDiv();
//   logout
function loadUrl(urlThis) {
    setTimeout(() => {
        window.location.href = urlThis;
    }, 3000);

}

function logout() {

    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    loadUrl("./index.html");
}