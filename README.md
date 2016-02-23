# meteor-cityforks
Meteor mobile app with use of Cordova, Minimongo and Ratchet

## Based on Josh Owens' tutorial:
Youtube: https://www.youtube.com/watch?v=7iqdkVwtuvg&list=WL&index=146
GitHub repo: https://github.com/thespacedojo/cityforks (latest version: https://github.com/thespacedojo/cityforks-4)

## Fixes and tweaks:
1. Session cannot hold location object, we need to grab data we need and create new object and then we can store it in Session.
So your code should look more like `Session.set("location", {latitude: position.coords.latitude, longitude: position.coords.longitude});`
instead of: `Session.set("location", position);` and you should be fine :)

2. In Meteor 1.2.1 we cannot directly pass Google Maps API data to the database.
If we do so, the passed object will be empty. To solve this problem one has to add meteor package called EJSON (`meteor add ejson`).
