class Form {
    static vacationDiv() {
        // part of form that contains vacation attributes
        let vacaDiv = document.createElement('div');
        vacaDiv.className = 'vacation-form';
        let heading = `<h4>Create new Dream Vaca:</h4>`;
        let title = `<label>Title:</label><input type='text' name='title'></input><br>`;
        let username = `<label>Username:</label><input type='text' name='username'></input><br>`;
        let category = `<label>Category:</label><select name="category"><option value="beach">beach</option><option value="family fun">family fun</option><option value="romantic">romantic</option><option value="nature">nature</option><option value="large group">large group</option><option value="historic">historic</option></select><br>`;
        let transportation = `<label>Method of Transportation:</label><input type='text' name='transportation'></input><br><br>`;
        vacaDiv.innerHTML = heading + title + username + category + transportation;

        return vacaDiv;
    }

    static stayDivFields() {
        // part of form that contains stay attributes
        let heading = `<h4>Add a stay (hotel, campsite, etc.):</h4>`
        let name = `<label>Name:</label><input type='text' name="stays_attributes['name']"></input><br>`;
        let address = `<label>Address:</label><input type='text' name="stays_attributes['address']"></input><br>`;
        let city = `<label>City:</label><input type='text' name="stays_attributes['city']"></input><br>`;
        let state = `<label>State:</label><input type='text' name="stays_attributes['state']"></input><br>`;
        let country = `<label>Country:</label><input type='text' name="stays_attributes['country']"></input><br>`;
        let cost = `<label>Cost ($, $$, $$$, $$$$, $$$$$, or N/A):</label><input type='text' name="stays_attributes['cost']"></input><br>`;
        let familyFriendly = `<label>Family Friendly?</label><input type='checkbox' name="stays_attributes['family_friendly']"></input><br><br>`;
        return heading + name + address + city + state + country + cost + familyFriendly;
    }

    static activityDivFields() {
        // part of form that contains activity attributes
        let heading = `<h4>Add an activity:</h4>`
        let title = `<label>Title:</label><input type='text' name="activities_attributes['title']"></input><br>`;
        let description = `<label>Description:</label><textarea name="activities_attributes['description']"></textarea><br>`;
        let address = `<label>Address:</label><input type='text' name="activities_attributes['address']"></input><br>`;
        let city = `<label>City:</label><input type='text' name="activities_attributes['city']"></input><br>`;
        let cost = `<label>Cost ($, $$, $$$, $$$$, $$$$$, or N/A):</label><input type='text' name="activities_attributes['cost']"></input><br>`;
        let familyFriendly = `<label>Family Friendly?</label><input type='checkbox' name="activities_attributes['family_friendly']"></input><br><br>`;
        return heading + title + description + address + city + cost + familyFriendly;
    }

    static render() {
        const br = document.createElement('br');
        let form = document.createElement('form');
        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.className = 'submit-form';

        let stayDiv = document.createElement('div');
        stayDiv.className = 'stay-form';
        stayDiv.innerHTML += this.stayDivFields();
        let stayButton = document.createElement('button');
        stayButton.innerText = 'add another stay';
        stayButton.id = "stay-btn";

        let activityDiv = document.createElement('div');
        activityDiv.className = 'activity-form';
        activityDiv.innerHTML += this.activityDivFields();
        let activityButton = document.createElement('button');
        activityButton.innerText = 'add another activity';
        activityButton.id = 'activity-btn';


        form.append(this.vacationDiv(), stayDiv, stayButton, activityDiv, activityButton, br, submit);

        return form
    }
}