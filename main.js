var startButton, iconButton, mainBody, STDOUT, STDIN,
    gameStarted = false,
    stage = 1,
    commands = ["help", "ls"];
var args;

var files = {
    "task.txt": "VISHKAR MC ACCUSED OF CORRUPTION. FILES HACKED. GET TO THE ROOT OF THE CAUSE. I'M TRUSTING YOU.\n" +
    "TYPE 'cat gold.txt' WITHOUT THE QUOTES TO GET STARTED.\n\u00A0- HEX",
    "gold.txt": "CONFIDENTIAL: SUPERUSER PERMISSIONS CARD: DO NOT MODIFY\n" +
    "SOURCE: http://encyclo.pedia/gold\nGold is a mineral commonly mined in Western Australia, and is an industry worth ~BLANK1~ billion.\nIt is primarily " +
    "used in the making of ~BLANK2~ and jewelery.\nGold is a ~BLANK3~ of electricity.\nUSER ID 28F9D2CG4. TYPE 'sudo gold.txt' TO " +
    "AUTHENTICATE USING THIS CARD."
},
commandRunTimes = {
    "cat": 0,
    "help": 0,
    "ls": 0,
    "curl": 0,
    "crack": 0,
    "fetchssl": 0,
    "sudo_r": 0,
    "sudo": 0,
    "security": 0
};


const IN = "[IN] \u00A0",
      OUT = "[OUT] ";
const commandHelpFiles = {
    "help": "Displays this help file.",
    "ls": "Lists all files.",
    "cat": "cat [file] - Output the contents of a file.",
    "sudo": "Gain administrator privileges. Requires an unmodified gold.txt.",
    "curl": "curl [url] - Grab URL from the internet.",
    "crack": "crack [key] - Crack SSL encryption key. Used to decrypt cURL sites.",
    "fetchssl": "fetchssl [url] - Fetch SSL encryption key of URL.",
    "sudo_r": "sudo_r [file] [blank1] [blank2] [blank3] - replaces the blanks in [file] and then runs sudo against it. Each blank " +
    "is one word.",
    "security": "security [Q1] [Q2] [Q3] - answers security questions. No arguments will return the security questions.",
    "security_elevate": "security_elevate [Q1] [Q2] [Q3] [Q4] [Q5] - answers security questions for ETYA VOLSKAYA. No arguments will return the security questions."
};

