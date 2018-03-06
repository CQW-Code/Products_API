var currentProduct = {};
var showForm = false;
var editProduct;


//helper function 
function toggleForm() {
  showForm = !showForm;
  $('#product-form').remove();
  $('#products-list').toggle();
 
  
  if (showForm) {
  
    $.ajax({
     //url: 'product_form',
      url: "http://json-server.devpointlabs.com/api/v1/products",
      method: 'GET',
      data: {id: editProduct}
    }).done( function(html) {
      $('#toggle').after(html);
    });
  }
}

function getProduct(id) {
  $.ajax({
    //url: '/product/' + id,
    //url: url,
    url: "http://json-server.devpointlabs.com/api/v1/products" + id,
    method: 'GET'
  }).done( function(product) {
    if (editProduct)
    {
      var li = $("[data-id= '" + id + "']").parent()
      $(li).replaceWith(product)
      editProduct = null
    }
    else
    {
      $('#products-list').append(product);
    }
  });
}

$(document).on('click', '#delete-product', function() {
  var id = $(this).siblings('.product-item').data().id
  $.ajax({
    //url: '/products/' + id,
    //url: url,
    url: "http://json-server.devpointlabs.com/api/v1/products" + id, 
    type: 'DELETE'
  }).done( function() {
    var row = $("[data-id='" + id + "']")
    row.parent().remove('li');
  });
});

$(document).on('click', '#edit-product', function() {
  editProduct = $(this).siblings('.product-item').data().id
  toggleForm();
});

//submit handler
$(document).on('submit', '#product-form form', function(e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  //var url = '/products';
 var url = 'http://json-server.devpointlabs.com/api/v1/products';
  var method = 'POST';
  if (editProduct) {
    url = url + '/' + editProduct;
    method = 'PUT'
  };

  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products',    
    type: method,
    dataType: 'JSON',
    data: data
  }).done( function(product) {
    toggleForm();
    getProduct(product.id);
  }).fail( function(err) {
    alert(err.responseJSON.errors)
  });
});

//Toggle form click handler
$('#toggle').on('click', function() {
  toggleForm()
});



 //Product select click handler
  $(document).on('click', '.product-item', function() {
    currentProduct.id = this.dataset.id;
    currentProduct.name = this.dataset.name;
    $.ajax({
      //url: url,
      //url: '/products/' + currentProduct.id,
      url: 'http://json-server.devpointlabs.com/api/v1/products',
      type: 'GET',
      dataType: 'JSON'
    }).done( function() {
      $('http://json-server.devpointlabs.com/api/v1/products');
      //$('#product');
      
      });
    });