// En esta pre entrega, intente generar un foro, similar al antiguo foro de promiedos, pero con el equipo de mi provincia, asi no se torna violenta la conversacion!! o parecido... Trate de ser lo mas preciso posible en cuestiones de clases y metodos, para evitar que se rompa lo menos posible la pagina, hay algunos elementos y funciones que saque de internet, buscando siempre algo que queria generar y no sabia como crearlo, Saludos profe. Benjamin-Neyra //

class User {
    /* clases */
    constructor(name, lastname, age, tel, password) {
        this.name = capitalize(name)
        this.lastname = capitalize(lastname)
        this.age = Number(age)
        this.tel = Number(tel)
        this.password = password
        this.posts = []
        
        /* Generar el email de quienes se registren */
        this.createUsername()
        
        /* Es mayor de edad? */
        this.isAdult = this.checkAdultStatus()
    }
    
    /* Metodos */
    createUsername() {
        let arg1 = this.name.toLowerCase()[0]
        let arg2 = this.lastname.toLowerCase()
        this.username = `${arg1}${arg2}`
        let extension = 'hotmail'
        this.email = `${this.username}@${extension}.com`
    }
    
    checkAdultStatus() {
        return this.age >= 18
    }
    
}

class Post {
    /* Constructor de la clase */
    constructor(id, username, email, tel, content, img) {
        this.id = id
        this.username = username
        this.email = email
        this.tel = tel
        this.content = content
        this.date = new Date() /* Object Date */
        this.img = img
    }
}

class IDGenerator {
    constructor(base){
        this.lastID = base
    }
    
    getNextID () {
        this.lastID += 1
        return this.lastID
    }
}


// Utilities // 

