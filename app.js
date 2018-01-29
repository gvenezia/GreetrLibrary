// Create and assign a new Greetr object
var g = G$("John", "Doe", 'es');

// Example output to html
g.announce('#greeting', true);

// Click event for language option.
// Recognizes me, Gaetano Venezia, as the user
$('#login').click(function(){
    // Declare a new Greetr object
    var loginGreetr = G$("Gaetano", "Venezia", "en"); 
    
    // hide the options
    $('#logindiv').hide();
    
    // set the language based on the option selected,
    // then set the header to the appropriate formal greeting
    // log the result
    loginGreetr.setLang($('#lang').val()).announce('#greeting', true).log();
});
