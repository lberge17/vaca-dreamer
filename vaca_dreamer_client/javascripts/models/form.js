class Form {
    vacationDiv() {
        // part of form that contains vacation attributes
        let vacaDiv = document.createElement('div');
        vacaDiv.className = 'vacation-form';
        let heading = `<h4>Create new Dream Vaca:</h4>`;
        let title = `<label>Title:</label><input type='text' name='title'></input><br>`;
        let username = `<label>Username:</label><input type='text' name='username'></input><br>`;
        let category = `<label>Category:</label><input type='text' name='category'></input><br>`;
        let transportation = `<label>Method of Transportation:</label><input type='text' name='transportation'></input><br><br>`;
        vacaDiv.innerHTML = heading + title + username + category + transportation;

        return vacaDiv;
    }

    stayDiv() {
        // part of form that contains stay attributes
        let stayDiv = document.createElement('div');
        stayDiv.className = 'stay-form';
        let heading = `<h4>Add a stay (hotel, campsite, etc.):</h4>`
        let name = `<label>Name:</label><input type='text' name="stays_attributes['name']"></input><br>`;
        let address = `<label>Address:</label><input type='text' name="stays_attributes['address']"></input><br>`;
        let city = `<label>City:</label><input type='text' name="stays_attributes['city']"></input><br>`;
        let state = `<label>State:</label><input type='text' name="stays_attributes['state']"></input><br>`;
        let cost = `<label>Cost ($, $$, $$$, $$$$, $$$$$, or N/A):</label><input type='text' name="stays_attributes['cost']"></input><br>`;
        let familyFriendly = `<label>Family Friendly?</label><input type='checkbox' name="stays_attributes['family_friendly']"></input><br><br>`;
        stayDiv.innerHTML = heading + name + address + city + state + cost + familyFriendly;

        return stayDiv;
    }

    activityDiv() {
        // part of form that contains activity attributes
        let actDiv = document.createElement('div');
        actDiv.className = 'activity-form';
        let heading = `<h4>Add an activity:</h4>`
        let title = `<label>Title:</label><input type='text' name="activities_attributes['title']"></input><br>`;
        let description = `<label>Description:</label><textarea name="activities_attributes['description']"></textarea><br>`;
        let address = `<label>Address:</label><input type='text' name="activities_attributes['address']"></input><br>`;
        let city = `<label>City:</label><input type='text' name="activities_attributes['city']"></input><br>`;
        let cost = `<label>Cost ($, $$, $$$, $$$$, $$$$$, or N/A):</label><input type='text' name="activities_attributes['cost']"></input><br>`;
        let familyFriendly = `<label>Family Friendly?</label><input type='checkbox' name="activities_attributes['family_friendly']"></input><br><br>`;
        actDiv.innerHTML = heading + title + description + address + city + cost + familyFriendly;

        return actDiv;
    }

    render() {
        let form = document.createElement('form');
        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.className = 'submit-form';

        form.append(this.vacationDiv(), this.stayDiv(), this.activityDiv(), submit);

        return form
    }
}