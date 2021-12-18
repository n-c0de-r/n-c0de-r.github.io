var running = null;
var input = document.getElementsByTagName("input")[0]
var output = document.getElementsByTagName("textarea")[0];
var button = document.getElementsByTagName("button")[0];
var rooms = {};
var inventory = {};
var commands = ["go", "quit", "look", "take", "lock", "unlock", "help"]

var currentRoom;

function start(){
	running = !running;
	if (running){
		input.addEventListener("keyup", splitInput);
		input.readOnly = false;
		input.classList.add("active");
		input.value = "";
		input.focus();
		button.innerHTML = "Quit Game";
		button.classList.add("active");
		createRooms();
		createExits();
		createItems();
		printWelcome();
	} else {
		input.readOnly = true;
		input.classList.remove("active");
		input.value = "Press to start ->";
		input.focus();
		button.innerHTML = "New Game";
		button.classList.remove("active");
		output.innerHTML += "\nThank you for playing.  Good bye.\n";
		addEndLine();
	}
}

function addEndLine(){
	output.innerHTML += "\n--------------------\n";
	output.scrollTop = output.scrollHeight;
}

function printWelcome(){
	output.innerHTML += "Welcome to Stop the Virus!\n";
	output.innerHTML += "Stop the Virus is a new adventure game.\n";
    output.innerHTML += "Type 'help' if you need help.";
	addEndLine();    
	printLocationInformation();
}

function createRooms(){
	rooms["outside"] = new Room("outside the Robert Koch Institute");
	rooms["mainhall"] = new Room("inside the building in the main hall");
	rooms["secretary"] = new Room("in the secretary's office");
	rooms["lab"] = new Room("in the vaccine laboratory");
	rooms["office"]	= new Room("in Prof. Drosten's office");
	rooms["freezer"] = new Room("in the freezer");
	currentRoom = rooms.outside;
}

function createExits(){
	rooms.outside.exits["south"] = new Exit(rooms.mainhall, true);
	rooms.mainhall.exits["north"] = new Exit(rooms.outside, true);
	rooms.mainhall.exits["east"] = new Exit(rooms.secretary, true);
	rooms.secretary.exits["east"] = new Exit(rooms.outside, false);
	rooms.secretary.exits["south"] = new Exit(rooms.office, false);
	rooms.secretary.exits["west"] = new Exit(rooms.mainhall, true);
	rooms.office.exits["north"] = new Exit(rooms.secretary, false);
	rooms.office.exits["east"] = new Exit(rooms.freezer, false);
	rooms.office.exits["west"] = new Exit(rooms.lab, false);
	rooms.freezer.exits["north"] = new Exit(rooms.lab, false);
	rooms.lab.exits["east"] = new Exit(rooms.outside, false);
	rooms.lab.exits["south"] = new Exit(rooms.freezer, false);
}

function createItems(){
	rooms.mainhall.items["keycard"] = new Item(2, "A plastic key card in a metal casing.");
	rooms.secretary.items["key"] = new Item(2, "The heavy master key, it opens all doors.");
	rooms.secretary.items["baseballbat"] = new Item(70, "Someone is a baseball fan, apparently.");
	rooms.office.items["nobeltrophy"] = new Item(42, "Won for discovering the cure for a deadly virus.");
	rooms.office.items["researchpapers"] = new Item(1, "Recent documents on the new virus mutation.");
	rooms.freezer.items["gastank"] = new Item(210, "A gas tank full of nitrogen. Caution: very cold!");
	rooms.freezer.items["vaccine"] = new Item(1, "The cure for the new virus. Keep it cool!");
	rooms.lab.items["coolerbox"] = new Item(15, "Portable, keeps beverages cool. It's empty :(");
	rooms.lab.items["medikit"] = new Item(30, "A set of tools used for medical examination.");
	rooms.lab.items["storageshelf"] = new Item(999, "Immobile shelf, secured with an electrical lock.");
}

function Exit(room, state){
	this.direction = room;
	this.state = state;
}

function Room(text){
	this.description = text;
	this.items = {};
	this.exits = {};
}

function Item( weight, text){
	this.weight = weight;
	this.description = text;
}

