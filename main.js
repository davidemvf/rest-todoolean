function init() {
    console.log("Hello World");
}

$.ajax({
  url: "http://157.230.17.132:3007/todos",
  method: "GET",
  data: ["text", "id"],
  success: function (data){
    console.log(data)
    // var list = data.results;
    var source   = document.getElementById("item-template").innerHTML;
    var template = Handlebars.compile(source);

    for (var i=0; i<data.length; i++) {
      var item = data[i];
      var context = {text: item.text, id: item.id};
      var html    = template(context);

      $(".container").append(html);
    }
  },
  error: function() {
    alert("Errore")
  }
})

 $(document).on("click", ".esc", deleteItem);

 function deleteItem() {
   var this_element = $(this);
   var elementToDel = this_element.parent();
   var id_element = elementToDel.data("id");

   $.ajax({
     url: "http://157.230.17.132:3007/todos/" + id_element,
     method: "DELETE",
     success: function () {
       console.log("Cancellato item" + id_element);
       elementToDel.remove();
     }

   })
 }

$(document).ready(init);
