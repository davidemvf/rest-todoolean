function init() {
    console.log("Hello World");
}

$(document).ready(init);

function getItems() {
  $.ajax({
    url: "http://157.230.17.132:3007/todos",
    method: "GET",
    data: ["text", "id"],
    success: function (data){
      console.log(data)

      printItem(data);
    },
    error: function() {
      alert("Errore")
    }
  })
};
  getItems();

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

  $(document).on("click", "#add-item", addItem);

  // $("#add-item").click(addItem);

  function addItem() {
    var text = $("#text-item").val();

    $.ajax({
      url: "http://157.230.17.132:3007/todos/",
      method: "POST",
      data: {text: text},
      success: function(data){
        $(".items").html("");
        // printItem(data);
        getItems();
      }
    })

  };

  function printItem (items) {
    var source   = document.getElementById("item-template").innerHTML;
    var template = Handlebars.compile(source);

    for (var i=0; i<items.length; i++) {
      var item = items[i];
      var context = {text: item.text, id: item.id};
      var html    = template(context);

      $(".items").append(html);
    }
  };
