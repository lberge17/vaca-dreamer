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
    return new Form().render()
}

function listenForm () {
    let submit = document.querySelector('.submit-form')

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);

        // vacation attributes
        const title = document.querySelector('input[name="title"]').value;
        const username = document.querySelector('input[name="username"]').value;
        const category = document.querySelector('input[name="category"]').value;
        const transportation = document.querySelector('input[name="transportation"]').value;

        // stay attributes
        const stayName = document.querySelector(`input[name="stays_attributes['name']"]`).value;
        const stayAddress = document.querySelector(`input[name="stays_attributes['address']"]`).value;
        const stayCity = document.querySelector(`input[name="stays_attributes['city']"]`).value;
        const stayState = document.querySelector(`input[name="stays_attributes['state']"]`).value;
        const stayCost = document.querySelector(`input[name="stays_attributes['cost']"]`).value;
        const stayFam = !!document.querySelector(`input[name="stays_attributes['family_friendly']"]`).value;

        // activity attributes
        const actTitle = document.querySelector(`input[name="activities_attributes['title']"]`).value;
        const actDesc = document.querySelector(`textarea[name="activities_attributes['description']"]`).value;
        const actAdd = document.querySelector(`input[name="activities_attributes['address']"]`).value;
        const actCity = document.querySelector(`input[name="activities_attributes['city']"]`).value;
        const actCost = document.querySelector(`input[name="activities_attributes['cost']"]`).value;
        const actFam = !!document.querySelector(`input[name="activities_attributes['family_friendly']"]`).value;

        // snake cased because they're sent in that format to rails
        const stays_attributes = [{name: stayName, address: stayAddress, city: stayCity, state: stayState, cost: stayCost, family_friendly: stayFam}]
        const activities_attributes = [{title: actTitle, description: actDesc, address: actAdd, city: actCity, cost: actCost, family_friendly: actFam}]

        const formData = {title: title, username: username, category: category, transportation: transportation, stays_attributes, activities_attributes};

        renderVaca(formData);
        submitForm(formData);
    })
}

function submitForm(data) {
    const configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:3000/vacations', configObject)
        .then(resp => resp.json())
        .then(object => {
            if (object.errors) {
                renderErrors(object.errors);
            } else {
                console.log(object);
            }
        })
        .catch(function(error) {
            alert("post request failed. check console for error message.");
            console.log(error.message);
        });
}

function renderVaca(object) {
    console.log(object);
    const vaca = new Vacation(object);
    refreshContent();
    addButtons();
    const div = document.createElement('div');
    div.className = 'new-vacation';
    div.innerHTML = vaca.render();
    prntEl.appendChild(div);
}

function renderErrors(errorArray) {
    let div = document.createElement('div');
    div.className = 'error-div';
    let p = document.createElement('p');
    p.innerHTML = 'Sorry, the following errors prevented this vacation from being saved:'
    div.appendChild(p);

    errorArray.forEach(e => {
        let p = document.createElement('p');
        p.className = 'error';
        p.innerHTML = e;
        div.appendChild(p);
    })

    prntEl.appendChild(div);
}