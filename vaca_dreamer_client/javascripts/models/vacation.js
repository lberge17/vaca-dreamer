class Vacation {
    constructor(title, username, transportation, category) {
        this.title = title;
        this.username = username;
        this.transportation = transportation;
        this.category = category;
    }

    render () {
        return `<p>Title: ${this.title}</p>`
    }
}