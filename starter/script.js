'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// CDNs - Content Delivery Network

// USING THE GEOLOCATION API

if(navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(function(position){

 //WORKING TO GET A PRESENT POSITION
 const {latitude} =position.coords
 // const latitude = position.coords.latitude
 const {longitude} = position.coords; 

 // how to display a map using a third party libariry called LeafLet

 const coords = [latitude, longitude]

 const map = L.map('map').setView(coords, 13);

 //TILELAYER
 L.tileLayer(
  'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
  {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  

  // DISPLAYING A MAP MARKER
  map.on('click', function(mapEvent){
   console.log(mapEvent)

   const {lat, lng} = mapEvent.latlng;

   // MARKER
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup('Workout').openPopup();
  })
}, 
function(){
 alert("Can't have access to location")
})
}

