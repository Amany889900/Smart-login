var signUpAnchor = document.getElementById("signUpAnchor");
var signInAnchor = document.getElementById("signInAnchor");
var signUp = document.getElementById("signUp");
var login = document.getElementById("login");
var signUpEmail = document.getElementById("signUpEmail");
var signUpName = document.getElementById("signUpName");
var signUpPassword = document.getElementById("signUpPassword");
var loginBtn = document.getElementById("loginBtn");
var signUpBtn = document.getElementById("signUpBtn");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var welcome = document.getElementById("welcome");
var logOutBtn = document.getElementById("logOutBtn");
var errorMsg = document.getElementById("errorMsg");
var home = document.getElementById("home");

var users = [];

if(!localStorage.getItem("arrayOfUsers")){
    users =[];
    localStorage.setItem("arrayOfUsers",JSON.stringify(users));
}
else {
    users = JSON.parse(localStorage.getItem("arrayOfUsers"));
}


signUpAnchor.addEventListener("click", function() {
    login.classList.add("d-none");
    signUp.classList.remove("d-none");
    signUp.classList.add("d-block");
})

signInAnchor.addEventListener("click", function() {
    signUp.classList.remove("d-block");
    signUp.classList.add("d-none");
    login.classList.remove("d-none");
    login.classList.add("d-block");
})

function signUpEmailValidator(){
  var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return regex.test(signUpEmail.value);
}

function signUpNameValidator(){
  var regex =/^[a-z0-9_-]{3,15}$/ ;
  return regex.test(signUpName.value);
}

function signUpPasswordValidator(){
  var regex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ ;
  return regex.test(signUpPassword.value);
}
var used = 0;
signUpBtn.addEventListener("click", function(){

    if(signUpEmailValidator() && signUpNameValidator() && signUpPasswordValidator()){
        for(var i=0; i<users.length; i++){
            if(users[i].email === signUpEmail.value) {
                
                used = 1;
                break;
            }
        }
        if(used) alert('Email is already in use');

        else {
            var user = {
                email: signUpEmail.value,
                password: signUpPassword.value,
                name: signUpName.value
               }
        
        
               users.push(user);
               localStorage.setItem("arrayOfUsers",JSON.stringify(users));
               signUp.classList.remove("d-block");
               signUp.classList.add("d-none");
               login.classList.remove("d-none");
               login.classList.add("d-block");
        }
        
    }
    else {
        switch(true){
            
            case !signUpEmailValidator() && !signUpNameValidator() && !signUpPasswordValidator(): alert("All fields are invalid");break;
            case !signUpEmailValidator() && !signUpNameValidator(): alert("Email and Name are invalid"); break;
            case !signUpEmailValidator() && !signUpPasswordValidator(): alert("Email and Password are invalid"); break;
            case !signUpNameValidator() && !signUpPasswordValidator(): alert("Name and Password are invalid"); break;
            case !signUpEmailValidator(): alert("Email is invalid");
            break;
            case !signUpNameValidator(): alert("Name is invalid");
            break;
            case !signUpPasswordValidator(): alert("Password is invalid");
            break;
            
        }
    }
})
var user = 0;
function loginEmailValidator(){
    for(var i=0; i<users.length; i++){
        if(users[i].email === loginEmail.value) {
            user = i;
          return 1;
        }
      }
      return 0;
}
function loginPasswordValidator(){
    for(var i=0; i<users.length; i++){
        if(users[i].password === loginPassword.value) {
            user = i;
          return 1;
        }
      }
      return 0;
}

loginBtn.addEventListener("click",function(){
    if(loginEmailValidator() && loginPasswordValidator()) {
        login.classList.remove("d-block");
        login.classList.add("d-none");
        home.classList.remove("d-none");
        home.classList.add("d-block");
        logOutBtn.classList.remove("d-none");
        logOutBtn.classList.add("d-inline-block");
        welcome.innerHTML+=`<h1 class="border border-black p-5">Welcome ${users[user].name}</h1>`;
    }
    else {
        switch(true){
            case !loginEmailValidator() && !loginPasswordValidator(): alert("Both fields are invalid");break;
            case !loginEmailValidator(): alert("Email is invalid");break
            case !loginPasswordValidator(): alert("Password is invalid");break;
        }
    }
})

logOutBtn.addEventListener("click", function(){
    welcome.classList.remove("d-block");
    welcome.classList.add("d-none");
    login.classList.remove("d-none");
    login.classList.add("d-block");
    logOutBtn.classList.remove("d-inline-block");
    logOutBtn.classList.add("d-none");
})