function capitalize(str) {
    let mstring = String(str)
    if (mstring.length <= 0) {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getFormattedDate(date) {
    
    if(typeof(date) === 'string') {
        date = new Date(date)
    }
    
    /* Hora y fechas */
    const anio = date.getFullYear()
    const mes = date.getMonth() + 1 /* Los meses van de 0 a 11 */
    const dia = date.getDate()
    const horas = date.getHours()
    const minutos = date.getMinutes()
    const segundos = date.getSeconds()
    
    return `${anio.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${horas.toString().padStart(2, '0')} ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
}

function sortPosts(posts, property, dir) {
    /* ordenar los posts por fecha */
    let arrayCopia = posts.map((el) => el)
    if(dir === 'asc') {
        return arrayCopia.sort((a,b) => {
            if(a[property] > b[property]) {
                return 1
            }
            else if(a[property] < b[property]) {
                return -1
            }
            else {
                return 0
            }
        })
    }
    else if(dir === 'desc') {
        return arrayCopia.sort((a,b) => {
            if(a[property] > b[property]) {
                return -1
            }
            else if(a[property] < b[property]) {
                return 1
            }
            else {
                return 0
            }
        })
    }
    else {
        return arrayCopia
    }
}

function sumar(num1, num2) {
    if((typeof num1 !== 'number') || (typeof num2 !== 'number')) {
        console.log('Datos invalidos para la funcion sumar().')
        return 0
    }
    return num1 + num2
}

function restar(num1, num2) {
    if((typeof num1 !== 'number') || (typeof num2 !== 'number')) {
        console.log('Datos invalidos para la funcion restar().')
        return 0
    }
    return num1 - num2
}

function calcYearBirdth(age) {
    if(typeof age !== 'number') {
        age = Number(age)
    }
    thisYear = 2024
    return restar(thisYear, age)
}


 // Funciones // 

function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || []
    return users
}

function setJSONUsers(users) {
    let usersJSON = JSON.stringify(users)
    localStorage.setItem('users', usersJSON)
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || []
    return posts
}

function setJSONPosts(posts) {
    let postsJSON = JSON.stringify(posts)
    localStorage.setItem('posts', postsJSON)
}

function logIn() {
    /* Con estas se obtienen los datos de usuario y contraseña */
    let username = document.getElementById('login-username').value
    let password = document.getElementById('login-password').value
    
    
    /* Obtengo los usuarios desde el Local Storage */
    let users = loadUsers()
    
    /* Hay que verificar si existe el usuario o no */
    let userExists = users.find(u => {
        return u.username === username
        && u.password === password
    })
    
    /* Si el usuario existe, verifico los datos */
    if(userExists) {
        /* Reset  del usuario actual en el local storage */
        let currentUserJSON = JSON.stringify(userExists)
        localStorage.setItem('currentUser', currentUserJSON)
        
       
        /* Actualizo la lista de posteos */
        updatePostsList(loadPosts())
                showScreen('show-posts')
    }
    
    /* Muestro un mensaje de usuario o contraseña incorrectos, con un alert, un permitido! */
    else {
        alert(`Nombre de usuario o contraseña incorrectos.`)
    }
}

function createUser() {    
    /* Reobtener los datos desde el HTML */
    let name = document.getElementById('create-user-name').value
    let lastname = document.getElementById('create-user-lastname').value
    let age = document.getElementById('create-user-age').value
    let tel = document.getElementById('create-user-tel').value
    let password = document.getElementById('create-user-password').value
    
    
    /* objeto usuario */
    let user = new User(name, lastname, age, tel, password)
    
    //  usuarios desde el Local Storage //
    let users = loadUsers()
    
    // verificiar usuario que no exista //
    let userExists = users.find(u => u.username === user.username)
    
    /* alert, si existe */
    if(userExists){
        alert(`El usuario [${user.username}] ya existe.`)
        return false
    }


    /* Si el usuario no existe lo agrego a la lista de usuarios */
    else {
        /* Agrego el usuario a la lista */
        users.push(user)
        
        /* Actualizo el Local Storage */
        setJSONUsers(users)
        
        /* Creacion exitosa del usuario */
        alert(`Se ha creado el usuario [${user.username}] con exito.`)
        
        return true
    }
}

function createPost() {
    let postContent = document.getElementById('post-content').value
    let postImgSrc = document.getElementById('post-img').value

    
    /* Obtengo el usuario actual */
    let user = JSON.parse(localStorage.getItem("currentUser"))
        if(!user){
        alert('No se puede crear un post si no esta logeado.')
        return
    }
    
    
    /* Si el usuario es menor de edad, no puede crear posts */
    if (!user.isAdult)
    {
        yearBirdth = calcYearBirdth(user.age)
        alert(
            `El usuario [${user.username}] no esta habilitado para crear posts ya que nacio en [${yearBirdth}].`
        )
        return
    }
    
    /* Obtengo la lista actual de posteos */
    let posts = loadPosts()
    
    /* Genero un indice para el post */
    let maxID
    if(posts.length > 0) {
        let maxPost = posts.reduce(function(prev, current) {
            return (prev && prev.id > current.id) ? prev : current
        })
        maxID = maxPost.id
    }
    else {
        maxID = 0
    }
    
    
    /* Creo e objeto de tipo post */
    let post = new Post(maxID+1, user.username, user.email, user.tel, postContent, postImgSrc)
    
    
    /* Agrego el post a la lista */
    posts.push(post)
    
    /* Actualizo el Local Storage */
    setJSONPosts(posts)
    
    /* Actualizo la lista de posteos */
    updatePostsList(posts)
}

function deletePosts() {
    
    /* Obtengo el elemento HTML que necesito */
    let deleteIDs = document.getElementById('delete-ids').value
    
    /* Obtengo la lista de IDs a borrar */
    deleteIDs = deleteIDs.split(',')
    
    /* Obtengo la lista de posts actual */
    let posts = loadPosts()
    
    /* Obtengo el usuario actual */
    let user = JSON.parse(localStorage.getItem("currentUser"))
    
    /* Si NO estoy logeado, NO puedo borrar posts */
    if(!user){
        alert('No se puede borrar posts si no esta logeado.')
        return
    }
    

    let filteredPosts = posts.filter((post) => {
        if(post.username === user.username
            && deleteIDs.includes( String(post.id) )) {
            return false
        }
        else {
            return true
        }
    })
    
    /* Aviso de que se borraron posts con EXITO */
    if(posts.length != filteredPosts.length){
        alert('Se borraron los posts con exito.')
    }
    
    
    /* Actualizo el Local Storage */
    setJSONPosts(filteredPosts)
    
    /* Actualizo la lista de posteos */
    updatePostsList(filteredPosts)
    
    /* Voy a la pagina principal de posteos */
    showScreen('show-posts')
}

function deleteSinglePost(id) {
    let posts = loadPosts()
    
    /* Debug */
    console.log(`Deleted post [${id}].`)
    
    /* Filtro */
    let filteredPosts = posts.filter((post) => post.id != Number(id))
    
    /* Actualizacion del Local Storage */
    setJSONPosts(filteredPosts)
    
    /* Actualizo la lista de posteos */
    updatePostsList(filteredPosts)
    
    /* Voy a la pagina principal de posteos */
    showScreen('show-posts')
    
    return
}

function filterPosts(text) {
       text = text.toUpperCase()
    
    /* Obtengo la lista de posteos */
    let posts = loadPosts()
    
    for (let index = 0; index < posts.length; index++) {
        let post = posts[index]
        post.date = new Date(post.date)
    }
    
    /* Me fijo si tengo que filtrar por ID */
    if(text.includes('ID:')) {
        /* Filtro los posts que necesito */
        const filteredPosts = posts.filter(
            (post) => post.id === Number(text.replace('ID:',''))
        )
        
        /* Actualizacion de   la lista de posts */
        updatePostsList(filteredPosts)
    }
        else if(text.includes('USER:')) {
        /* Filtro los posts que necesito */
        const userPosts = posts.filter(
            (post) => post.username.toUpperCase().includes(text.replace('USER:','').toUpperCase())
        )
        
        /* Actualizo la lista de posts */
        updatePostsList(userPosts)
    }
    
    else if(text.includes('DATE:')) {
        
        /* fecha */
        let date = text.replace('DATE:','')
        
        /* Obtengo los datos */
        let data = date.split('-')
        
        /* Codifico el dia, mes y anio */
        const year = Number(data[0])
        const month = Number(data[1])
        const day = Number(data[2])
        
        /* Filtro los posts que necesito */
        const filteredPosts = posts.filter((post) => {
            return post.date.getFullYear() === year &&
                    (post.date.getMonth() + 1) === month &&
                    post.date.getDate() === day
        })
        
        /* Actualizo la lista de posts */
        updatePostsList(filteredPosts)
    }
        else {
        /* Filtro de posts */
        const filteredPosts = posts.filter(
            (post) => post.content.toUpperCase().includes(text.toUpperCase())
        )
        
        /* Actualizo la lista de posts */
        updatePostsList(filteredPosts)
    }
    
}


// Muy importante, cuando clikeas a crear porst, tenes que ir hasta abajo de todo, creo que esto ocurrio por el orden en el que coloque los "ultimos post del usuario", podria modificarlo pero estoy limitado de tiempo, asi que queda para la proxima! // 



function updatePostsList(posts) {
    /* Funcion para mostrar los posts en pantalla */
    
    /* usuario actual */
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
    /* ememento HTML que contiene la lista de posts */
    let postsListContainer = document.getElementsByClassName('post__list')[0]
    
    /* posts por fecha */
    let sortedPosts = sortPosts(posts, 'date', 'desc')
    
    /* Obtengo la lista de usuarios */
    let users = loadUsers()
    
    /* ccontenido HTML interno */
    postsListContainer.innerHTML = ''
    
    /* Asigno el nuevo contenido HTML */
    sortedPosts.forEach( post => {
        const user = users.filter(user => user.username === post.username)[0]
        
        postsListContainer.innerHTML += `
        <li class="post__list__item">
            <div class="post__list__item__user">
                <h3>(${post.id}) ${user.name} ${user.lastname}</h3>
                ${currentUser.username == user.username ? `<button class="post__list__item__delete" id="delete-post-${post.id}">Borrar post</button>` : '' }
            </div>
            <div class="post__list__item__content">
                <p>${post.content}</p>
                ${post.img ? `<img src="${post.img}" class="post__list__item__image alt="Post Image">` : ''}
            </div>
            <div class="post__list__item__date">
                <p>${getFormattedDate(post.date)}</p>
            </div>
        </li>
        `
    })


    sortedPosts.forEach(post => {
        let deletePostBtn = document.querySelector(`#delete-post-${post.id}`);
        if (deletePostBtn) {
            deletePostBtn.addEventListener('click', () => deleteSinglePost(post.id));
        }
    });
}