function splitInput(event){
	if (event.keyCode === 13 && input.value.length !== 0){
		event.preventDefault();
		let splitStrings = input.value.toLowerCase().trim().split(" ");
			input.value = "";
		if (commands.includes(splitStrings[0])){
			commandCheck(splitStrings.shift(), splitStrings.shift());
		} else {
			output.innerHTML += "That is an unknown command."
			addEndLine();
		}
	}
}

function commandCheck(first, second){
	switch (first){
		case "quit":
			(second == undefined || second.length === 0) ? start() : output.innerHTML += "\nQuit what?\n--------------------";
			break;
        case "help":
            printHelp();
            break;
        case "go":
			go(second);
            break;
        case "look":
            look();
            break;
        case "unlock":
			unlock(second);
            break;
        case "lock":
			lock(second);
            break;
        case "take":
			take(second);
            break;
		default:
			output.innerHTML += "I don't know what you mean...";
			addEndLine();
        }
}

function printLocationInformation(){
	output.innerHTML += "You are " + currentRoom.description;
	output.innerHTML += "\n";
	output.innerHTML += "There are exits to the " + getDirections(currentRoom.exits);
	addEndLine();
}

function printHelp(){
	output.innerHTML += "You are lost. You are alone. You are looking for\n";
	output.innerHTML += "the vaccine that will save you from the killer virus.\n";
	output.innerHTML += "\n";
	output.innerHTML += "Your command words are:\n";
	output.innerHTML += commands;
	addEndLine();
}

function getDirections (room) {
	let directions = "[";
	Object.keys(room).forEach(element => {
		directions += element + ", "
	});
	directions = directions.substring(0, directions.length-2) + "]";
	return directions;
}

function go(where){
	if (where == undefined || where.length === 0) {
		output.innerHTML += "Go where?";
		addEndLine();
	} else if (Object.keys(currentRoom.exits).includes(where) ){
		if (currentRoom.exits[where].state){
			currentRoom = currentRoom.exits[where].direction;
			printLocationInformation();
		} else {
			output.innerHTML += "This door is locked.";
			addEndLine();
		}
	} 	else {
			output.innerHTML += "There is no door.";
			addEndLine();
	}
}

function look(){
	output.innerHTML += "You see the following Items in the room: "
	output.innerHTML += "\n";
	output.innerHTML += Object.keys(currentRoom.items);
	addEndLine();
}

function take(item){
	if (item == undefined || item.length === 0) {
		output.innerHTML += "Take what?";
		addEndLine();
	} else if (Object.keys(currentRoom.items).length == 0){
		output.innerHTML += "Nothing to take here."
		addEndLine();
		} else {
			if (Object.keys(currentRoom.items).includes(item)){
			inventory[item] = currentRoom.items[item];
			delete currentRoom.items[item];
			output.innerHTML += "You took " + item + " and put it in your inventory.";
			addEndLine();
			} else {
				output.innerHTML += "No such item here."
				addEndLine();
			}
		}
}

function lock(where){
	if (where == undefined || where.length === 0) {
		output.innerHTML += "Lock what?";
		addEndLine();
	} else if (Object.keys(currentRoom.exits).includes(where)){
		if (!currentRoom.exits[where].state){
			output.innerHTML += "This door is already locked.";
			addEndLine();
		} else if (Object.keys(inventory).includes("key")){
			currentRoom.exits[where].state = !currentRoom.exits[where].state
			output.innerHTML += "This door is locked now.";
			addEndLine();
		} else {
			output.innerHTML += "You need a key to do that.";
			addEndLine();
		}
	} else {
		output.innerHTML += "There is no such door.";
		addEndLine();
	}
}

function unlock(where){
	if (where == undefined || where.length === 0) {
		output.innerHTML += "Unlock what?";
		addEndLine();
	} else if (Object.keys(currentRoom.exits).includes(where) ){
		if (currentRoom.exits[where].state){
			output.innerHTML += "This door is already open.";
			addEndLine();
		} else if (Object.keys(inventory).includes("key")) {
				currentRoom.exits[where].state = !currentRoom.exits[where].state
				output.innerHTML += "This door is unlocked now.";
				addEndLine();
			} else {
				output.innerHTML += "You need a key to do that.";
				addEndLine();
			}
	} else {
		output.innerHTML += "There is no such door.";
		addEndLine();
	}
}