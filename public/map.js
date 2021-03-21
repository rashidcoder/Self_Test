 //get location 
var map = L.map('map').fitWorld();
const tile = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar', 
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
 
// Socket Io
 const socket = io.connect();
 
// icon color 
var color =  function(){
var user = document.getElementById("holder").innerHTML;
    if (user == 'LOW.' || user == '.ضعيف' || user =='BAJO.' || user =='LE MINIMUM.' ) {
        return '#0DEAD0' 
    }else if (user == 'MEDIUM.' || user =='.متوسط' || user =='MEDIO.' || user =='MODÉRÉ.' ) {
        return '#FFCC00' 
    }else {
        return '#F30B0B'
    }
}

function setMap(){
    if(document.getElementById("holder").offsetParent != null){
        console.log("working now");
        document.getElementById("holder").style.color = color();
        var svg = 
            '<svg height="10" width="10"><circle cx="5" cy="5" r="4" fill="' +
            color() + 
            '" /></svg>';
        var sColor = color();
            console.log(svg);
        var icon = L.divIcon({ 
            html: svg, 
            iconSize: [10, 10], 
            iconAnchor: [10, 10] 
        });

//locate//
        map.locate({
            setView: true, 
            watch: true, 
            enableHighAccuracy: true, 
            maxZoom: 8
        });
        map.on('locationfound', e => {
            const coords = [e.latlng.lat, e.latlng.lng];
            localStorage.setItem("user_location", JSON.stringify(coords));

            const newMarker = L.marker(coords, {icon:icon});
           //newMarker.bindPopup('Wear your Mask!');
            map.addLayer(newMarker);
            socket.emit('userCoordinates', [e.latlng.lat, e.latlng.lng, sColor ]);
        });

//socket new User connected
        socket.on('newUserCoordinates', (coords) => {
            console.log(coords);
            var svg2 = '<svg height="20" width="20"><circle cx="5" cy="5" r="4" fill="' + coords[2] + '" /></svg>';
            const userIcon = L.divIcon({ html: svg2, iconSize: [20, 20], iconAnchor: [10, 10] });

            const newUserMarker = L.marker([coords[0], coords[1]], { 
                icon: userIcon
            });
            //newUserMarker.bindPopup('New User!');
            map.addLayer(newUserMarker);
        }); 

        socket.on('userCoordinates', (coords) => {
            console.log(coords);
            socket.broadcast.emit('newUserCoordinates', coords);
        });
        map.addLayer(tile);
     }
    else{
        setTimeout(setMap, 100);
    }
}
 
setMap();