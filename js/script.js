$(document).ready(function() {

    $("#search-btn").click(function() {
        var pokemon = $("#search").val();
        $("#search").val("");
        $("#display-pokedex").empty();
        getPokemon(pokemon);

    });

    $("#search").keyup(function(invio) {
        if(invio.which == 13) {
            var pokemon = $("#search").val();
            $("#search").val("");
            $("#display-pokedex").empty(); 
            getPokemon(pokemon);
        }    
    });
});

function getPokemon(pokemon) {
    
    $.ajax(
        
        {
            "url": "https://pokeapi.co/api/v2/pokemon/" + pokemon,
            "method": "GET",
            "success": function(data) {
                results(data);
            },
            "error": function(err) {
                alert("Errore!");
            }
        }
    );

}

function results(data) {
    var source = $("#pokemon-template").html();
    var template = Handlebars.compile(source);

    var context = { 
        "name": data.name, 
        "id": data.id, 
        "height": data.height * 10, 
        "weight": data.weight / 10, 
        "image": data.sprites.front_default, 
        "types": data.types[0].type.name, 


    };

    var html = template(context);
    $("#display-pokedex").append(html);
}






