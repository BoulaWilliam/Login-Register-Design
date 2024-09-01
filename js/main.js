// Declare All inputs
// Register Data
var registerName = document.getElementById("registerName");
var registerEmail = document.getElementById("registerEmail");
var registerPassword = document.getElementById("registerPassword");
// Login Data
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
// Other Data
var errorInput = document.querySelector(".errorInput");
var userNameWelcome = localStorage.getItem("sessionUserName");
// Declare The Array Which will be saved at localStorage
var userInfo = [];
if (localStorage.getItem("user") != null) {
    userInfo = JSON.parse(localStorage.getItem("user"));
}
var nameRegex = /^[A-Z].{3,7}$/
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/g;

// Register Functions
function Register() {
    var user = {
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value,
    };
    if (checkSignUpEmpty() == false) {
        errorInput.innerHTML = `input is required`;
        return false;
    }
    if (checkExistsEmail() == false) {
        errorInput.classList.replace("text-success", "text-danger");
        errorInput.innerHTML = `This email already exists`;
        clearLogUpForm();
    } else if (
        nameRegex.test(registerName.value) &&
        emailRegex.test(registerEmail.value) &&
        passwordRegex.test(registerPassword.value)
    ) {
        userInfo.push(user);
        localStorage.setItem("user", JSON.stringify(userInfo));
        errorInput.classList.replace("text-danger", "text-success");
        errorInput.innerHTML = `Success`;
        window.location.href = "./index.html";
    } else {
        errorInput.innerHTML = `invalid Name or Email Or Password <br>
        name must start with uppercase and be in range (3,8) chars <br>
        email example (example@gmail.com) <br>
        password must be includes (uppercase letter, lowercase letter, special character, number, Min 8 char and Max 30 char)`;
        clearLogUpForm();
    }
}
function checkExistsEmail() {
    for (var i = 0; i < userInfo.length; i++) {
        if (registerEmail.value.toLowerCase() == userInfo[i].email.toLowerCase()) {
            return false;
        }
    }
}
function checkSignUpEmpty() {
    if (
        registerName.value == "" ||
        registerEmail.value == "" ||
        registerPassword.value == ""
    ) {
        return false;
    } else {
        return true;
    }
}
function checkSignInEmpty() {
    if (loginEmail.value == "" || loginPassword.value == "") {
        document.querySelector(".invalid").innerHTML = `All inputs is required`;
        return false;
    } else {
        return true;
    }
}
function clearLogUpForm() {
    registerName.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
}
function clearLogInForm() {
    loginEmail.value = "";
    loginPassword.value = "";
}

// Login Functions
function login() {
    if (!checkSignInEmpty()) {
        return false;
    }
    for (var i = 0; i < userInfo.length; i++) {
        if (
            userInfo[i].email.toLowerCase() == loginEmail.value.toLowerCase() &&
            userInfo[i].password.toLowerCase() == loginPassword.value.toLowerCase()
        ) {
            localStorage.setItem("sessionUserName", userInfo[i].name);
            errorInput.classList.replace("text-danger","text-success");
            errorInput.innerHTML = `Success`;
            window.location.href = "./home.html";
        } else  {
            errorInput.classList.replace("text-success","text-danger");
            errorInput.innerHTML = `incorrect email or password`;
        }
    }
}
if (userNameWelcome) {
    document.getElementById("userLogin").innerHTML = "Welcome " + userNameWelcome;
    document.getElementById("userLoginMessage").innerHTML =  " أيه الكلام " ;
}

function logout() {
    localStorage.removeItem("sessionUserName");
    window.location.href = "./index.html";
}

// Eye Functions
let eyes = document.getElementsByClassName('eye')
document.onmousemove = function (e) {
    let x = `${e.clientX * 100 / window.innerWidth}%`
    let y = `${e.clientY * 100 / window.innerHeight}%`
    document.body.classList.add('mouse-over');

    for (let i = 0; i < eyes.length; i++) {
        const eye = eyes[i];
        let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;

        let radian = Math.atan2(e.pageX - x, e.pageY - y)
        let rotation = radian * (100 / Math.PI) * -1 + 270;
        eye.style.transform = `rotate(${rotation}deg)`;
    }
}

document.onmouseleave = () => {
    document.body.classList.remove('mouse-over');
}