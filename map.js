var lat = 42.299944;
var  lon = -83.698806;
var  map;
var pin;

function GetMap()
{
        map = new Microsoft.Maps.Map('#myMap',{
        center: new Microsoft.Maps.Location(lat, lon),
        zoom: 17,
        mapTypeId: Microsoft.Maps.MapTypeId.road
    }); 
    //Add your post map load code here.

    var center = map.getCenter();

    //Create custom Pushpin
    pin = new Microsoft.Maps.Pushpin(center, {
        title: 'NXP',
        subTitle: 'NXP Vehicle',
        text: '1'
    });

    //Add the pushpin to the map
    map.entities.push(pin);
}

setInterval(function(){
    lat = lat + 0.00005;
    lon = lon + 0.00005;

    map.entities.pop(pin);
    //Create custom Pushpin
    //map.setView({center: new Microsoft.Maps.Location(lat, lon)});
    var center = new Microsoft.Maps.Location(lat, lon);//map.getCenter();
    var pin = new Microsoft.Maps.Pushpin(center, {
        title: 'NXP',
        subTitle: 'NXP Vehicle',
        text: '1'
    });

    map.entities.push(pin);
    
},10000);