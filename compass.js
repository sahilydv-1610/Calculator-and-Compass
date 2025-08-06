let compassActive = false;
const needle = document.getElementById('needle');
const headingValue = document.getElementById('heading-value');
const directionValue = document.getElementById('direction-value');
const latitudeValue = document.getElementById('latitude-value');
const longitudeValue = document.getElementById('longitude-value');
const accuracyValue = document.getElementById('accuracy-value');
const getLocationBtn = document.getElementById('get-location');
const compassNeedle = document.getElementById('compass-needle');

function updateCompass(heading) {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const index = Math.round(heading / 45) % 8;
    const direction = directions[index];
    
    needle.style.transform = `rotate(${360 - heading}deg)`;
    headingValue.textContent = `${Math.round(heading)}°`;
    directionValue.textContent = direction;
}

function updateLocation(position) {
    const { latitude, longitude, accuracy } = position.coords;
    latitudeValue.textContent = latitude.toFixed(4);
    longitudeValue.textContent = longitude.toFixed(4);
    accuracyValue.textContent = `${Math.round(accuracy)} meters`;
}

function handleCompassError(error) {
    console.error('Compass error:', error);
    compassNeedle.classList.remove('compass-active');
    getLocationBtn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Error';
    setTimeout(() => {
        getLocationBtn.innerHTML = '<i class="fas fa-location-arrow mr-2"></i> Get Location';
    }, 3000);
}

function startCompass() {
    if (!compassActive) {
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation);
            compassActive = true;
            compassNeedle.classList.add('compass-active');
            getLocationBtn.innerHTML = '<i class="fas fa-compass mr-2"></i> Active';
            
            // Get geolocation
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(
                    updateLocation,
                    handleCompassError,
                    { enableHighAccuracy: true, maximumAge: 10000 }
                );
            } else {
                handleCompassError(new Error('Geolocation not supported'));
            }
        } else {
            handleCompassError(new Error('Device orientation not supported'));
        }
    } else {
        window.removeEventListener('deviceorientation', handleOrientation);
        compassActive = false;
        compassNeedle.classList.remove('compass-active');
        getLocationBtn.innerHTML = '<i class="fas fa-location-arrow mr-2"></i> Get Location';
    }
}

function handleOrientation(event) {
    if (event.absolute && event.alpha !== null) {
        updateCompass(event.alpha);
    }
}

getLocationBtn.addEventListener('click', startCompass);

// Simulate compass for desktop (since most desktops don't have orientation sensors)
if (!window.DeviceOrientationEvent) {
    let simulatedHeading = 0;
    getLocationBtn.innerHTML = '<i class="fas fa-location-arrow mr-2"></i> Simulate Compass';
    
    function simulateCompass() {
        if (compassActive) {
            simulatedHeading = (simulatedHeading + 1) % 360;
            updateCompass(simulatedHeading);
            requestAnimationFrame(simulateCompass);
            
            // Simulate location
            latitudeValue.textContent = (35.6895 + Math.random() * 0.01).toFixed(4);
            longitudeValue.textContent = (139.6917 + Math.random() * 0.01).toFixed(4);
            accuracyValue.textContent = `${5 + Math.floor(Math.random() * 10)} meters`;
        }
    }
    
    getLocationBtn.addEventListener('click', () => {
        compassActive = !compassActive;
        if (compassActive) {
            compassNeedle.classList.add('compass-active');
            getLocationBtn.innerHTML = '<i class="fas fa-compass mr-2"></i> Active';
            simulateCompass();
        } else {
            compassNeedle.classList.remove('compass-active');
            getLocationBtn.innerHTML = '<i class="fas fa-location-arrow mr-2"></i> Simulate Compass';
        }
    });
}