let APIsource = "https://www.theaudiodb.com/api/v1/json/2/search.php?s="
let searchField = document.getElementById("search-input");

function search() {
    let result = fetch(APIsource + searchField.value)
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then(data => {
        console.log(data);
        generatePage(data)
      })
      .catch((error) => console.error("FETCH ERROR:", error));
}

function generatePage(data){
    
}
