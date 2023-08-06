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
 console.log(position);

 //WORKING TO GET A PRESENT POSITION
 const {latitude} =position.coords
 // const latitude = position.coords.latitude
 const {longitude} = position.coords; 
 console.log(latitude, longitude)
 // console.log(`https://www.google.com/maps/@${9.060352},${7.4678272},13z?entry=ttu`)

 // how to display a map using a third party libariry called LeafLet

 const coords = [latitude, longitude]

 const map = L.map('map').setView(coords, 13);

 //TILELAYER
 L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // MARKER
  const marker = L.marker(coords).addTo(map);
  marker.bindPopup('A Pretty').openPopup()
}, function(){
 alert("Can't have access to location")
})
}

