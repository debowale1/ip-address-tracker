const submitBtn = document.querySelector('#submit-btn');
const apiKey = 'at_GGtFs0mAaJhZ4GkijjzFgCpRVfxwD';

//when the window loads, display ip address info of user
document.addEventListener('DOMContentLoaded', () => {
  fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=`)
      .then(resp => resp.json())
      .then(data => {
        updateUI(data);
      }).catch(err => console.log(err));
});

//display ip address info when user enters an ip address
submitBtn.addEventListener('click', (e) => {  
  const ipAddress = document.getElementById('ip-address-input').value;
  if(ipAddress !== ''){
    fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`)
      .then(resp => resp.json())
      .then(data => {
        updateUI(data);
        
      }).catch(err => console.log(err));
      document.getElementById('ip-address-input').value = '';
  }
  e.preventDefault();
});

function updateUI(data) {
  const {ip, location: {region, timezone, lat, lng}, isp } = data;
  document.querySelector('#ip-value').innerText = ip;
  document.querySelector('#location').innerText = region,
  document.querySelector('#utc').innerText = `UTC ${timezone}`;
  document.querySelector('#company').innerHTML = isp;
  
  displayMap(lat, lng);
}

function displayMap(lat, long) {
  var container = L.DomUtil.get('mapid');
  //check if there is an instance of the map already rendered
  if(container != null){
    container._leaflet_id = null;
  }
  var mymap = L.map('mapid').setView([lat, long], 13);
  L.marker([lat, long]).addTo(mymap);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZGVib3dhbGUwMSIsImEiOiJja2picnR1ZnEzZXZ3MnNsZ2lzOGdrZzF2In0.NvnkHQnsGNSjJBeru7u6UQ'
  }).addTo(mymap);
}





