window.onload = function()  {
    fetch('https://swapi.dev/api/planets/')
    .then((response) => response.json())
    .then((data) => {
        console.log(data.results)
        addPlanets(data.results)
    })


    function addPlanets(planets) {
        let table = document.querySelector('tbody')
        for (let planet of planets) {
            let row = document.createElement('tr')
            let name = document.createElement('td')
            name.innerText = planet.name
            let diameter = document.createElement('td')
            diameter.innerText = parseInt(planet.diameter).toLocaleString() + " km"
            let climate = document.createElement('td')
            climate.innerText = planet.climate
            let terrain = document.createElement('td')
            terrain.innerText = planet.terrain
            let surfaceWater = document.createElement('td')
            surfaceWater.innerText = planet.surface_water.length < 4 ? planet.surface_water + " %":planet.surface_water
            let population = document.createElement('td')
            population.innerText = planet.population !== "unknown" ? parseInt(planet.population).toLocaleString() + " people":planet.population
            let residents = document.createElement('td')
            residents.innerText = planet.residents.length === 0 ? "No known residents":planet.residents.length + " resident(s)"
            row.append(name, diameter, climate, terrain, surfaceWater, population, residents)
            table.appendChild(row)
        }



    }
}




