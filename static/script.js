window.onload = function()  {
    window.currentPage = 1;
    getPlanets(currentPage);
    nextPage();
    previousPage();

    function getPlanets(currentPage) {
        fetch(`https://swapi.dev/api/planets/?page=${currentPage}`)
        .then((response) => response.json())
        .then((data) => {
            addPlanets(data.results);
        })
    };


    function addPlanets(planets) {
        let table = document.querySelector('tbody');
        for (let planet of planets) {
            let row = document.createElement('tr');
            let name = document.createElement('td');
            name.innerText = planet.name;
            let diameter = document.createElement('td');
            diameter.innerText = planet.diameter !== "unknown" ? parseInt(planet.diameter).toLocaleString() + " km":planet.diameter;
            let climate = document.createElement('td');
            climate.innerText = planet.climate;
            let terrain = document.createElement('td');
            terrain.innerText = planet.terrain;
            let surfaceWater = document.createElement('td');
            surfaceWater.innerText = planet.surface_water.length < 4 ? planet.surface_water + " %":planet.surface_water;
            let population = document.createElement('td');
            population.innerText = planet.population !== "unknown" ? parseInt(planet.population).toLocaleString() + " people":planet.population;
            if (planet.residents.length === 0) {
                var residents = document.createElement('td');
                residents.innerText = "No known residents";
            }
            else {
                var residents = document.createElement('td');
                let button = document.createElement('button');
                button.innerText = planet.residents.length + " resident(s)";
                button.classList.add('residents-button');
                button.onclick = function() {
                    addModalTitle(planet.name)
                    getResidents(planet.residents);
                    $('#myModal').modal('show');
                    closeModal();
                }
                residents.appendChild(button);
            }
            if (typeof username !== 'undefined') {
                let vote = document.createElement('td');
                let voteButton = document.createElement('button');
                voteButton.classList.add('vote-button');
                voteButton.innerText = "Vote"
                vote.appendChild(voteButton);
                row.append(name, diameter, climate, terrain, surfaceWater, population, residents, vote);
            }
            else {row.append(name, diameter, climate, terrain, surfaceWater, population, residents);}
            table.appendChild(row);
        };
    };
    

    function previousPage() {
        let button = document.getElementById('previous');
        button.onclick = function() {
            let flash = document.getElementById('flash')
            if (flash !== null) {flash.remove()}
            if (window.currentPage > 1) {
                window.currentPage -= window.currentPage !== 1 ? 1:0;
                let table = document.querySelector('tbody');
                clearTable(table)
                getPlanets(currentPage);
            };
        };
    };
        

    function nextPage() {
        let button = document.getElementById('next');
        button.onclick = function() {
            let flash = document.getElementById('flash')
            if (flash !== null) {flash.remove()}
            if (window.currentPage < 6) {
                window.currentPage += window.currentPage !== 6 ? 1:0;
                let table = document.querySelector('tbody');
                clearTable(table)
                getPlanets(currentPage);
            };
        };
    };


    function getResidents(residents) {
        let table = document.querySelector('.residents-table');
        clearTable(table)
        for (let resident of residents) {

            // let http = new XMLHttpRequest();
            // http.onreadystatechange = function() {
            //     if (http.readyState == 4 && http.status == 200) {
            //         console.log(JSON.parse(http.response))
            //     }
            // }
            // http.open("GET", resident, true);
            // http.send();

            fetch(resident)
            .then((response) => response.json())
            .then((data) => {
                addResidents(data);
            })

        }
    }


    function addResidents(resident) {
        let table = document.querySelector('.residents-table');
        let row = document.createElement('tr');
        let name = document.createElement('td');
        name.innerText = resident.name;
        let height = document.createElement('td');
        height.innerText = resident.height;
        let mass = document.createElement('td');
        mass.innerText = resident.mass;
        let hair = document.createElement('td');
        hair.innerText = resident.hair_color
        let skin = document.createElement('td');
        skin.innerText = resident.skin_color
        let eye = document.createElement('td');
        eye.innerText = resident.eye_color
        let birth = document.createElement('td');
        birth.innerText = resident.birth_year
        let gender = document.createElement('td');
        gender.innerText = resident.gender
        row.append(name, height, mass, hair, skin, eye, birth, gender);
        table.appendChild(row);
    }


    function clearTable(table) {
        while (table.firstChild) {
            table.firstChild.remove();
        };
    }


    function addModalTitle(planetName) {
        let modal = document.querySelector('.modal-content');
        modal.firstChild.remove();
        let title = document.createElement('h2');
        title.innerText = "Residents of " + planetName;
        modal.prepend(title);
    }



    function closeModal() {
    let closeIcon = document.querySelector(".close");
    closeIcon.addEventListener("click", function(e){
        $('#myModal').modal('hide');
    });
}
}




