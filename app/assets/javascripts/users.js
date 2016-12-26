/* global $, Stripe */

// Document Ready Function
$(document).on('turbolinks:load', function (){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  // Stripe Public Key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // Prevent Default Submit
  submitBtn.click(function(event){
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
  // Collect Card Information
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('card_month').val(),
        expYear = $('card_year').val();
  
     // Validate Card Number
     var error = false;
     
     if(!Stripe.card.validateCardNumber(ccNum)) {
       error = true;
       alert('The card number appears to be invalid');
     }
     
     // Validate CVC Number
     var error = false;
     
     if(!Stripe.card.validateCVC(cvcNum)) {
       error = true;
       alert('The CVC number appears to be invalid');
     }
     
     // Validate Expiration Date
     var error = false;
     
     if(!Stripe.card.validateExpiry(expMonth, expYear)) {
       error = true;
       alert('The expiration date appears to be invalid');
     }
     
     if (error) {
       submitBtn.prop('disabled', false).val("Sign Up");
       
     } else {
       // Send Card Information
       Stripe.createToken({
        number: ccNum, 
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
     }
    return false;
  });
  
  // Handle Token As Hidden Field
  function stripeResponseHandler(status, response) {
    // Token as Response
    var token = response.id;
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
  // Submit Form
  theForm.get(0).submit();
    
  }
})