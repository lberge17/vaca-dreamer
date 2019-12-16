class Vacation {
    constructor(object) {
        this.id = object.id
        this.title = object.title;
        this.username = object.username;
        this.category = object.category;
        this.transportation = object.transportation;
        this.activities = object.activities_attributes;
        this.stays = object.stays_attributes;
    }

    static renderCategories() {
        const colOne = `<button class="cat beach">Beach</button><br><button class="cat fam">Family Fun</button><br><button class="cat romantic">Romantic</button>`
        const colTwo =  `<button class="cat group">Large Group</button><br><button class="cat nature">Nature</button><br><button class="cat historic">Historic</button>`

        let div = `<div class="container"><div class="row"><div class="col-sm">${colOne}</div><div class="col-sm">${colTwo}</div></div></div>`;

        return div;
    }

    render () {
        let cardDiv = document.createElement('div');
        cardDiv.className = `card`;
        cardDiv.style.width = '100%';
        let body = document.createElement('div');
        body.className = 'card-body';
        let vaca = document.createElement('div');
        vaca.className = "text-center mb-3";
        let details = document.createElement('div');
        details.className = 'row';
        let stays = document.createElement('div');
        stays.className = 'col-sm';
        let activities = document.createElement('div');
        activities.className = 'col-sm';


        vaca.innerHTML = `<h5>${this.title}</h5>`;
        vaca.innerHTML += `<p class="card-text">by: ${this.username}</p>`;
        vaca.innerHTML += `<p class="card-text">Category: ${this.category}</p>`;
        vaca.innerHTML += `<p class="card-text">Transportation once there: ${this.transportation}</p>`;

        this.stays.forEach(stay => {
            const newStay = new Stay(stay);
            stays.innerHTML += newStay.render();
        })
        
        this.activities.forEach(act => {
            const newActivity = new Activity(act);
            activities.innerHTML += newActivity.render();
        })

        details.append(stays, activities);
        body.append(vaca, details);
        cardDiv.appendChild(body);

        return cardDiv;
    }
}