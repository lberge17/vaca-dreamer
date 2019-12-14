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
    plan.addEventListener("click", (e) => {console.log("PLAN!")});
    create.addEventListener("click", (e) => {console.log("CREATE!")});
}