Array.prototype.contains = function(obj) {
    // Allows you to use contains to see if Array contains obj
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

// START PS-BASH COMMANDS

function ls() {
    var fileNames = Object.keys(files),
        result="";
    for (i=0; i<fileNames.length; i++) {
        result += (fileNames[i] + "\n");
    }
    result = result.slice(0, -1);
    if (commandRunTimes["ls"] === 1) {
        result += "\nTo see the contents of task.txt, type 'cat task.txt'.";
        commands.push("cat");
    } else if (stage === 2) {
        result += "\nUse the 'cat' command to read files.";
    }
    addToConsole(OUT + result);
}

function cat() {
    if (args.length == 1) {
        addToConsole(OUT + "Not enough arguments.");
        return;
    }
    var file = args[1];
    if (!(Object.keys(files).contains(file))) {
        addToConsole(OUT + "cat: "+ file + ": No such file or directory.");
    } else {
        addToConsole(OUT + files[file]);
    }
    if (file === "gold.txt") {
        if (!(commands.contains(sudo))) {
            commands.push("sudo");
        }
    } else if (file === "task-update.txt") {
        commands.push("curl");
        commands.push("crack");
        commands.push("fetchssl");
    }
}

function help() {
    var result = "", command;
    for (i=0; i<commands.length; i++) {
        command = commands[i];
        result += (command + ": " + commandHelpFiles[command] + "\n");
    }
    if (stage === 2) {
        result += "\u00A0\u00A0HINT: Try viewing the files on the hard drive again with 'ls'.\nType 'help' when you're stuck;" +
            " the answers are almost always in there. Somewhere.";
    }
    addToConsole(OUT + result.slice(0, -1));
}

function sudo() {
    var result = "";
    addToConsole(OUT + "Checking SHA256 of file...\nComparing hash to verified U28F9D...\n" +
        "INCORRECT. ACCESS DENIED. TYPE 'help' FOR HELP.");
    if (stage === 1) {
        files["task-update.txt"] = "YOUR TASK HAS BEEN UPDATED.\nTHERE IS ADVANCED SECURITY SOFTWARE PREVENTING " +
            "YOU FROM OBTAINING SUPERUSER VIA SUDO. YOU WILL NEED TO PATCH UP THE DELETED BLANKS IN gold.txt IN " +
            "ORDER TO OBTAIN ACCESS. DOWNLOAD THE ENCYCLOPEDIA LINK ON GOLD FROM `http://encyclo.pedia/gold` USING " +
            "THE curl COMMAND. VIEW HELP FOR MORE DETAILS ON USING curl.\n\u00A0- HEX"
        stage = 2;
    }
}

function sudo_r() {
    if (!(args.length === 5)) {
        addToConsole(OUT + "Not enough arguments.");
    } else {
        if (!(args[1] === "gold.txt")) {
            addToConsole(OUT + "Replacing...\nChecking SHA256 of file...\nComparing hash to verified U28F9D...\n" +
                "INCORRECT. ACCESS DENIED. TYPE 'help' FOR HELP.");
        } else {
            if ((args[2].toLowerCase() === "10") && (args[3].toLowerCase() === "electronics") &&
                (args[4].toLowerCase() === "conductor")) {
                addToConsole(OUT + "Replacing...\nChecking SHA256 of file...\nVALID MATCH.\nGRANTING ACCE...\nOVERRIDE: " +
                    "MANDATORY SECURITY QUESTIONS FOR SATYA VASWANI REQUIRED.\nUSE 'security' TO ANSWER.");
                commands.push("security");
            } else {
                addToConsole(OUT + "Replacing...\nChecking SHA256 of file...\nComparing hash to verified U28F9D...\n" +
                    "INCORRECT. ACCESS DENIED. TYPE 'help' FOR HELP.")
            }

        }
    }
}

function security() {
    if (!(args.length === 4)) {
        addToConsole(OUT + "SECURITY QUESTIONS:\nGold is usually found with ______ (6)\n" +
            "Gold is usually mined using open pit mining, where the ground is dug up in _______ (7)\n" +
            "The process which dissolves gold out of ore using a solvent is called _______ (7).\n" +
            "'help' FOR HELP ON USING THIS COMMAND.");
    } else {
        if ((args[1].toLowerCase() === "quartz") && (args[2].toLowerCase() === "benches") &&
            (args[3].toLowerCase() === "leaching")) {
            addToConsole(OUT + "VERIFYING...\nCORRECT. Welcome, Satya Vaswani, to the Vishkar Database.\nFrom now on cURL will automatically decrypt websites.");
            imageToConsole("Hacked-Icon.jpg");
            commandHelpFiles["curl"] = "curl [url] - Grab URL from the internet.";
            files["relevant-links.txt"] = "http://vish.kar/gold-formation\n" +
                "http://vish.kar/gold-industry-wa";
            files["task-update-update.txt"] = "WELL DONE. YOU HAVE LOGGED IN. NOW TO ACCESS INTERNAL CLASSIFIED FILES" +
                " U WILL BE REQUIRED TO LOG IN AS ETYA VOLSKAYA (CEO OF VK). GOOD LUCK. THE 'security_elevate' COMMAND IS " +
                "UR FRIEND.\n\u00A0- HEX";
            commands.push("security_elevate");

            var index1 = commands.indexOf("crack"),
                index2 = commands.indexOf("fetchssl");
            commands.splice(index1, 1);
            commands.splice(index2, 1);
            stage = 4;
        } else {
            addToConsole(OUT + "VERIFYING...\nINCORRECT. Please try again. 'help' for help.");
        }
    }
}

function security_elevate() {
    if (!(args.length === 6)) {
        addToConsole(OUT + "ELEVATED SECURITY QUESTIONS:\n Gold is usually found in ______ rock with quartz.\n" +
            "Gold is primarily formed by ______ replacement.\n" +
            "The gold industry employs approximately ______ workers.\n" +
            "A secondary form of gold formation can be ______ deposition.\n" +
            "There are ______ mines which are, recently have been, or are planned to operate." +
            "'help' FOR HELP ON USING THIS COMMAND.");
    } else {
        if ((args[1].toLowerCase() === "sedimentary") && (args[2].toLowerCase() === "hydrothermal") &&
            (args[3].toLowerCase() === "19000") && (args[4].toLowerCase() === "alluvial") &&
            (args[5].toLowerCase() === "47")) {
                // BOOM! CONFETTI! WELL DONE! YOU FINISHED!!!!!!!!!!!!!!!!!!
                addToConsole(OUT + "Wow. Well done. You did it! Hope you had as much fun playing as I did " +
                    "making this little game :) Credit to JC and AC who both gave a few suggestions, as well " +
                    "as the countless people who beta-played this game.");
                addToConsole(OUT + "References:\n" +
                    "Gold Prospecting in WA n.d., Alluvial Gold Explained, accessed 26 October 2017, http://www.gold-prospecting-wa.com/alluvial-gold.html. \n" +
                    "Minerals and Rocks Research Assignment - Gold 2017, Myself (o.c.), Perth, accessed 24 October 2017. \n" +
                    "Protect Ecuador n.d., Open-pit mining: general overview, accessed 25 October 2017, http://protectecuador.org/portfolio/open-pit-mining-general-overview-2/. \n" +
                    "Wikipedia n.d., List of active gold mines in Western Australia, accessed 24 October 2017, https://en.wikipedia.org/wiki/List_of_active_gold_mines_in_Western_Australia. ");
        }
    }
}

function curl() { // curl http://encyclo.pedia/gold MTDGSFG4RA==
    if (args.length === 1) {
        addToConsole(OUT + "Not enough arguments.");
        return;
    }
    var url = args[1];
    if (url === "http://encyclo.pedia/gold") {
        if (args.length > 2 || stage >= 4) {
            if (args[2].toUpperCase() === "MTDGSFG4RA==" || stage >= 4) { // btoa("17FHX8D")
                imageToConsole("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Gold-crystals.jpg/440px-Gold-crystals.jpg");
                addToConsole(OUT + "ENCYCLO.PEDIA: GOLD\n" +
                    "Gold is a mineral commonly mined in Western Australia, and is an industry worth 10 billion. It has the chemical symbol Au and an atomic number of 79. As a pure element it is a bright, yellow, soft, malleable, and ductile metal. Chemically gold is in Group 11, and is a transition metal. It is one of the least reactive elements and is solid under standard conditions.\n\n" + "" +
                    "Gold is extracted through a series of chemical and physical processes. First, there is extraction from the ground which will be covered later. Then the ore is broken into smaller pieces to remove other rocks (gold is commonly found with quartz), and crushers further reduce the ore into pieces which are no larger than gravel. Then, inside rotating drums filled with steel balls a fine powder is made by grinding the gravel-like ore. Next, this powder is dissolved in water to form pulp, which is run through leaching tanks. The leaching dissolves the gold out of the ore using a solvent, usually cyanide combined with oxygen. This technique is called carbon-in-pulp. When the cyanide and oxygen react chemically, gold in the pulp dissolves. Then, by adding carbon to the tank, the gold can be removed, as the gold sticks to the carbon which can later be filtered out.\n" +
                    "On the physical side of mining, gold is mainly mined in WA using open pit mining (although underground mining is still in use although it is rare). This is where the ground is dug up in 'benches' (vertical levels of the hole about 4-6m high), over a large surface. The walls are stepped so they don't cause too much of a safety hazard.\n\n" +
                    "It is primarily used in the making of electronics and jewelery. Gold is a conductor of electricity, which makes it perfect for this.\n\nType 'help' for help.");
                stage = 3;
                commands.push("sudo_r");
            } else {
                addToConsole(OUT + "Incorrect password.")
            }
        } else {
            addToConsole(OUT + "This site is password protected.");
            commandHelpFiles["curl"] = "curl [url] [password] - Grab URL from the internet. Decode using password."
        }
    } else {
        if (stage >= 4) {
            if (args[1] === "http://vish.kar/gold-formation") {
                imageToConsole("https://upload.wikimedia.org/wikipedia/commons/5/5d/Mother_Lode_Gold_OreHarvard_mine_quartz-gold_vein.jpg");
                addToConsole(OUT + "Gold in Rocks - Thesis by Noah Brown of VK.\n" +
                    "Gold is usually found with quartz, which implies that (as quartz is mainly found in sedimentary rock) gold is most commonly found in sedimentary rock.\n\n" +
                    "Gold is primarily formed through a form of replacement, where primary deposits are transported as hot fluids dissolved with elements such as silicon, iron and sulphur. As the earth cooled, these fluids penetrated the cracks in the crust and were deposited in faults and quartz veins leading to the ore we mine nowadays. This is called hydrothermal replacement. The secondary form of gold formation is known as alluvial deposition, where streams will move (usually trace) amounts of mineral which will settle in streams, resulting to gold being found in those streams.");
            } else if (args[1] === "http://vish.kar/gold-industry-wa") {
                imageToConsole("http://www.newcrest.com.au/media/our_business/Telfer-D2-2011-0135-Main.jpg");
                addToConsole(OUT + "Gold Mining in WA - VK Corp.\nGold is the fourth-largest commodity sector in WA being valued at over $10 billion AUD. The industry employs approximately 19000 workers, and produces approximately 195 metric tonnes of gold annually.\nEach phase of mining has several environmental impacts.\n1) EXPLORATION: surveys, field studies and other exploratory excavations are done to obtain information about the location and value of the deposit. This may involve clearing large, wide areas of vegetation.\n2) DEVELOPMENT: The construction of roads can have substantial environmental" +
                    "impacts, especially if access roads cut through ecologically sensitive areas or are near previously isolated communities. If the project is in a " +
                    "remote area, nearby land may need to be cleared.\n3) ACTIVE MINING: Ores may be buried under rock which has to be moved." +
                    "\n4) DISPOSAL OF OVERBURDEN AND WASTE ROCK: The overburden is usually deposited on-site, either in piles on the surface or as backfill in" +
                    " open pits. Sometimes this overburden contains large quantities of toxic substances.\n" +
                    "5) EXTRACTION: To extract the ore leaching is usually used. The waste from leaching can be full of waste rock and toxic chemicals." +
                    "\n6) SITE RECLAMATION AND CLOSURE: This is when the mining site has to be restored to the condition that most resembles the pre-mining environment. Also known as rehabilitation.\n\n");
                imageToConsole("mining-map.png");
                addToConsole(OUT + "ABOVE: Map of all mines in Western Australia. There are currently 47 mines which are active, were recently active, or scheduled for the near future. (actual URL to image in case it's too small: https://denosawr.github.io/GoldHacker/mining-map.png)");
            } else {
                addToConsole(OUT + url + ": site not found")
            }
        }
    }
}

function crack() {
    if (args.length === 1) {
        addToConsole(OUT + "Not enough arguments.");
        return;
    }
    var key = args[1];
    addToConsole(OUT + "Cracked key:\n"+btoa(args[1]));
}

function fetchssl() {
    if (args.length === 1) {
        addToConsole(OUT + "Not enough arguments.");
        return;
    }
    var url = args[1];
    if (url === "http://encyclo.pedia/gold") {
        addToConsole(OUT + "SSL Key:\n17FHX8D");
    } else {
        addToConsole(OUT + "Invalid site.");
    }
}

// END COMMANDS


function addToConsole(text) {
    var texts = text.split("\n"),
        para = document.createElement("p");

    console.log(texts);

    for (i=0; i<texts.length; i++) {
        var appendText;
        if (i>0) { appendText = Array(7).join("\u00A0") + texts[i]; }
        else { appendText = texts[i] }
        console.log(appendText);
        para.appendChild(document.createTextNode(appendText));
        para.appendChild(document.createElement("br"));
    }
    if (text.startsWith(IN)) {
        para.classList.add("STDIN");
    }
    STDOUT.appendChild(para);
    console.log(STDOUT.childNodes.length);
    STDOUT.childNodes.item(STDOUT.childNodes.length-1).scrollIntoView(); // Scrolls the last element in STDOUT into view.
}

function imageToConsole(img) {
    var elem = document.createElement("img");
    elem.setAttribute("src", img);
    elem.setAttribute("class", "stdout-img");
    STDOUT.appendChild(elem);
    STDOUT.childNodes.item(STDOUT.childNodes.length-1).scrollIntoView(); // Scrolls the last element in STDOUT into view.
}


function StartGame() {
    console.log("HELLO");
    iconButton.classList.add("disappearing");
    startButton.classList.add("disappearing");
    gameStarted = true;
    setTimeout(function() {
        iconButton.remove();
        startButton.remove();
        mainBody.classList.add("shown");
        STDIN.focus();

        addToConsole(OUT + "Vishkar Mining Company, WA Branch \nBourne Again SHell v4.4.12, Ubuntu Server\n" +
            "Type 'ls' for a list of all files on the hard drive, 'help' for help.");
    }, 520);

}

function newCommand() {
    var cmd = STDIN.value.trim();
    STDIN.value = "";
    if (!cmd) { return; }

    console.log(cmd);
    addToConsole(IN + cmd);
    args = cmd.split(" ");
    console.log(args[0], commands);
    if (commands.contains(args[0])) {
        commandRunTimes[args[0]] += 1;
        setTimeout(function() { eval(args[0] + "()"); }, 300);
    } else {
        addToConsole(OUT + args[0] + " - command not found");
    }
}

window.onkeydown = function(e) {
    if (e.keyCode === 13) {
        if (gameStarted) {
            newCommand();
        } else {
            StartGame();
        }
        return false;
    }
};


window.onload = function() {
    console.log("LOAD");
    startButton = document.getElementById("start-button");
    iconButton = document.getElementById("main-icon");
    mainBody = document.getElementById("main-body");
    STDOUT = document.getElementById("output-console");
    STDIN = document.getElementById("input-console");

    iconButton.onclick = StartGame;
    startButton.onclick = StartGame;

};