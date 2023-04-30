const submit_btn = document.getElementById("btn");
const logout_btn = document.getElementById("logout-btn");
let user_name = document.getElementById("name");
let user_email = document.getElementById("email");
let user_password = document.getElementById("password");
let user_confirm_password = document.getElementById("confirm_password");
const profilediv = document.getElementById("profile");
const profilenav = document.getElementById("prfile-nav");
const indexnav = document.getElementById("index-nav");


// displayInfo();

// to generate 16 bytes of random token 
function generateAccessToken() {
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 32; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return token;
}


function submitdata() {

    let name = user_name.value;
    let email = user_email.value;
    let password = user_password.value;
    let confirm_password = user_confirm_password.value;
    // const accessToken = generateAccessToken();

    if (name != '' && email != '' && password != '' && confirm_password != '') {
        if (password == confirm_password) {
            document.getElementById("error").style.display = "none";
            document.getElementById("success").style.display = "block";

            saveInfo();

            user_name.value = '';
            user_email.value = '';
            user_password.value = '';
            user_confirm_password.value = '';
        } else {
            alert("Password and Confirm Password must be same");
        }

    } else {
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
    }
}


// to save the info in localStorage
function saveInfo() {
    const accessToken = generateAccessToken();

    const obj = {
        'name': user_name.value,
        'email': user_email.value,
        'password': user_password.value,
        'token': accessToken
    };
    // console.log(obj);

    localStorage.setItem('user', JSON.stringify(obj));

    window.location.href = 'profile.html';
    displayInfo();
}

// to display information in profile page
function displayInfo() {
    let temp = JSON.parse(localStorage.user);
    // If user is not logged in or has no token, redirect to signup page
    if (!temp) {
        window.location.href = '/index.html';
        return;
    }

    profilediv.innerHTML = `<h1 class="profile-heading">Profile</h1>
    <h1>Full Name: ${temp.name}</h1>
    <h1>Email: ${temp.email}</h1>
    <h1>password: ${temp.password}</h1>
    <button class="btn" id="logout-btn" onClick="logout()">Logout</button>`;
}


// Logout button
function logout() {
    // Remove user details from local storage
    localStorage.removeItem('user');
    // Redirect to signup page
    window.location.href = '/index.html';
};