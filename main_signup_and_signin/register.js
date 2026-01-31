// Elements
const signin = document.getElementById("signin");
const signup = document.getElementById("signup");
const role = document.getElementById("role");
const staffBox = document.getElementById("staffBox");
const hodBox = document.getElementById("hodBox");
const name = document.getElementById("name");
const staffId = document.getElementById("staffId");
const hodId = document.getElementById("hodId");
const email = document.getElementById("email");
const emailErr = document.getElementById("emailErr");
const user = document.getElementById("user");
const pass = document.getElementById("pass");
const passErr = document.getElementById("passErr");
const secret = document.getElementById("secret");
const signupBtn = document.getElementById("signupBtn");
const msg = document.getElementById("msg");

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const loginRole = document.getElementById("loginRole");

// SHOW SIGNUP
function showSignup(){
    signin.classList.add("hidden");
    signup.classList.remove("hidden");
    resetForm();
}

// SHOW SIGNIN
function showSignin(){
    signup.classList.add("hidden");
    signin.classList.remove("hidden");
}

// ROLE CHANGE
function roleChange(){
    staffBox.classList.add("hidden");
    hodBox.classList.add("hidden");
    if(role.value==="staff") staffBox.classList.remove("hidden");
    if(role.value==="hod") hodBox.classList.remove("hidden");
}

// VALIDATE EMAIL
function validateEmail(){
    emailErr.textContent = email.value.includes("@") ? "" : "Email must contain @";
    checkForm();
}

// VALIDATE PASSWORD
function validatePass(){
    passErr.textContent = pass.value.length >= 8 ? "" : "Password must be at least 8 characters";
    checkForm();
}

// ENABLE SIGNUP BUTTON
function checkForm(){
    signupBtn.disabled = !(email.value.includes("@") && pass.value.length >= 8 && role.value !== "");
}

// RESET FORM
function resetForm(){
    role.value=""; name.value=""; staffId.value=""; hodId.value="";
    email.value=""; user.value=""; pass.value=""; secret.value="";
    emailErr.textContent=""; passErr.textContent=""; msg.textContent="";
    staffBox.classList.add("hidden"); hodBox.classList.add("hidden");
    signupBtn.disabled=true;
}

// REGISTER USER
function register(){
    if(!role.value || !user.value || !secret.value){
        alert("Please fill all required fields");
        return;
    }
    if(localStorage.getItem(user.value)){
        alert("Username already exists");
        return;
    }

    let data = {
        role: role.value,
        username: user.value,
        password: pass.value,
        fullname: name.value,
        staffId: staffId.value,
        hodId: hodId.value,
        email: email.value
    };

    localStorage.setItem(user.value, JSON.stringify(data));
    msg.textContent = "Registered successfully ✔ Please sign in.";

    setTimeout(()=>{ showSignin(); },1500);
}

// LOGIN USER
function login(){
    let u = loginUser.value;
    let p = loginPass.value;
    let r = loginRole.value;

    if(!r){ alert("Please choose role"); return; }

    let data = localStorage.getItem(u);
    if(!data){ alert("Account not found. Please Sign up."); return; }

    let d = JSON.parse(data);
    if(d.password === p && d.role === r){
        alert("Login Successful 🎉");
        loginUser.value=""; loginPass.value=""; loginRole.value="";
        
        // Redirect based on role
        if(r === "staff"){
            window.top.location.href = "../staff_dashboard/staff.html";
        } else if(r === "hod"){
            window.top.location.href = "hod.html";
        }
    } else {
        alert("Invalid credentials");
    }
}
