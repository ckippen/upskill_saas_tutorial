/* global $, Stripe, stripeResponseHandler */
// Document Ready Function
$(document).on('turbolinks:load', function (){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  // Stripe Public Key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // Prevent Default Submit
  submitBtn.click(function(event){
    event.preventDefault();
  // Collect Card Information
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('card_month').val(),
        expYear = $('card_year').val();
  // Send Card Information
    Stripe.createToken({
      number: ccNum, 
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
    
  });
  
  // Send Card Information
  // Handle Token As Hidden Field
  // Submit Form
  


})