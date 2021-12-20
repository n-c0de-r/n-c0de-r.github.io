// Not much here. Give me some time. I'm working on it, I promise :)
function fillNavbar(){
    let navbar = document.getElementById("collapsableNavbar");
    navbar.innerHTML = "<a href=\"../index.html\" id=\"home\">Home</a>\n"
    + "<a href=\"../subpages/211217_API_project.html\" id=\"audio\">Audio API</a>\n"
    + "<a href=\"#\" id=\"zelda\">Zelda API</a>\n"
    + "<a href=\"../subpages/211217_TicTacToe_project.html\" id=\"ttt\">Tic Tac Toe</a>\n"
    + "<a href=\"../subpages/211217_StopTheVirus_project.html\" id=\"virus\">Stop The Virus</a>\n";
    let head =document.getElementsByTagName("head")[0];
    head.innerHTML += "<link rel=\"icon\" type=\"image/png\" href=\"../assets/favicon.png\" sizes=\"400x400\"></link>";
}