$(document).ready(function() { //beginning of char select bracketg

    var characters = { //begin char block
        "john-snow": {
            name: "john-snow",
            hitpoints: 100,
            attack: 6,
            image: "assets/css/images.snow.jpg",
            counterAttack: 15,
        },

        "daenyreus": {
            name: "daenyreus",
            hitpoints: 160,
            attack: 7,
            image: "assets/css/images/daen.jpg",
            counterAttack: 15,
        },

        "cersei-lannister": {
            name: "cersei-lannister",
            hitpoints: 100,
            attack: 12,
            image: "assets/css/images/cersei.jpg",
            counterAttack: 10,
        },

        "the-night-king": {
            name: "the-night-king",
            hitpoints: 130,
            attack: 8,
            image: "assets/css/images/nightking.jpg",
            counterAttack: 25,
        },

    }; //end char block

    var playerSelected = false;
    var enemySelected = false;
    


    // write health into footer slot for each character from their Object block
    $("#john-snow").find("#health").html(characters["john-snow"].hitpoints);
    $("#daenyreus").find("#health").html(characters["daenyreus"].hitpoints);
    $("#cersei-lannister").find("#health").html(characters["cersei-lannister"].hitpoints);
    $("#the-night-king").find("#health").html(characters["the-night-king"].hitpoints);

    function pickChar(char) {
        //gameOVer function
        if (!enemySelected) {
            if (!playerSelected) { // Selecting charachter and moving to .playerSelected
                $("#playerSelection").html($(this).show('slow'));
                $("#playerSelection").children().addClass("playerChoice");
                $("#enemy-panel").append($("#characterChoice").html()).show('slow');

                $("#choose").html("now choose your oppenent");
                playerSelected = true;
            } else {
                //Move enemy here
                $("#oppenentChoice").html($(this).show("slow"));
                $("#oppenentChoice").children().addClass("enemy");
                //$("#characterChoice").html($(this).hide("slow"));-----------------Bug hide other chars
                enemySelected = true;
                
            } //drops enemy to oppenent section

            //Once both charachters are set, use for attack
            $("#attackBtn").unbind('click').click(function(evt) {


                characters[$(".playerChoice").attr('id')].hitpoints -= characters[$(".enemy").attr('id')].counterAttack;
                console.log(characters[$(".playerChoice").attr('id')].name + " " + characters[$(".playerChoice").attr('id')].hitpoints);
                $("#results").html("the enemy attacked you for " + characters[$(".enemy").attr('id')].counterAttack + " and " + ("you attacked the enemy for  " + characters[$(".playerChoice").attr('id')].attack));
                $("#health").html(characters[$(".playerChoice").attr('id')].hitpoints);
                $("#health").html(characters[$(".enemy").attr('id')].hitpoints);

                characters[$(".enemy").attr('id')].hitpoints -= characters[$(".playerChoice").attr('id')].attack;
                console.log(characters[$(".enemy").attr('id')].name + " " + characters[$(".enemy").attr('id')].hitpoints);
                //$("#health").append(characters[$(".playerChoice").attr('id')].hitpoints);
                // $("#health").append(characters[$(".enemy").attr('id')].hitpoints);


                //-------------FIX attack multiplier
                characters[$(".playerChoice").attr('id')].attack++;
                console.log("The player's attack is now  " + characters[$(".playerChoice").attr('id')].attack);

                if (characters[$(".enemy").attr('id')].hitpoints <= 0) {
                    $("#results").html("You Defeated  " + characters[$(".enemy").attr('id')].name + " please  Choose  another  contender  to  the  iron  throne");
                    enemySelected = false;
                    pickChar();
                }
                //If Game over, states player is dead and attack btn becomes try agaiain, reload on location.reload click
                if (characters[$(".playerChoice").attr('id')].hitpoints <= 0) {
                    $("#results").html(characters[$(".playerChoice").attr('id')].name + " is dead try again?");
                    $("#attackBtn").html("Try Again");
                    $("#attackBtn").click(function() {
                        location.reload();
                        //--------------------------------------------------need to wirte win function

                    });

                }


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