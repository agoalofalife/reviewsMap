import {getAddress} from  './Address.js';
import {addList,getList}    from  './addList.js';
import {get as getStorage,set as setStorage} from './Storage.js';
import {addForm} from './addForm.js';
import {clast} from './Clasteres.js';


let instanse = {};

new Promise( resolve =>  {
    window.onload = resolve;
}).then( () =>  {
    let map          = document.querySelector('#map');
    map.style.width  = screen.width + 'px';
    map.style.height = screen.height  + 'px';

    ymaps.ready(init);

    function init() {

        var myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        });

        document.body.addEventListener('click', e => {

            if ( e.target.classList == 'stringInClaster' ) {
                let position = e.target.dataset.id;
                let recalls  = JSON.parse(getStorage(position));

                myMap.balloon.close();
                getAddress(position).then(address => {
                    myMap.balloon.open(position.split(','),
                        {
                            contentBody: Handlebars.compile(document.querySelector('#form').innerHTML)(
                                {
                                    list : recalls.recalls,
                                    'NamePosition' : address,
                                    'clasterGroup' : position.split(',')
                                })
                        });
                })
            }
        });

        document.body.addEventListener('click', e => {
            if ( e.target.id === 'add') {
                if ( document.querySelector('.list').dataset.claster !== '')
                {
                    instanse.address = document.querySelector('.list').dataset.claster.split(',');
                }
                let myPlacemark = addForm(instanse.address, instanse.addressName);

                clast.add(myPlacemark, myMap);

                myPlacemark.events.add('click', e => {
                    let position = e.get('target').geometry.getCoordinates();
                    let recalls  = JSON.parse(getStorage(position));

                    getAddress(position).then( address => {
                        myMap.balloon.open(position,
                            {
                                contentBody: Handlebars.compile(document.querySelector('#form').innerHTML)(
                                    {
                                        list: recalls.recalls,
                                        'NamePosition': address,
                                        'clasterGroup' : position
                                    })
                            });
                    });
                });
            }
        });

        myMap.events.add('wheel', () => {
            clast.add(null, myMap);
        });

        myMap.events.add('click', e => {
            e.preventDefault();
            var coords = e.get('coords');

            getAddress(coords).then(address => {
                instanse.address     = coords;
                instanse.addressName = address;

                function openBalloon(coords,address) {
                    return  myMap.balloon.open(coords,
                        {
                            contentBody: Handlebars.compile(document.querySelector('#form').innerHTML)({
                                'NamePosition': address,
                                'clasterGroup' : coords
                            })
                        })
                }
                openBalloon(coords,address);
            });
        });

    }
}).catch( e => {
    console.error(e);
    alert('Ошибка: ' + e.message);
});
