Places = new Mongo.Collection('places');

Meteor.methods({
	fetchNearbyLocations: function(coords){
		if(Meteor.isServer){
			req = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coords.latitude + "," + coords.longitude + "&radius=500&types=food&key=AIzaSyDyasCmfXtahLpo7F131VbgQZGiNDAN2I8");
			_(req.data.results).each(function(place){
				_.extend(place, {loc: {type: "Point", coordinates: [place.geometry.location.lng, place.geometry.location.lat]}});
				Places.upsert({googleId: place.id}, {$set: place});
			});
		}
	}
});