// Vista //

function showScreen(screen) {
    let navBar = document.getElementsByClassName('nav-bar')[0]
    let logInDiv = document.getElementById('login-div')
    let createUserdiv = document.getElementById('create-user-div')
    let postsDiv = document.getElementById('posts-div')
    let createPostdiv = document.getElementById('create-post-div')
    let deletePostsDiv = document.getElementById('delete-post-div')
        divs = [
        navBar,
        logInDiv,
        createUserdiv,
        postsDiv,
        createPostdiv,
        deletePostsDiv
    ]
    
    /* Ocultar elementos */
    divs.forEach(div => {
        div.classList.add('hidden')
    })
    
    if(screen === 'login') {
        logInDiv.classList.remove('hidden')
    }
    else if(screen === 'create-user') {
        createUserdiv.classList.remove('hidden')
    }
    else if(screen === 'show-posts') {
        navBar.classList.remove('hidden')
        postsDiv.classList.remove('hidden')
    }
    else if(screen === 'create-post') {
        navBar.classList.remove('hidden')
        createPostdiv.classList.remove('hidden')
    }
    else if(screen === 'delete-post') {
        navBar.classList.remove('hidden')
        deletePostsDiv.classList.remove('hidden')
    }
}


// GENERAR DATOS DE PRUEBA // 
function generateTestData() {
    /* Genero usuarios de prueba */
    test_users = [
        {name: 'Juan',    surname: 'Perez', age: 20, tel: 12345678, password: 'eladmin'},
        {name: 'Agustin', surname: 'Palavecino', age: 20, tel: 9876543, password: 'paraestovino'},
        {name: 'Chelo',     surname: 'Estigarribia', age: 20, tel: 7651212, password: 'Elnine9'},
        {name: 'Benja',    surname: 'Neyra', age: 20, tel: 34554599, password: 'Eladmin2'},
        {name: 'Lionel',     surname: 'Messi', age: 20, tel: 35439831, password: 'Messibarsa'},
        {name: 'Nacho',      surname: 'Fernandez', age: 20, tel: 32434532, password: 'Abuelacho21'},
    ]
    
    let users = []
    for (let index = 0; index < test_users.length; index++) {
        const element = test_users[index]
        
        /* Creacion d el usuario */
        let user = new User(element.name, element.surname, element.age, element.tel, element.password)
        
        if (user) {
            users.push(user)
        }
        
    }
    
    let posts = []
    for (let index = 0; index < test_posts.length; index++) {
        const element = test_posts[index]
        
        /* Crea usuario */
        let post = new Post(element.id, element.username, element.email, element.tel, element.content, element.img)
        post.date = new Date(element.date)
        
        if (post) {
            posts.push(post)
        }
        
    }
    
    // Local Storage //
    setJSONUsers(users)
    setJSONPosts(posts)
        alert('Datos Correctos!.')
    
}

