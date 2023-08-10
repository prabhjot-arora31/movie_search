function returnColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote > 5 && vote < 8) {
    return "orange";
  } else {
    return "red";
  }
}
const API_KEY = "fafef439971c0bedf1c12e7a5be971c2";
const search_term = document.getElementById("search");
const NormalUrl = "https://api.themoviedb.org/3/discover/movie/";
async function call() {
  const Data = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=fafef439971c0bedf1c12e7a5be971c2"
  );
  const data = await Data.json();
  const data1 = data.results;
  console.log(data1);
  console.log(typeof data1);
  {
    data1.map((ele) => {
      var div = document.createElement("div");
      div.style.backgroundColor = "transparent";

      // div.style.marginTop = "4rem";
      div.style.marginBottom = "0";
      // div.style.padding = "0.4rem";
      div.classList.add("card");

      //   div.classList.add(`c${count}`);
      //   count = count + 1;
      // https://image.tmdb.org/t/p/original
      div.innerHTML = `
    <img src="${
      ele.poster_path
        ? `https://image.tmdb.org/t/p/original${ele.poster_path}`
        : "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
    }" alt="" srcset="">
            <div class="inner">
            <div style='width:8rem'>
            <h3 style='text-align:center'>${ele.title} 
    </h3>
            </div>
            <h3 id='rate' style='background-color:${returnColor(
              Number(ele.vote_average)
            )}'>${ele.vote_average}</h3>
            </div>
            <h5 style='text-align:center ; margin-top:'0.6rem'>Release Date: ${
              ele.release_date
            }</h5>
            <center><div style='padding:0.5rem' class='overview'><h4 style='text-align:center'><u>Overview: </u>${
              ele.overview
            }</h4></div></center>
            `;
      document.getElementById("main").appendChild(div);
    });
  }
}
document.getElementById("btn").addEventListener("click", async () => {
  if (search_term != "" && search_term) {
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${search_term.value}&api_key=${API_KEY}`;
    const Data = await fetch(SEARCH_URL);
    const rData = await Data.json();
    const data = await rData.results;
    console.log(data);
    var count = 0;

    document.getElementById("main").innerHTML = "";
    {
      data.length == 0
        ? (document.getElementById("main").innerHTML =
            "<center><h3>Please enter relevant search....</h3></center>")
        : data.map((ele) => {
            var div = document.createElement("div");
            div.style.backgroundColor = "transparent";

            // div.style.marginTop = "4rem";
            div.style.marginBottom = "0";
            // div.style.padding = "0.4rem";
            div.classList.add("card");
            //   div.classList.add(`c${count}`);
            //   count = count + 1;
            // https://image.tmdb.org/t/p/original
            div.innerHTML = `
          <img src="${
            ele.poster_path
              ? `https://image.tmdb.org/t/p/original${ele.poster_path}`
              : "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg"
          }" alt="" srcset="">
                  <div class="inner">
                  <div style='width:8rem'>
                  <h3 style='text-align:center'>${ele.title} 
          </h3>
                  </div>
                  <h3 id='rate' style='background-color:${returnColor(
                    Number(ele.vote_average)
                  )}'>${ele.vote_average}</h3>
                  </div>
            <h5 style='text-align:center'>Release Date: ${ele.release_date}</h5>

                  <center><div style='padding:0.5rem' class='overview'><h4 style='text-align:center'><u>Overview:</u>&nbsp; &nbsp;${
                    ele.overview ? ele.overview : "not available"
                  }</h4></div></center>
                  
                  
          `;
            document.getElementById("main").appendChild(div);
          });
    }
  } else {
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").innerHTML =
      "<center><h3>Please enter the search....</h3></center>";
  }
});
