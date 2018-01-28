// IIFE, takes window as global object and jQuery as $
(function (global, $) {
    'use strict';
    
    // Create a new variable Greetr and assign with function constructor
    var Greetr = function (firstName, lastName, lang) {
        return new Greetr.init(firstName, lastName, lang);
    };
    
    // an array and objects that are hidden within 
    // the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es'],
        greetings = {
                        en: "Hello",
                        es: 'Hola'
                    },
        formalGreetings = {
                        en: "Greetings",
                        es: "Saludos"
                    },
        logMessages = {
                        en: "logged in",
                        es: "inició sesión"
                    };
    
    // prototype holds methods (to save memory space)
    Greetr.prototype = {
      
        // 'this' refers to the calling object at execution time
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        
        // Checks for a valid language (i.e. in the array, 'supportedLangs')
        validate: function(){
            if (supportedLangs.indexOf(this.lang) === -1 ){
                throw this.lang + ' is not supported.';
            }
        },
        
        greeting: function(){
            return greetings[this.lang] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function(){
            return formalGreetings[this.lang] + ' ' + this.fullName();
        },
        
        greet: function(formal){
            var msg;
            
            // any value passed as an argument sets a formal greeting
            // undefined or null sets a regular greeting
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            if (console){
                console.log(msg);
            }
            
            // make the method chainable
            return this;
        },
        
        setLang: function(newLang){
            this.lang = newLang;
            
            this.validate();
            
            // make the method chainable
            return this;
        },
        
        log: function(){
            if (console){
                console.log(logMessages[this.lang] + ': ' + this.fullName());
            }
            
            return this;   
        },
        
        // takes a jQuery selector and changes the heading
        announce: function(jQselector, formal){
            // check for jQuery and selector
            if (!$){
                throw 'Error: jQuery not loaded';
            }
            
            if (!jQselector){
                throw 'Error: jQuery selector missing';
            }
            
            // any value passed as an argument sets a formal greeting,
            // undefined or null sets a regular greeting
            var msg;
            
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            // select the element and change its contents
            $(jQselector).html(msg);
            
            // make chainable
            return this;
        }
        
    };
    
    // Set default values of the Greetr object
    Greetr.init = function (firstName, lastName, lang) {
        // set 'this' to self to avoid 'this' scoping bugs
        var self = this;
        
        self.firstName = firstName || "N/A";
        self.lastName = lastName || "N/A";
        self.lang = lang || "en";
        
        self.validate();
    };
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;
    
    // Set the global Greetr variable and alias 'G$'
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery)); // End IIFE wrapping the whole Greetr.js file