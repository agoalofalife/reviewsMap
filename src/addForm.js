import {addList,getList}    from  './addList.js';
import {set as setStorage}  from './Storage.js'

export {
    addForm
}

function addForm(address,addressName) {
    let nameInput    = document.querySelector('.insertName'),
        namePosition = document.querySelector('.insertPos'),
        description  = document.querySelector('.insertDescription');

    if (document.querySelector('.nothingRecalls')) {

        document.querySelector('.nothingRecalls').remove();
    }

    let templateTime = {  year: 'numeric', month: 'numeric', day: 'numeric',hour: 'numeric','minute':'numeric','second' : 'numeric'},
        time         = new Date(),
        timeValue    = time.toLocaleDateString('ru-Ru',templateTime).replace(',','');

    let PlacemarkOptions = {
        balloonContentHeader : namePosition.value,
        balloonContentBody   : `<p><a href=# data-id="${address}" class="stringInClaster" >${addressName}</a></p><p>${description.value}</p>`,
        balloonContentFooter : timeValue
    };

    addList(document.querySelector('.list'),{
        name        : nameInput.value,
        position    : namePosition.value,
        description : description.value,
        time        : timeValue
    });

    setStorage(address,{
        recalls : [
            {
                'name'        : nameInput.value || '',
                'position'    : namePosition.value || '',
                'description' :  description.value || '',
                'time'        : timeValue
            }
        ]});
    nameInput.value   = '', namePosition.value = '';
    description.value = '';

    return new ymaps.Placemark( address, PlacemarkOptions, {
            openEmptyHint      : false,
            openHintOnHover    : false,
            openBalloonOnClick : false
        }
    );
}