$(document).on('turbolinks:load', function() {
  Stripe.setPublishableKey('pk_test_1MOwiEpXVwaxx19joVSZgUXj');

  var $form = $('#payment-form');

  $form.submit(function(event){
    $form.find('.submit').prop('disabled', true);


    Stripe.card.createToken($form, stripeResponseHandler);


    return false;
  });
});

function stripeResponseHandler(status, response){

  var $form = $('#payment-form');

  if(response.error){

    $form.find('.payment-errors').text(response.error.message);
    $form.find('.submit').prop('disabled', false);
  } else {

    var token = response.id;

    $form.append($('<input type="hidden" name="stripeToken">').val(token));
    $form.append($('<input type="hidden" name="card_brand">').val(response.card.brand));
    $form.append($('<input type="hidden" name="card_exp_month">').val(response.exp_month));
    $form.append($('<input type="hidden" name="card_exp_year">').val(response.exp_year));

    $form.get(0).submit();
  }
}
