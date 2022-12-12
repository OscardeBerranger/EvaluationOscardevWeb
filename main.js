// déclaration des variables
const baseUrl = "https://esdexamen.tk/b1devweb/api"
const mainContainer = document.querySelector('.mainContainer')
let loginButtons = document.querySelectorAll('.login')
let registerButtons = document.querySelectorAll('.register')
const userMenuBtn = document.querySelector('.userInfo')
const myModale = document.querySelector('.modale')
const myModaleContent = document.querySelector('.modaleContent')
const postBtn = document.querySelector('.postBtn')
let closeModale = document.querySelector('.closeModale')
let token
let currentUser



// fonctions
function addModale(content){
    myModaleContent.innerHTML = ""
    myModaleContent.innerHTML = `
    ${content}
    `
}

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

closeModale.addEventListener('click', ()=>{
        myModale.style.display = "none"
})
postBtn.addEventListener('click', ()=>{
    displayPostsPage()
})

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

function getUserTemplate(userInfo){
    let template = `  
        <div class="userInfo">
            <p class="username">Username : ${userInfo.username}</p>
            <p class="userId">User id : ${userInfo.id}</p>
        </div>
    `
    return template
}

function getCommTemplate(com){
    let template
    if (com.user.username === currentUser){
         template = `  
        <div class="userInfo">
            <p class="username">Username : ${com.user.username}</p>
            <p class="userId">comment : ${com.content}</p>
            <button class="editComm" id="${com.id}">edit comment</button>
            <div class="inputEditCommContainer${com.id}" id="${com.id}">

            </div>
            <button class="deleteComm" id = "${com.id}">delete comment</button>
        </div>
    `
    }else {
         template = `  
        <div class="userInfo">
            <p class="username">Username : ${com.user.username}</p>
            <p class="userId">comment : ${com.content}</p>
        </div>
    `
    }
    return template
}

// Un seul blog
function getPostTemplate(post){
    let template

    if (post.comments.length>0){
        let comTemplate
        post.comments.forEach(comm=>{
            console.log(comm)
            comTemplate+=getCommTemplate(comm)
        })
        if (post.user.username === currentUser){
            template = `
            <div class="postDiv myMsg">
                <a class="postAuthor" id="${post.user.id}">Author : ${post.user.username}</a>
                <div class="postContent">
                    <p><strong>${post.content}</strong></p>
                </div>
                <div class="comment">
                    ${comTemplate}
                    <button class="commentPost" id="${post.id}">Comment</button>
                    <div class="commentIt off" id="${post.id}">
                           <input class="sendCommentInput" type="text" id="sendCommentInput${post.id}">
                           <button class="sendComment" id="${post.id}"> send </button>
                    </div>
            </div>
                <button class="editPostButton" id = "${post.id}">edit</button>
                <button class="deletePostButton" id = "${post.id}">delete</button>
            </div>
            <div class="editPostContainer off" id="${post.id}">
                <input type="text" id="editPost${post.id}">
                <button class="editPost" id="${post.id}">Edit</button>
            </div>
        `
        }
        else {
            template = `
        <div class="postDiv notMyMsg" >
            <a class="postAuthor" id="${post.user.id}">Author : ${post.user.username}</a>
            <div class="postContent">
                <p><strong>${post.content}</strong></p>
            </div>
            <div class="comment">
                    ${comTemplate}
                    <button class="commentPost" id="${post.id}">Comment</button>
                    <div class="commentIt off" id="${post.id}">
                           <input class="sendCommentInput" type="text" id="sendCommentInput${post.id}">
                           <button class="sendComment" id="${post.id}"> send </button>
                    </div>
            </div>
        </div>
        `
        }
    }
    else {
        if (post.user.username === currentUser){
            template = `
        <div class="postDiv myMsg">
            <a class="postAuthor" id="${post.user.id}">Author : ${post.user.username}</a>
            <div class="postContent">
                <p><strong>${post.content}</strong></p>
            </div>
            <div class="comment">
                    <button class="commentPost" id="${post.id}">Comment</button>
                    <div class="commentIt off" id="${post.id}">
                           <input class="sendCommentInput" type="text" id="sendCommentInput${post.id}">
                           <button class="sendComment" id="${post.id}"> send </button>
                    </div>
            </div>
            <button class="editPostButton" id = "${post.id}">edit</button>
            <button class="deletePostButton" id = "${post.id}">delete</button>
        </div>
        <div class="editPostContainer off" id="${post.id}">
            <input type="text" id="editPost${post.id}">
            <button class="editPost" id="${post.id}">Edit</button>
        </div>
        `
        }
        else {

            template = `
        <div class="postDiv notMyMsg" >
            <a class="postAuthor" id="${post.user.id}">Author : ${post.user.username}</a>
            <div class="postContent">
                <p><strong>${post.content}</strong></p>
            </div>
            <div class="comment">
                    <button class="commentPost" id="${post.id}">Comment</button>
                    <div class="commentIt off" id="${post.id}">
                           <input class="sendCommentInput" type="text" id="sendCommentInput${post.id}">
                           <button class="sendComment" id="${post.id}"> send </button>
                    </div>
            </div>
        </div>
        `
        }
    }


    return template
}

