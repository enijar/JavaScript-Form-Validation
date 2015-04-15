# JavaScript-Form-Validation
Laravel inspired form validation in JavaScript. Simple to use API.

```js
$(function() {
    var signUpForm = new Validator;

    signUpForm.validate({
        sync: true,
        form: $('#signUpForm'),
        errorMessage: '<div class="error red">{message}</div>',
        rules: {
            age: 'required|number|max:2',
            name: 'required|text',
            email: 'required|email|max:255',
            terms: 'ticked'
        }
    });
});
```