$(document).ready(function() { //beginning of char select bracketg

    var characters = { //begin char block
        "john-snow": {
            name: "John Snow",
            hitpoints: 120,
            attack: 30,
            image: "assets/css/images.snow.jpg",
            counterAttack: 45,
        },

        "daenyreus": {
            name: "Daenyreus",
            hitpoints: 160,
            attack: 7,
            image: "assets/css/images/daen.jpg",
            counterAttack: 15,
        },

        "cersei-lannister": {
            name: "Cersei Lannister",
            hitpoints: 100,
            attack: 20,
            image: "assets/css/images/cersei.jpg",
            counterAttack: 25,
        },

        "the-night-king": {
            name: "The Night King",
            hitpoints: 130,
            attack: 25,
            image: "assets/css/images/nightking.jpg",
            counterAttack: 25,
        },

    }; //end char block

    var playerSelected = false;
    var enemySelected = false;
    var death = new Audio("assets/death.mp3");
    
    // write health into footer slot for each character from their Object block
    $("#john-snow").find("#health").html(characters["john-snow"].hitpoints);
    $("#daenyreus").find("#health").html(characters["daenyreus"].hitpoints);
    $("#cersei-lannister").find("#health").html(characters["cersei-lannister"].hitpoints);
    $("#the-night-king").find("#health").html(characters["the-night-king"].hitpoints);

    function pickChar(char) {
        //gameOVer function
        if (!enemySelected) {
            if (!playerSelected) { // Selecting character and moving to .playerSelected
                $("#playerSelection").html($(this).show('slow'));
                $("#playerSelection").children().addClass("playerChoice");
                $("#choose").html("now choose your oppenent");
                playerSelected = true;

            } else {
                //Move enemy here
                $("#oppenentChoice").html($(this).show("slow"));
                $("#oppenentChoice").children().addClass("enemy");
                $("#choose").html("defend your stake to the throne");
                $("#phase").html("Attack your oppenent");
                //$("#characterChoice").html($(this).hide("slow"));//-----------------Bug hide other chars
                enemySelected = true; 
            } //drops enemy to oppenent section


            //Once both characters are set, use for attack
            $("#attackBtn").unbind('click').click(function(evt) {     
                //---------create variable for player attack increase---------
                var attackIncrease = characters[$(".playerChoice").attr('id')].attack;  
                //--------damage player takes on turn-------------
                characters[$(".playerChoice").attr('id')].hitpoints -= characters[$(".enemy").attr('id')].counterAttack;
                console.log(characters[$(".playerChoice").attr('id')].name + " " + characters[$(".playerChoice").attr('id')].hitpoints);
                $(".playerChoice").find("#health").text(characters[$(".playerChoice").attr('id')].hitpoints);
                //---------damage enemy takes on turn-----------------
                characters[$(".enemy").attr('id')].hitpoints -= characters[$(".playerChoice").attr('id')].attack;
                console.log(characters[$(".enemy").attr('id')].name + " " + characters[$(".enemy").attr('id')].hitpoints);
                $(".enemy").find("#health").text(characters[$(".enemy").attr('id')].hitpoints);
                //--------Prints attack results to HTML--------------
                $("#results").html("the enemy attacked you for " + characters[$(".enemy").attr('id')].counterAttack + " and " + ("you attacked the enemy for  " + characters[$(".playerChoice").attr('id')].attack));


                //-------------FIX attack multiplier---------------------------------------------Bugged-------------!!!
                characters[$(".playerChoice").attr('id')].attack += attackIncrease;
                console.log("The player's attack is now  " + characters[$(".playerChoice").attr('id')].attack);


                //----------Conditions for game Wins---------------//

                  //If Game over, states player is dead and attack btn becomes try agaiain, reload on location.reload click
                if (characters[$(".playerChoice").attr('id')].hitpoints <= 0) {
                    $("#results").html(characters[$(".playerChoice").attr('id')].name + " is dead try again?");
                    $("#attackBtn").html("Try Again");
                    $("#attackBtn").unbind("click");
                    $("#attackBtn").click(function() {
                        location.reload();
                      

                    });

                } else if (characters[$(".enemy").attr('id')].hitpoints <= 0) {
                            death.play();
                             $("#results").html("You Defeated  " + characters[$(".enemy").attr('id')].name + " please  Choose  another  contender  to  the  iron  throne");
                             $("#phase").html("Select a new oppenent");
                             enemySelected = false;
                             pickChar();

                         } else if(characters[$(".enemy").attr('id')].hitpoints <= 0 && enemySelected === 3) {
                                     $("#results").html("you win");
                                    }//----------WIN VARIABLE NOT SET------------------//
              

            }); //attack function

        } //closes if enemy selected statement

    } //closes start game function (pickChar)


    //game begins when player selects a character
    $(".charDiv").click(pickChar);


    //theme song

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', "assets/theme.mp3");
    audioElement.setAttribute('autoplay', 'autoplay');
    //audioElement.load()
    $.get();
    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);

    $('#play').click(function() {
        audioElement.play();
    });

    $('#pause').click(function() {
        audioElement.pause();
    });


}); //end game bracket/close