class Vacation {
    constructor(object) {
        this.title = object.title;
        this.username = object.username;
        this.category = object.category;
        this.transportation = object.transportation;
    }

    static renderCategories() {
        const cats = ['beach', 'family fun', 'romantic', 'group', 'nature', 'historic'];

        const colOne = `<button class="cat beach">Beach</button><br><button class="cat fam">Family Fun</button><br><button class="cat romantic">Romantic</button>`
        const colTwo =  `<button class="cat group">Large Group</button><br><button class="cat nature">Nature</button><br><button class="cat historic">Historic</button>`

        let div = `<div class="container"><div class="row"><div class="col-sm">${colOne}</div><div class="col-sm">${colTwo}</div></div></div>`;

        return div;
    }

    render () {
        return `<p>Title: ${this.title}</p>`
    }
}