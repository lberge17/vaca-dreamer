// this div is what we'll append all of the js generated html to...
const prntEl = document.getElementById('parent-el')

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM loaded");
    buttonEvent();
})

function refreshContent () {
    prntEl.innerHTML = "";
}

function buttonEvent() {
    console.log('adding button events');
    const plan = document.querySelector(".plan-vaca");
    const create = document.querySelector(".create-vaca");

    plan.addEventListener("click", (e) => {
        refreshContent();
        loadPlanner();
    });
    create.addEventListener("click", (e) => {
        refreshContent();
        loadForm();
    });
}

// start of the planner functions for rendering the info from the GET request to the API

function loadPlanner() {
    console.log('loading planner');
    let div = document.createElement('div');
    div.className = "planner container text-center";
    let h3 = document.createElement('h3');
    h3.innerHTML = "What type of vaca would you like to take?";
    let cats = document.createElement('div');
    cats.innerHTML = Vacation.renderCategories();

    div.appendChild(h3);
    div.appendChild(cats);
    prntEl.appendChild(div);

    categoryEvents();
}

function categoryEvents() {
    const cats = document.querySelectorAll('.cat');
    cats.forEach(cat => {
        cat.addEventListener('click', e => {
            fetchVacasFromCat(e.target.className.split(' ')[1])
        });
    });
}

function fetchVacasFromCat(category) {
    fetch(`http://localhost:3000/vacations?category=${category}`)
        .then(resp => resp.json())
        .then(obj => {
            console.log(obj);
            if(obj.length > 0) {
                renderVacas(obj);
            } else {
                prntEl.innerHTML = "Sorry, there are currently no dream vacations saved in that category...Maybe you can create one!"
            }
        })
        .catch(function(error) {
            alert("post request failed. check console for error message.");
            console.log(error.message);
        });
}

function renderVacas(vacas) {
    refreshContent();
    vacas.forEach(vaca => {
        const vacation  = new Vacation(vaca);
        const vacaHTML = vacation.render();
        prntEl.appendChild(vacaHTML);
    })
}

// start of form functions for the POST request to API

function loadForm() {
    console.log('loading form');
    let div = document.createElement('div');
    div.className = "form container text-center";
    let h3 = document.createElement('h3');
    h3.innerHTML = "Submit the form below to add a new dream vaca to our collection!";

    div.appendChild(h3);
    div.appendChild(form());
    prntEl.appendChild(div);
    listenAdd();
    listenSubmit();
}

function form () {
    return Form.render();
}

function listenAdd () {
    const actBtn = document.getElementById('activity-btn');
    const stayBtn = document.getElementById('stay-btn');

    const actFieldDiv = document.querySelector('.activity-form');
    const stayFieldDiv = document.querySelector('.stay-form');

    actBtn.addEventListener('click', e => {
        e.preventDefault();
        console.log('adding activity field');
        actFieldDiv.innerHTML += Form.activityDivFields();
    })

    stayBtn.addEventListener('click', e => {
        e.preventDefault();
        console.log('adding stay field');
        stayFieldDiv.innerHTML += Form.stayDivFields();
    })
}

function listenSubmit () {
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
        // also the objects are stored in an array because of a bug I ran into that requires this for the api to reconize the object as a hash
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