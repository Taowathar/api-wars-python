window.onload = function()  {
    window.currentPage = 1
    getPlanets(currentPage)
    nextPage()
    previousPage()

    function getPlanets(currentPage) {
        fetch(`https://swapi.dev/api/planets/?page=${currentPage}`)
        .then((response) => response.json())
        .then((data) => {
            addPlanets(data.results)
        })
    }


    function addPlanets(planets) {
        let table = document.querySelector('tbody')
        for (let planet of planets) {
            let row = document.createElement('tr')
            let name = document.createElement('td')
            name.innerText = planet.name
            let diameter = document.createElement('td')
            diameter.innerText = planet.diameter !== "unknown" ? parseInt(planet.diameter).toLocaleString() + " km":planet.diameter
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
    

    function previousPage() {
        let button = document.getElementById('previous')
        button.onclick = function() {
            if (window.currentPage > 1) {
                window.currentPage -= window.currentPage !== 1 ? 1:0
                let table = document.querySelector('tbody')
                while (table.firstChild) {
                    table.firstChild.remove()
                }
                getPlanets(currentPage)
            }

        }
    }
        

    function nextPage() {
        let button = document.getElementById('next')
        button.onclick = function() {
            if (window.currentPage < 6) {
                window.currentPage += window.currentPage !== 6 ? 1:0
                let table = document.querySelector('tbody')
                while (table.firstChild) {
                    table.firstChild.remove()
                }
                getPlanets(currentPage)
            }

        }
    }
}




