let APIsource = "https://www.theaudiodb.com/api/v1/json/2/search.php?s="
let searchField = document.getElementById("search-input");
let datas;

function search() {
  if (searchField.value === "") {
    return;
  }
  let result = fetch(APIsource + searchField.value)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    datas = data;
    generatePage(data);
  })
  .catch((error) => console.error("FETCH ERROR:", error));
}
  
function generatePage(data){
  let resultDiv = document.getElementById("resultDiv");
  resultDiv.innerHTML = "<h1>Search results for \"" + searchField.value + "\"</h1>";
  let newList = document.createElement("ul");
  resultDiv.appendChild(newList);
  let types = Object.values(datas);
  types.forEach(type => {
    type.forEach (element => {
      console.log(element.strArtist);
      newList.innerHTML += "<li><a href=\"https://"+element.strWebsite
      +"\">"+element.strArtist+"<a></li>";

    })
  });
  resultDiv.appendChild(newList);
}
