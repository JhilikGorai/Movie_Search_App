const search = document.querySelector("#search") ;
const container = document.querySelector("#movie-container");
let time;

search.addEventListener("input" , () => {
    clearTimeout(time);

    time = setTimeout(async() => {
        const url = `http://www.omdbapi.com/?&apikey=643ae267&s=${search.value}`;

        if (search.value.trim() === "") {
            container.innerHTML = "";
            return;
        }
        try {
        const result = await fetch(url);
        const data = await result.json();

        if (data.Response === "False") {
           container.innerHTML = "<p>No movies found</p>";
            return;
        }

        container.innerHTML = "";

        data.Search.forEach((movie) => {
            const card = document.createElement("div");
            card.classList.add("movie-card");
            
            card.innerHTML = `
            <img src ="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
             `;
            container.appendChild(card);
            });
        }  catch (error) {console.log("Something went wrong:", error.message);

        }
    } , 1000);
});
   