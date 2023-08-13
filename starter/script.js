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

let map, mapEvent;

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position)
    //WORKING TO GET A PRESENT POSITION
    const {latitude} =position.coords
    // const latitude = position.coords.latitude
    const {longitude} = position.coords; 
    
    // how to display a map using a third party libariry called LeafLet
    const coords = [latitude, longitude]
    
    map = L.map('map').setView(coords, 13);
    
    //TILELAYER
    L.tileLayer(
      'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(map);
    // const marker = L.marker(coords).addTo(map);
    // marker.bindPopup()
    
    // DISPLAYING A MAP MARKER
    map.on('click', function(mapE){
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    })

  },
  function(){
    alert("Can't have access to location")
  })
}

form.addEventListener('submit', function(e){
  e.preventDefault();
  
  // console.log(mapEvent)
  const {lat, lng} = mapEvent.latlng;
  
  // MARKER
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(
    L.popup(
      {
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
      }
    )
  )
    .setPopupContent('Workout')
    .openPopup();
})

