document.addEventListener('DOMContentLoaded', () => {
    const converterType = document.getElementById('converter-type');
    const fromUnit = document.getElementById('converter-from');
    const toUnit = document.getElementById('converter-to');
    const inputField = document.getElementById('converter-input');
    const outputField = document.getElementById('converter-output');
    const swapBtn = document.getElementById('swap-units');
    
    // Conversion units data
    const conversionUnits = {
        length: [
            { name: 'Meters', value: 'meters', factor: 1 },
            { name: 'Kilometers', value: 'kilometers', factor: 1000 },
            { name: 'Centimeters', value: 'centimeters', factor: 0.01 },
            { name: 'Millimeters', value: 'millimeters', factor: 0.001 },
            { name: 'Miles', value: 'miles', factor: 1609.344 },
            { name: 'Yards', value: 'yards', factor: 0.9144 },
            { name: 'Feet', value: 'feet', factor: 0.3048 },
            { name: 'Inches', value: 'inches', factor: 0.0254 }
        ],
        weight: [
            { name: 'Kilograms', value: 'kilograms', factor: 1 },
            { name: 'Grams', value: 'grams', factor: 0.001 },
            { name: 'Milligrams', value: 'milligrams', factor: 0.000001 },
            { name: 'Pounds', value: 'pounds', factor: 0.453592 },
            { name: 'Ounces', value: 'ounces', factor: 0.0283495 },
            { name: 'Stones', value: 'stones', factor: 6.35029 }
        ],
        temperature: [
            { name: 'Celsius', value: 'celsius' },
            { name: 'Fahrenheit', value: 'fahrenheit' },
            { name: 'Kelvin', value: 'kelvin' }
        ],
        area: [
            { name: 'Square Meters', value: 'sqmeters', factor: 1 },
            { name: 'Square Kilometers', value: 'sqkilometers', factor: 1000000 },
            { name: 'Square Miles', value: 'sqmiles', factor: 2589988.11 },
            { name: 'Square Yards', value: 'sqyards', factor: 0.836127 },
            { name: 'Square Feet', value: 'sqfeet', factor: 0.092903 },
            { name: 'Square Inches', value: 'sqinches', factor: 0.00064516 },
            { name: 'Hectares', value: 'hectares', factor: 10000 },
            { name: 'Acres', value: 'acres', factor: 4046.86 }
        ],
        volume: [
            { name: 'Liters', value: 'liters', factor: 1 },
            { name: 'Milliliters', value: 'milliliters', factor: 0.001 },
            { name: 'Cubic Meters', value: 'cubicmeters', factor: 1000 },
            { name: 'Gallons (US)', value: 'gallonsus', factor: 3.78541 },
            { name: 'Gallons (UK)', value: 'gallonsuk', factor: 4.54609 },
            { name: 'Quarts', value: 'quarts', factor: 0.946353 },
            { name: 'Pints', value: 'pints', factor: 0.473176 },
            { name: 'Cups', value: 'cups', factor: 0.24 }
        ],
        speed: [
            { name: 'Meters/Second', value: 'mps', factor: 1 },
            { name: 'Kilometers/Hour', value: 'kph', factor: 0.277778 },
            { name: 'Miles/Hour', value: 'mph', factor: 0.44704 },
            { name: 'Knots', value: 'knots', factor: 0.514444 },
            { name: 'Feet/Second', value: 'fps', factor: 0.3048 }
        ]
    };
    
    // Initialize converter
    populateUnits();
    
    // Event listeners
    converterType.addEventListener('change', populateUnits);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);
    inputField.addEventListener('input', convert);
    swapBtn.addEventListener('click', swapUnits);
    
    function populateUnits() {
        const type = converterType.value;
        const units = conversionUnits[type];
        
        // Clear existing options
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        
        // Add new options
        units.forEach(unit => {
            const option1 = document.createElement('option');
            option1.value = unit.value;
            option1.textContent = unit.name;
            
            const option2 = option1.cloneNode(true);
            
            fromUnit.appendChild(option1);
            toUnit.appendChild(option2);
        });
        
        // Set default "to" unit to the second option
        if (units.length > 1) {
            toUnit.selectedIndex = 1;
        }
        
        // Convert with new units
        convert();
    }
    
    function convert() {
        const type = converterType.value;
        const from = fromUnit.value;
        const to = toUnit.value;
        const input = parseFloat(inputField.value) || 0;
        
        let result;
        
        if (type === 'temperature') {
            result = convertTemperature(input, from, to);
        } else {
            const fromUnitData = conversionUnits[type].find(u => u.value === from);
            const toUnitData = conversionUnits[type].find(u => u.value === to);
            
            // Convert to base unit first, then to target unit
            const baseValue = input * fromUnitData.factor;
            result = baseValue / toUnitData.factor;
        }
        
        outputField.value = result.toFixed(6).replace(/\.?0+$/, '');
    }
    
    function convertTemperature(value, from, to) {
        let celsius;
        
        // Convert to Celsius first
        switch(from) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }
        
        // Convert from Celsius to target unit
        switch(to) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return celsius * 9/5 + 32;
            case 'kelvin':
                return celsius + 273.15;
        }
    }
    
    function swapUnits() {
        const temp = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = temp;
        convert();
    }
});