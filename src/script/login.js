function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let messageResult = document.getElementById("loginMessage");

    if(username=="admin" && password=="admin"){
        //true
        messageResult.innerHTML = "Correct login";
        setTimeout(() => window.location.href = "/src/pages/index.html", 1500);
    } else {
        messageResult.innerHTML = "Wrong username or password";
    }
}