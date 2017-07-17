
$(document).ready(function() {   //beginning of char select bracketg

    var characters = {            //begin char block
        "john-snow": {
            name:"john-snow",
            hitpoints:100,
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

        "the-night--king": {
            name: "the-night--king",
            hitpoints: 130,
            attack: 8,
            image: "assets/css/images/nightking.jpg",
            counterAttack: 25,
            },
        
    };  //end char block

    var playerSelected =false;
    var enemySelected =false;
    var gameOver=false

    // write health into footer slot for each character from their Object block
    $("#john-snow").find("#health").html(characters["john-snow"].hitpoints);
    $("#daenyreus").find("#health").html(characters["daenyreus"].hitpoints);
    $("#cersei-lannister").find("#health").html(characters["cersei-lannister"].hitpoints);
    $("#the-night--king").find("#health").html(characters["the-night--king"].hitpoints);

   function pickChar(char){
      //gameOVer function
        if(!enemySelected){
            if(!playerSelected){
            // if the player has not been selected
            //  select the player and set playerSelected to true
            $("#playerSelection").html($(this).show('slow'));
            $("#playerSelection").children().addClass("playerChoice");
            $("#enemy-panel").append($("#characterChoice").html()).show('slow');
              
            $("#choose").html("now choose your oppenent");
                playerSelected = true;
             } else{
                //Move enemy here
                $("#oppenentChoice").html($(this).show("slow"));
                $("#oppenentChoice").children().addClass("enemy");
                
                enemySelected = true;
             }//drops enemy to oppenent section




              $("#attackBtn").on('click', function() {

                //-------------------------------------------button activating twice

                 characters[$(".playerChoice").attr('id')].hitpoints-=characters[$(".enemy").attr('id')].attack;
                 console.log(characters[$(".playerChoice").attr('id')].name +" " + characters[$(".playerChoice").attr('id')].hitpoints);
                 $("#results").html("the enemy attacked you for " + characters[$(".enemy").attr('id')].attack + " and " + ("you attacked the enemy for  " + characters[$(".playerChoice").attr('id')].attack));

                //------------------TROUBLE --------------updating health to html
                 //$(characters[(".playerChoice").attr('id')].find("#health").html(characters[(".playerChoice").attr('id')].hitpoints));

                 characters[$(".enemy").attr('id')].hitpoints-=characters[$(".playerChoice").attr('id')].attack;
                 console.log(characters[$(".enemy").attr('id')].name +" " + characters[$(".enemy").attr('id')].hitpoints);
                // $("#results").html("you attacked the enemy for  " + characters[$(".playerChoice").attr('id')].attack);


                 //-------------FIX attack multiplier
                 characters[$(".playerChoice").attr('id')].attack ++;
                 console.log("The player's attack is now  " + characters[$(".playerChoice").attr('id')].attack);

                    if(characters[$(".enemy").attr('id')].hitpoints <= 0){
                        $("#results").html("You Defeated  " + characters[$(".enemy").attr('id')].name   + " please  Choose  another  contender  to  the  iron  throne");
                        enemySelected=false;
                        pickChar();
                    } else if (characters[$(".playerChoice").attr('id')].hitpoints <= 0){
                        $("results").html(characters[$(".playerChoice").attr('id')].hitpoints.name + "is dead try again?")
                    }
                    


                 
               
            });//attack function

        }//closes if enemy selected statement
    
    }   //closes start game function (pickChar)


//game begins when player selects a character
$(".charDiv").click(pickChar);



});//end game bracket/close

