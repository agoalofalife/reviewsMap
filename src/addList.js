export {addList}

function addList( element, obj ) {
    let temp        = document.createElement('div'),
        name        = document.createElement('span'),
        position    = document.createElement('span'),
        time        = document.createElement('span'),
        description = document.createElement('div');

    name.className        = 'name';
    position.className    = 'position';
    time.className        = 'time';
    description.className = 'description';

    element.appendChild(temp);
    name.innerText            =  obj.name;
    position.innerText        =  obj.position;
    time.innerText            =  obj.time;
    description.innerText     =  obj.description;
    temp.appendChild(name);
    temp.appendChild(position);
    temp.appendChild(time);
    temp.appendChild(description);
}