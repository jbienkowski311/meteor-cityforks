Template.home.onRendered(function(){
	Tracker.autorun(function(){
		if(Session.get('location')){
			var latitude, longitude;
			latitude = Session.get('location').latitude;
			longitude = Session.get('location').longitude;
			var map = L.map('map').setView([latitude, longitude], 16);
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	         	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	        }).addTo(map);
	        L.marker([latitude, longitude]).addTo(map).bindPopup('<h3>Your location</h3>').openPopup();
	        var bounds = map.getBounds();
	        if(bounds){
	        	Session.set('bottomLeft', [bounds._southWest.lng, bounds._southWest.lat]);
	        	Session.set('topRight', [bounds._northEast.lng, bounds._northEast.lat]);
	        }
	     	if(Template.instance()){
	     		Template.instance().data.forEach(function(place){
	     			L.marker([place.geometry.location.lat, place.geometry.location.lng]).addTo(map)
	     				.bindPopup("<strong>" + place.name + "</strong><br />" + place.vicinity);
	     		});
	     	}
	     	map.on('moveend', function(event){
	     		var bounds = event.target.getBounds();
	     		Session.set('bottomLeft', [bounds._southWest.lng, bounds._southWest.lat]);
	        	Session.set('topRight', [bounds._northEast.lng, bounds._northEast.lat]);
	        	coords = {latitude: event.target.getCenter().lat, longitude: event.target.getCenter().lng};
	        	Session.set('location', coords);
	        	Meteor.call('fetchNearbyLocations', coords);
	     	});
		}
	});
});