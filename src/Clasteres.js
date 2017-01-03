let clast  = {

    placemarks  : [],
    cashCluster : undefined,
    add         : function (plac,myMap) {

        if(plac !== null) {
            this.placemarks.push(plac);
        }
        this.render(myMap);
    },
    render : myMap =>  {
        if (clast.cashCluster !== undefined) {

            clast.cashCluster.add(clast.placemarks);
            myMap.geoObjects.add( clast.cashCluster);
        } else {
            clast.cashCluster = new ymaps.Clusterer({
                clusterDisableClickZoom   : true,
                clusterOpenBalloonOnClick : true,
                preset : 'islands#invertedVioletClusterIcons',
                clusterBalloonContentLayout : 'cluster#balloonCarousel',
                clusterBalloonPanelMaxMapArea : 0,
                clusterBalloonContentLayoutWidth : 200,
                clusterBalloonContentLayoutHeight : 150
            });
            clast.cashCluster.add(clast.placemarks);
            myMap.geoObjects.add(clast.cashCluster);
        }
    }
};
export {
    clast
}