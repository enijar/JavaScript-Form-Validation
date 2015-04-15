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
    var options = {} // See options section

    validator.validate(options);
});
```

### Options

`sync: true|false` Validate the form on submit.

`async: true|false` Validate the form on change, keyup and keydown.

`form: element` The form element to validate.

`errorMessage: html` The error message HTML that will be shown under each form input.

`errorMessages: element` The element to contain groups of error messages. This overwrites `errorMessage`.

`errorLimit: int` The number of errors that will be shown for each input. Leave this property out for maximum errors.

`errorsLimit: int` The number of errors to be shown in the errorMessages element. Leave this property out for maximum errors.

`rules: {inputID: rules}` The input ID and rules to validate the input's value against. See rules section for full list of rules.

#### Example

```js
var options = {
    sync: true,
    form: $('#signUpForm'),
    errorMessage: '<div class="error red">{message}</div>',
    rules: {
        age: 'required|number|max:2',
        name: 'required|text',
        email: 'required|email|max:255',
        terms: 'ticked'
    }
}
```

### Rules

