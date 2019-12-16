class Vacation {
    constructor(object) {
        this.title = object.title;
        this.username = object.username;
        this.category = object.category;
        this.transportation = object.transportation;
    }

    render () {
        return `<p>Title: ${this.title}</p>`
    }
}