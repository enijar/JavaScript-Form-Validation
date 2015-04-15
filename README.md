# JavaScript-Form-Validation
Laravel inspired form validation in JavaScript. Simple to use API.

### Includes

Include jQuery and the form validator at the bottom of your HTML file.

```html
<script src="js/vendor/jquery.min.js"></script>
<script src="js/Validator.js"></script>
```

### Validator

Add the validator to the bottom of your HTML body.

```js
$(function() {
    var validator = new Validator;

    validator.validate({
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