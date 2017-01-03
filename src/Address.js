export function getAddress(coords) {
    return new Promise( resolve => {

        return   ymaps.geocode(coords).then(function (res) {

            var firstGeoObject  = res.geoObjects.get(0),
                position        = firstGeoObject.properties.get('text');

            firstGeoObject.properties.get('text');
            if( position ) {
                resolve( position );
            }
        });
    });
}