// Tout les blogs
function getPostsTemplate(posts){

    let postsTemplate = `<h2>Post</h2>`
    let messages

    posts['hydra:member'].forEach(post=>{
        messages+=  getPostTemplate(post)
    })

    postsTemplate +=`
            <div class="postsContainer">
                ${messages}
            </div>
            <div class="sendPost">
                <input id = "sendPostInput" type="text">
                <button id="sendPost">Send</button>
            </div>
    `

    return postsTemplate

}

// Creation des fonctions de chargement
function displayLoginPage(){
    let loginPage = getLoginTemplate()
    document.querySelector('.mainPageWelcome').innerHTML = " "
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
    document.querySelector('.mainPageWelcome').innerHTML = " "
    display(registerPage)
    let button = document.querySelector('#registerSubmit')
    let username = document.querySelector('#registerUsernameInput')
    let password = document.querySelector('#registerPasswordInput')
    button.addEventListener('click', ()=>{
        register(username.value, password.value)
        displayLoginPage()
    })
    callListener()
}

async function displayPostsPage(){
    document.querySelector('.mainPageWelcome').innerHTML = " "
    getPostsFromApi().then(posts=>{
        posts+=getPostsTemplate(posts)
        display(posts)

        mainContainer.scrollTo(0, document.body.scrollHeight);
        document.querySelector('#sendPost').addEventListener('click', ()=>{
            sendPost(
                document.querySelector('#sendPostInput')
            )
        })

        document.querySelectorAll('.editPostButton').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                document.querySelectorAll('.editPostContainer').forEach(c=>{
                    if (c.id === btn.id){
                        c.classList.toggle("off")
                    }
                })
            })
        })

        document.querySelectorAll('.editPost').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                editPost(btn.id)
            })
        })

        document.querySelectorAll('.deletePostButton').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                deletePost(btn.id)
            })
        })
        document.querySelectorAll('.postAuthor').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                loadUserInfoFromApi(btn.id).then(data=>{
                     addModale(getUserTemplate(data))
                })
                myModale.style.display = "block"
            })
        })

        document.querySelectorAll('.commentPost').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                document.querySelectorAll('.commentIt').forEach(div=>{
                    if (div.id === btn.id){
                        div.classList.toggle("off")
                    }
                })
            })
        })

        document.querySelectorAll('.sendComment').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                addComm(btn.id)
            })
        })
        document.querySelectorAll('.deleteComm').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                deletComm(btn.id)
            })
        })

        document.querySelectorAll('.editComm').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                document.querySelector(`.inputEditCommContainer${btn.id}`).innerHTML = ""
                document.querySelector(`.inputEditCommContainer${btn.id}`).innerHTML += `
                                  <input type="text" class ="editComm${btn.id}" id="inputEditComm${btn.id}">
                                  <button class="editComm${btn.id}" id="sendEditComm${btn.id}">Submit</button>
                `

                document.querySelector(`#sendEditComm${btn.id}`).addEventListener('click', ()=>{
                    editComm(btn.id)
                })
            })

        })


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

function sendPost(content){
    let url = `${baseUrl}/post`
    let body = {
        content : content.value
    }
    let bodySerialise = JSON.stringify(body)

    let fetchParams = {
        method:"POST",
        headers:{"Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:bodySerialise
    }
    fetch(url, fetchParams)
        .then(displayPostsPage())


}

function editPost(id){
    let content = document.querySelector(`#editPost${id}`)
    let url = `${baseUrl}/posts/${id}`
    let body ={
        content:content.value
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: bodySerialise
    }
    fetch(url, fetchParams)
        .then(displayPostsPage)
}

function deletePost(id){
    let url = `${baseUrl}/posts/${id}`
    let fetchParams = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    fetch(url, fetchParams)
        .then(displayPostsPage)
}

async function loadUserInfoFromApi(id){
    let url = `${baseUrl}/users/${id}`
    let fetchParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await fetch(url, fetchParams)
        .then(response=>response.json())
        .then(data=>{
            return data
        })
}

function addComm(id){
    let url = `${baseUrl}/comment/${id}`
    let content = document.querySelector(`#sendCommentInput${id}`)
    let body = {
        content:content.value
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: bodySerialise
    }
    fetch(url, fetchParams)
        .then(displayPostsPage)
}

function deletComm(id){
    let url = `${baseUrl}/comments/${id}`
    let fetchParams = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        },
    }
    fetch(url, fetchParams)
        .then(displayPostsPage)
}

function editComm(id){
    let content = document.querySelector(`#inputEditComm${id}`)
    let url = `${baseUrl}/comments/${id}`
    let body ={
        content:content.value
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: bodySerialise
    }
    fetch(url, fetchParams)
        .then(displayPostsPage)
}
