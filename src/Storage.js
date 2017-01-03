export  { get, set };

function get(id) {
    return  localStorage.getItem(id);
}

function set( id, value ) {
    try {
        let psevdo = localStorage.getItem(id);
        if ( psevdo !== null) {
            let temp = JSON.parse(localStorage.getItem(id));
            temp.recalls.push(value.recalls[0]);
            return localStorage.setItem (id, JSON.stringify(temp) );
        } else {
            return localStorage.setItem( id, JSON.stringify(value ) );
        }

    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert( 'Локальное хранилище переполнено' );
        }
    }
}