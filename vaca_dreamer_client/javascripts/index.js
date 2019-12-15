// this div is what we'll append all of the js generated html to...
const prntEl = document.getElementById('parent-el')

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM loaded");
    addButtons();
})

function refreshContent () {
    prntEl.innerHTML = "";
}

function addButtons () {
    console.log('adding buttons');
    let div = document.createElement('div');
    div.className = 'buttons center';
    let plan = document.createElement('button');
    plan.className = "plan";
    plan.innerHTML = "Get Vaca Inspiration";
    let create = document.createElement('button');
    create.className = "create-vaca";
    create.innerHTML = "Create New Vaca";

    div.appendChild(plan);
    div.appendChild(create);
    prntEl.appendChild(div);

    buttonEvent(plan, create);
}

function buttonEvent(plan, create) {
    console.log('adding button events');
    plan.addEventListener("click", (e) => {
        refreshContent();
        addButtons();
        loadPlanner();
    });
    create.addEventListener("click", (e) => {
        refreshContent();
        addButtons();
        loadForm();
    });
}

function loadPlanner() {
    console.log('loading planner');
    let div = document.createElement('div');
    div.className = "planner container center";
    let h3 = document.createElement('h3');
    h3.innerHTML = "What type of vaca would you like to take?";

    div.appendChild(h3);
    prntEl.appendChild(div);
}

function loadForm() {
    console.log('loading form');
    let div = document.createElement('div');
    div.className = "form container center";
    let h3 = document.createElement('h3');
    h3.innerHTML = "Submit the form below to add a new dream vaca to our collection!";

    div.appendChild(h3);
    div.appendChild(form());
    prntEl.appendChild(div);
    listenForm();
}

function form () {
    let form = document.createElement('form');
    form.innerHTML = "<label>Title:</label><input type='text' name='title'></input><br><label>Username:</label><input type='text' name='username'></input><br><input type='submit' class='submit-form'></input>";
    return form;
}

function listenForm () {
    let submit = document.querySelector('.submit-form')

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);

        const title = document.querySelector('input[name="title"]').value;
        const username = document.querySelector('input[name="username"]').value;

        let p = document.createElement('p');
        p.innerHTML = `${title} by ${username}`;
        prntEl.appendChild(p);
    })
}