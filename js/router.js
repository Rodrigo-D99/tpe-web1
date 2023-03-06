function select_tab(id) {
    // remove selected class from all buttons
    document.querySelectorAll(".route").forEach(item => item.classList.remove('selected'));
    // select clicked element (visually)
    document.querySelectorAll("#" + id).forEach(item => item.classList.add('selected'));
}
function loadClickAbout(event) {
    event.preventDefault();
    let container = document.querySelector("#content");
    fetch("about.html")
        .then(response => {
            console.log(response);
            console.log(response.status);
            if (response.ok) {
                console.log("OK");
                response.text().then(text => container.innerHTML = text);
            } else
                container.innerHTML = "<h1>Error - Failed URL!</h1>";
        })
        .catch(error => {
            console.log(error);
            container.innerHTML = "<h1>Error - Conection Failed!</h1>";
        });
}  

function loadClickSection(event) {
    event.preventDefault();
    let container = document.querySelector("#content");
    fetch("section.html")
        .then(response => {
            console.log(response);
            console.log(response.status);
            if (response.ok) {
                console.log("OK");
                response.text().then(text => container.innerHTML = text);
            } else
                container.innerHTML = "<h1>Error - Failed URL!</h1>";
        })
        .catch(error => {
            console.log(error);
            container.innerHTML = "<h1>Error - Conection Failed!</h1>";
        });
}  

function load_content(id) {
    let about = document.querySelectorAll("#about");
    about.forEach(e=> e.addEventListener("click", loadClickAbout));
    
    
    let section = document.querySelectorAll("#section");
    section.forEach(e=> e.addEventListener("click", loadClickSection));
        
        console.log("Loading content for {" + id + "}");
    // Update text "Content loading for {id}..."
    // Of course, here you would do you content loading magic
    // Perhaps run Fetch API to update resources
}

function push(event) {
    // Get id attribute of the box or button or link clicked
    let id = event.target.id;
    // Visually select the clicked button/tab/box
    select_tab(id);
    // Update Title in Window's Tab
    document.title = id;
    // Load content for this tab/page
    load_content(id);
    // Finally push state change to the address bar
    window.history.pushState({id}, `${id}`, `/${id}.html`);
}
window.onload = event => {
    // Add history push() event when boxes are clicked
    
    window["index"].addEventListener("click", event => push(event))
    window["about"].addEventListener("click", event => push(event))
    window["section"].addEventListener("click", event => push(event))
}
// Listen for PopStateEvent (Back or Forward buttons are clicked)
window.addEventListener("popstate", event => {
    // Grab the history state id
    let stateId = event.state.id;
    // Show clicked id in console (just for fun)
    console.log("stateId = ", stateId);
    // Visually select the clicked button/tab/box
    select_tab(stateId);
    // Load content for this tab/page
    load_content(stateId);
});


