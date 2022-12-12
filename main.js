// déclaration des variables
let baseUrl = "https://esdexamen.tk/b1devweb/api"
let mainContainer = document.querySelector('.mainContainer')
let loginButtons = document.querySelectorAll('.login')
let registerButtons = document.querySelectorAll('.register')
let token
let currentUser



// fonctions

function callListener(){
    loginButtons = document.querySelectorAll('.login')
    registerButtons = document.querySelectorAll('.register')

    loginButtons.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            displayLoginPage()
        })
    })

    registerButtons.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            displayRegisterPage()
        })
    })
}

document.querySelector('body').onload = callListener()

function display(content){
    mainContainer.innerHTML = ""

    mainContainer.innerHTML = content

}

// Creation des fonction get template

function getLoginTemplate(){
    let template = `
        <h2>login</h2>
        <label for="loginUsernameInput">Username</label>
        <input id="loginUsernameInput" type="text" placeholder="Your Username">
        <input id="loginPasswordInput" type="password" placeholder="Your Password">
        <button id="loginSubmit">Login</button>
        <p>Not registered yet ?</p>
        <button class="register">Register -></button>
    `
    return template
}

function getRegisterTemplate(){
    let template = `
            <h2>Register</h2>
            <label for="registerUsernameInput">Username</label>
            <input id="registerUsernameInput" type="text" placeholder="Your Username">
            <input id="registerPasswordInput" type="password" placeholder="Your Password">
            <button id="registerSubmit">Register</button>
            <p>Already registered ?</p>
            <button class="login">login -></button>
    `
    return template
}

// Un seul blog
function getPostTemplate(post){
    let template = `
        <div class="border border-dark">
            <p>Author : ${post.user.username}</p>
            <div class="messageContent">
                <p><strong>${post.content}</strong></p>
            </div>
        </div>
        `
    return template
}

// Tout les blogs
function getPostsTemplate(posts){

    let postsTemplate = ""

    posts['hydra:member'].forEach(post=>{

        postsTemplate+=  getPostTemplate(post)
    })

    return postsTemplate

}


// Creation des fonctions de chargement
function displayLoginPage(){
    let loginPage = getLoginTemplate()
    display(loginPage)
    let button = document.querySelector('#loginSubmit')
    let username = document.querySelector('#loginUsernameInput')
    let password = document.querySelector('#loginPasswordInput')
    button.addEventListener('click', ()=>{
        login(username.value, password.value)
    })
    callListener()
}

function displayRegisterPage(){
    let registerPage = getRegisterTemplate()
    display(registerPage)
    let button = document.querySelector('#registerSubmit')
    let username = document.querySelector('#registerUsernameInput')
    let password = document.querySelector('#registerPasswordInput')
    button.addEventListener('click', ()=>{
        register(username.value, password.value)
    })
    callListener()
}

async function displayPostsPage(){
    getPostsFromApi().then(posts=>{
        posts+=getPostsTemplate(posts)
        display(posts)
    })
}




// Creation des fonctions utilisants l'api
function register(username, password){
    let url = `${baseUrl}/registeruser`
    let body ={
        username:username,
        password:password
    }
    let bodySerialise = JSON.stringify(body)

    let fetchParams = {
        method:"POST",
        body:bodySerialise
    }
    fetch(url, fetchParams)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
        })
}

function login(username, password){
    let url = `${baseUrl}/login_check`
    let body = {
        username:username,
        password:password
    }
    let bodySerialise = JSON.stringify(body)

    let fetchparams = {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method : "POST",
        body: bodySerialise
    }
    fetch(url, fetchparams)
        .then(response=>response.json())
        .then(data=>{
            if (data.token){
                token = data.token
                currentUser = username
                displayPostsPage()
            }
            else console.log("fail")
        })
}

async function getPostsFromApi(){

    let url = `${baseUrl}/posts`

    let fetchParams = {
        method : 'GET',
        headers : {
            "Content-Type": "application/json"
        }
    }

    return await fetch(url, fetchParams)
        .then(response=>response.json())
        .then(posts=>{
            return posts
        })
}