// eventos // 


function addEvents() {
    let homeButton = document.getElementById('home-btn')
    homeButton.addEventListener('click', (e) => {
        e.preventDefault()
        updatePostsList(loadPosts())
        showScreen('show-posts')
    })
    
    let createUserButton = document.getElementById('create-user-btn')
    createUserButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('create-user')
    })
    
    let loginButton = document.getElementById('login-btn')
    loginButton.addEventListener('click', (e) => {
        e.preventDefault()
        logIn()
    })
    
    let loginUsernameText = document.getElementById('login-username')
    loginUsernameText.addEventListener('keypress', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault()
            logIn()
        }
    })
    
    let loginPasswordText = document.getElementById('login-password')
    loginPasswordText.addEventListener('keypress', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault()
            logIn()
        }
    })
    
    let cancelButton = document.getElementById('cancel-create-user-btn')
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('login')
    })
    
    let confirmCreateUserButton = document.getElementById('confirm-create-user-btn')
    confirmCreateUserButton.addEventListener('click', (e) => {
        e.preventDefault()
        if(createUser()){
            showScreen('login')
        }
        else {
            showScreen('create-user')
        }
    })
    
    let createUserPasswordText = document.getElementById('create-user-password')
    createUserPasswordText.addEventListener('keypress', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault()
            if(createUser()){
                showScreen('login')
            }
            else {
                showScreen('create-user')
            }
        }
    })
    
    let clearLocalStorageButton = document.getElementById('clear-local-storage-btn')
    clearLocalStorageButton.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.clear()
        alert('Datos borrados del Local Storage.')
        showScreen('login')
    })
    
    let logOutButton = document.getElementById('logout-btn')
    logOutButton.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.removeItem('currentUser')
        showScreen('login')
    })
    
    let createPostButton = document.getElementById('create-post-btn')
    createPostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('create-post')
    })
    
    let cancelCreatePostButton = document.getElementById('cancel-create-post-btn')
    cancelCreatePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('show-posts')
    })
    
    let confirmCreatePostButton = document.getElementById('confirm-create-post-btn')
    confirmCreatePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        createPost()
        showScreen('show-posts')
    })
    
    let deletePostButton = document.getElementById('delete-post-btn')
    deletePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('delete-post')
    })
    
    let cancelDeletePostButton = document.getElementById('cancel-delete-post-btn')
    cancelDeletePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showScreen('show-posts')
    })
    
    let confirmDeletePostButton = document.getElementById('confirm-delete-post-btn')
    confirmDeletePostButton.addEventListener('click', (e) => {
        e.preventDefault()
        deletePosts()
        showScreen('show-posts')
    })
    
    let searchBar = document.getElementsByClassName('nav-bar__search')[0]
    searchBar.addEventListener('input', () => {
        filterPosts(searchBar.value)
        showScreen('show-posts')
    })
    
    let createTestDataButton = document.getElementById('create-test-data-btn')
    createTestDataButton.addEventListener('click', () => {
        generateTestData()
        showScreen('login')
    })
}

// funcion prncipal // 
function main() {
    addEvents()
    showScreen('login')
}
main()
