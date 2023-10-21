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

// let map, mapEvent;


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

// class App{
//   #map;
//   #mapEvent;
//   constructor() {
//     this._getPosition();
    
//     form.addEventListener('submit', this._newWorkOut(this));
//   }

//   _getPosition(){
//     if(navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
//           alert("Can't have access to location");
//         })
//       }
//     }

//   _loadMap(position){
//     console.log(position)
//     //WORKING TO GET A PRESENT POSITION
//     const {latitude} =position.coords
//     // const latitude = position.coords.latitude
//     const {longitude} = position.coords; 
    
//     // how to display a map using a third party libariry called LeafLet
//     const coords = [latitude, longitude]
    
//     this.#map = L.map('map').setView(coords, 13);
    
//     //TILELAYER
//     L.tileLayer(
//       'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
//       {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }
//     ).addTo(this.#map);
//     // const marker = L.marker(coords).addTo(map);
//     // marker.bindPopup()
    
//     // DISPLAYING A MAP MARKER
//     this.#map.on('click', this._showForm.bind(this));

//   }

//   _showForm(mapE){
//       this.#mapEvent = mapE;
//       form.classList.remove('hidden');
//       inputDistance.focus();
//   }

//   _toggleElevationField(){}

//   _newWorkOut(e){
//       e.preventDefault();

//       // Clear Input Field
//       inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';

//       // console.log(mapEvent)
//       const {lat, lng} = this.#mapEvent.latlng;
      
//       // MARKER
//       const marker = L.marker([lat, lng]).addTo(map);
//       marker.bindPopup(
//       L.popup(
//         {
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: 'running-popup'
//         }
//       )
//     )
//       .setPopupContent('Workout')
//       .openPopup();
//   }
  
// }

// const mapApp = new App();


class Workout{
  date = new Date();
  id = `${Date.now()}`.slice(-10);

  constructor(coords, distance, duration){
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout{
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace
  }
}

class Cycling extends Workout{
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / this.duration;
    return this.speed;
  }
}

//Checking if our Child Class is working fine
// const running1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

// console.log(running1, cycling1)



// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this))

    // Changing the Type 'Running or Cycling'
    inputType.addEventListener('change', this._toggleElevationField.bind(this))
  }

  _getPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
    alert('Could not get your current position')
  })
}

  }

  _loadMap(position) {
      console.log(position);
      const latitude = position.coords.latitude;
      const longtitude = position.coords.longitude;

      const coords = [latitude, longtitude];

      this.#map = L.map('map').setView(coords, 13);

      //TILELAYER
      L.tileLayer(
        'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      ).addTo(this.#map);


      // POP UP
      this.#map.on('click', this._showForm.bind(this))
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    // Displaying the form field when the map is clicked
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
      inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));

    const positiveInputs = (...inputs) => inputs.every(inp => inp > 0)

    e.preventDefault();


    //Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;



    // If workout running, create running object
    if(type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data provided is valid
      // if(
      //   !Number.isFinite(distance) || 
      //   !Number.isFinite(duration) || 
      //   !Number.isFinite(cadence)
      //   ) {
      //     return alert('Inputs have to be positive numbers')
      //   }
      if(!validInputs(distance, duration, cadence)) return alert('Input must contain numbers')
      
      if(!positiveInputs(distance, duration, cadence)) return alert('Input must not be negative')
    }

    // If workout cycling, create cycling object
    if(type === 'cycling') {
      const elGain = +inputElevation.value;

      // if(
      //   !Number.isFinite(distance) || 
      //   !Number.isFinite(duration) || 
      //   !Number.isFinite(elGain)
      //   ) {
      //     return alert('Inputs have to be positive numbers')
      //   }

      if(!validInputs(distance, duration, elGain)) return alert('Input must contain numbers')
      
      if(!positiveInputs(distance, duration)) return alert('Input must not be negative')
    }
    // Clear input field
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
    
    // Display Marker
    const lat = this.#mapEvent.latlng.lat;
    const lng = this.#mapEvent.latlng.lng;

    const cord = [lat, lng];
    
    L.marker(cord).addTo(this.#map).bindPopup(L.popup({
      maxWidth: 200,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup',
    }))
    .setPopupContent('Workout')
    .openPopup();
  }
}

const app = new App();
// GEO LOCATION API
