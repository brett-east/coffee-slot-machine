$(function(){ //document ready

  var notSpinning = true; //true when wheels aren't spinning, preventing multiple clicks on the spin button

  //spin function
  function spin(spinner, duration, delay) {
    var position = 6000 + (Math.floor(Math.random() * 3) * 200); //spins 10 times(6000 == 10 * 600px height) then picks a random end point
    $( spinner ).animate({ //animate to end point
      'background-position-y': position + 'px',
    }, {
      duration: duration,
      specialEasing: {
        'background-position-y': "easeOutBounce"
      },
      complete: function() {
        $( spinner ).css({ 'background-position-y' : (position%1000) + "px" }); //keep the spinner at the end point, and clear off the first 10 spins
      }
    });
    return (position%1000); //return a value for the final image
  };
  
  //make color function
  function makeColor(object, color) {
    $( object ).css({ 'color' : color });
  };

  //spin on click
  $( "#spin-button" ).on( 'click', function() {
    if (notSpinning) { //if the wheels aren't already spinning
      
      //reset the spinner
      notSpinning = false; //let us know the wheels are now spinning
      $('.results').html('<p>Spinning...</p>');
      makeColor('.fa-angle-double-right, .fa-angle-double-left', '#e5cfcf' );
      
      //new spin
      var msg, win,
      wheelVal1 = spin('.wheel1', 3000, 0), //spin wheel1 return end point
      wheelVal2 = spin('.wheel2', 3300, 200), //spin wheel2 return end point
      wheelVal3 = spin('.wheel3', 3600, 400); //spin wheel3 return end point
      if ((wheelVal1 === 0) && (wheelVal2 === 0) && (wheelVal3 === 200)) { //compare end points and store a message
        msg = 'Congratulations, you have won a coffee';
        win = true;
      } else if ((wheelVal1 === 200) && (wheelVal2 === 200) && (wheelVal3 === 400)) {
        msg = 'Congratulations, you have won an espresso';
        win = true;
      } else if ((wheelVal1 === 400) && (wheelVal2 === 400) && (wheelVal3 === 0)) {
        msg = 'Well done, you have won a cup of tea';
        win = true;
      } else {
        msg = 'Sorry you did not win, please try again';
        win = false;
      };
  
      displayMsg = function() { //display the message after the spinners have finished
          setTimeout(function(){ 
            $('.results').html('<p>' + msg + '</p>'); //add message
            notSpinning = true; //the wheels have stopped spinning, so we can spin again
            if (win) { makeColor('.fa-angle-double-right, .fa-angle-double-left', '#f84848' )}
          }, 3600);
      }(); //immediately invoke it

    } else { //end if statement
      $('.results').html('<p>The reels are already spinning</p>');
    }
    
  });

});