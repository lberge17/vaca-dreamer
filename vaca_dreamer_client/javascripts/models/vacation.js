class Vacation {
    constructor(object) {
        this.title = object.title;
        this.username = object.username;
        this.category = object.category;
        this.transportation = object.transportation;
    }

    static renderCategories() {
        const colOne = `<button class="cat beach">Beach</button><br><button class="cat fam">Family Fun</button><br><button class="cat romantic">Romantic</button>`
        const colTwo =  `<button class="cat group">Large Group</button><br><button class="cat nature">Nature</button><br><button class="cat historic">Historic</button>`

        let div = `<div class="container"><div class="row"><div class="col-sm">${colOne}</div><div class="col-sm">${colTwo}</div></div></div>`;

        return div;
    }

    render () {
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.width = '18rem';
        let body = document.createElement('div');
        body.className = 'card-body';

        body.innerHTML = `<h5>${this.title}</h5>`;
        body.innerHTML += `<p class="card-text">by: ${this.username}</p>`;
        body.innerHTML += `<p class="card-text">Category: ${this.category}</p>`;
        body.innerHTML += `<p class="card-text">Transportation once there: ${this.transportation}</p>`;

        cardDiv.appendChild(body);

        return cardDiv;
    }
}