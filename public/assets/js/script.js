$(function() {
  $("#submit").on("click", function(event) {
      event.preventDefault();

      let newBurger = {
          burger_name: $("#burger_name").val(),
          devoured: $("[name=devoured]:checked").val().trim()
      };

      $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
      }).then(function() {
          console.log("Created a new burger");
          location.reload();
      });
  });

  $(".change-devoured").on("click", function(event) { 
      let id = $(this).data("id");
      let isDevoured = ($(this).data("devoured") == true) ? false : true;
      
      let updateBurger = {
          devoured: isDevoured
      };

      $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: updateBurger
      }).then(function() {
          console.log("The status of this burger has been updated");
          location.reload();
      });
  });
});