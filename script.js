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
            container.innerHTML = "<p>Loading...</p>"

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
            card.dataset.id = movie.imdbID;
            
            card.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x260?text=No+Image'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
             `;
            container.appendChild(card);
         });

            container.addEventListener("click", (event) => {
                const card = event.target.closest(".movie-card");
                if (!card)
                    return;
                console.log("You clicked:", card.dataset.id);
            });
            
        }  catch (error) {console.log("Something went wrong:", error.message);

        }
    } , 1000);
});
   