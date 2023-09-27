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

// if(navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position){
//     console.log(position)
//     //WORKING TO GET A PRESENT POSITION
//     const {latitude} =position.coords
//     // const latitude = position.coords.latitude
//     const {longitude} = position.coords; 
    
//     // how to display a map using a third party libariry called LeafLet
//     const coords = [latitude, longitude]
    
//     map = L.map('map').setView(coords, 13);
    
//     //TILELAYER
//     L.tileLayer(
//       'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
//       {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }
//     ).addTo(map);
//     // const marker = L.marker(coords).addTo(map);
//     // marker.bindPopup()
    
//     // DISPLAYING A MAP MARKER
//     map.on('click', function(mapE){
//       mapEvent = mapE;
//       form.classList.remove('hidden');
//       inputDistance.focus();
//     });

//   },
//   function(){
//     alert("Can't have access to location")
//   })
// }

// form.addEventListener('submit', function(e){
//   e.preventDefault();

//   // Clear Input Field
//   inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';

//   // console.log(mapEvent)
//   const {lat, lng} = mapEvent.latlng;
  
//   // MARKER
//   const marker = L.marker([lat, lng]).addTo(map);
//   marker.bindPopup(
//     L.popup(
//       {
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup'
//       }
//     )
//   )
//     .setPopupContent('Workout')
//     .openPopup();
// });

// const cad = document.querySelector('.cad');
// const elevate = document.querySelector('.elevate');
// inputType.addEventListener('change', function(){
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

//   // if(inputType.value === 'cycling') {
//   //   console.log('yep')
//   //   cad.classList.toggle('form__row--hidden');
//   //   elevate.classList.toggle('form__row--hidden');
//   // } else if (inputType.value === 'running') {
//   //   cad.classList.toggle('form__row--hidden');
//   //   elevate.classList.toggle('form__row--hidden');
//   // }
// })


// GEO LOCATION API
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longtitude = position.coords.longitude;

    const coords = [latitude, longtitude];

    map = L.map('map').setView(coords, 13);

    //TILELAYER
    L.tileLayer(
      'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(map);


    // POP UP
    map.on('click', function(mapE){
      mapEvent = mapE;
      // Displaying the form field when the map is clicked
      form.classList.remove('hidden');
      inputDistance.focus();

    })
  }, function(){
    alert('Could not get your current position')
  })
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Clear input field
  inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';

  // Display Marker
  const lat = mapEvent.latlng.lat;
  const lng = mapEvent.latlng.lng;

  const cord = [lat, lng];

  L.marker(cord).addTo(map).bindPopup(L.popup({
    maxWidth: 200,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
    }))
    .setPopupContent('Workout')
    .openPopup();
})

// Changing the Type 'Running or Cycling'
inputType.addEventListener('change', e => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})

