// this div is what we'll append all of the js generated html to...
const prntEl = document.getElementById('parent-el');
const errorField = document.getElementById('error-field');

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM loaded");
    buttonEvent();
})

function refreshContent () {
    prntEl.innerHTML = "";
    errorField.innerHTML = "";
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
            const category = e.target.className.split(' ')[1];
            fetchVacasFromCat(category);
        });
    });
}

function fetchVacasFromCat(category) {
    console.log(category);

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
    listenX();
}

// functions to delete a vaca via a delete request to api

function listenX() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(e => {
        e.addEventListener('click', e => {
            e.preventDefault();
            deleteVaca(e.target.id);
            removeVaca(e.target.parentElement.parentElement.parentElement.parentElement);
        })
    })
}

function deleteVaca(id) {
    fetch(`http://localhost:3000/vacations/${id}`, { method: 'DELETE' })
        .then(resp => resp.json())
        .then(obj => {
            console.log(obj);
            alert('vacation was deleted');
            return obj;
        })
        .catch(error => {
            alert("delete request failed. check console for error message.");
            console.log(error.message);
        })
}

function removeVaca(card) {
    card.innerHTML = "";
    card.className = "";
    card.style.width = "";
}

// start of form functions for the POST request to API

function loadForm() {
    console.log('loading form');
    let div = document.createElement('div');
    div.className = "form container text-center";
    let h3 = document.createElement('h3');
    h3.innerHTML = "Submit the form below to add a new dream vaca to our collection!";
    let note = document.createElement('small');
    note.innerText = "Note: the transportaion field is to let people know the most convenient way to get around the location once they've arrived (ie. public transport, train, rental car, taxi, walking, etc.).";

    div.appendChild(h3);
    div.appendChild(note);
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
        const category = document.querySelector('select[name="category"]').value;
        const transportation = document.querySelector('input[name="transportation"]').value;

        // stay attributes
        const stayNames = document.querySelectorAll(`input[name="stays_attributes['name']"]`);
        const stayAddresses = document.querySelectorAll(`input[name="stays_attributes['address']"]`);
        const stayCities = document.querySelectorAll(`input[name="stays_attributes['city']"]`);
        const stayStates = document.querySelectorAll(`input[name="stays_attributes['state']"]`);
        const stayCountries = document.querySelectorAll(`input[name="stays_attributes['country']"]`);
        const stayCosts = document.querySelectorAll(`select[name="stays_attributes['cost']"]`);
        const stayFams = document.querySelectorAll(`input[name="stays_attributes['family_friendly']"]`);

        // activity attributes
        const actTitles = document.querySelectorAll(`input[name="activities_attributes['title']"]`);
        const actDescs = document.querySelectorAll(`textarea[name="activities_attributes['description']"]`);
        const actAdds = document.querySelectorAll(`input[name="activities_attributes['address']"]`);
        const actCities = document.querySelectorAll(`input[name="activities_attributes['city']"]`);
        const actCosts = document.querySelectorAll(`select[name="activities_attributes['cost']"]`);
        const actFams = document.querySelectorAll(`input[name="activities_attributes['family_friendly']"]`);

        // snake cased because they're sent in that format to rails
        let stays_attributes = []
        for(let i = 0; i < stayNames.length; i++) {
            stays_attributes.push({name: stayNames[i].value, address: stayAddresses[i].value, city: stayCities[i].value, state: stayStates[i].value, country: stayCountries[i].value, cost: stayCosts[i].value, family_friendly: stayFams[i].checked})
        }

        let activities_attributes = []
        for(let i = 0; i < actTitles.length; i++) {
            activities_attributes.push({title: actTitles[i].value, description: actDescs[i].value, address: actAdds[i].value, city: actCities[i].value, cost: actCosts[i].value, family_friendly: actFams[i].checked})
        }

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
    div.appendChild(vaca.render());
    prntEl.appendChild(div);
}

function renderErrors(errorArray) {
    alert('Invalid data entry: Vaca could not be saved');

    let p = document.createElement('p');
    p.innerHTML = 'Sorry, the following errors prevented this vacation from being saved:';
    errorField.appendChild(p);

    let errorList = document.createElement('ul');

    errorArray.forEach(e => {
        let item = document.createElement('li');
        item.className = 'error';
        item.innerHTML = e;
        errorList.appendChild(item);
    })

    errorField.appendChild(errorList);
}