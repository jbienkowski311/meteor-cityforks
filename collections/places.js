Places = new Mongo.Collection('places');

Meteor.methods({
	fetchNearbyLocations: function(coords){
		if(Meteor.isServer){
			req = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coords.latitude + "," + coords.longitude + "&radius=500&types=food&key=AIzaSyAd0jS5Bwxp3k7A6GjkYPn_pOTDayLSM_w");
			_(req.data.results).each(function(place){
				_.extend(place, {loc: {type: "Point", coordinates: [place.geometry.location.lng, place.geometry.location.lat]}});
				console.log(place);
				Places.upsert({googleId: place.id}, {$set: place});
			});
		}
	}
});