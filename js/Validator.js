/**
 * Form validation class. With rules syntax inspired
 * by Laravel's form validation in PHP.
 *
 * @author jamescraig@finervision.com
 * @updated 14/04/2015
 */
var Validator = function() {

    var $this = this;

    var $rules = {
        required: function(input) {
            return !(typeof input === 'undefined' || typeof input === 'null' || input === '');
        },
        ticked: function(selector) {
            return selector.prop('checked');
        },
        text: function(input) {
            return !!/^[a-z\s?('")]+$/gi.test(input);
        },
        date: function(input) {
            return !!/^[0-9{2}]+(\/|-|\s)?[0-9{2}]+(\/|-|\s)?[0-9{2,4}]+$/.test(input);
        },
        email: function(input) {
            return !!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(input);
        },
        number: function(input) {
            return !!/^[0-9\s]+$/.test(input);
        },
        min: function(input, value) {
            return input.length >= parseInt(value);
        },
        max: function(input, value) {
            return input.length <= parseInt(value);
        }
    };

    var $options = {
        errorMessage: '<div class="error">{message}</div>',
        errorMessages: false,
        hasErrors: false,
        errors: {},
        messages: {
            required: '{name} field is required.',
            ticked: '{name} field must be ticked.',
            text: '{name} field can only contain letters, spaces, numbers and apostrophes.',
            date: '{name} field must follow this format: day/month/year.',
            email: '{name} field must be a valid email address.',
            number: '{name} field can only contain numbers and spaces',
            min: '{name} field must be {value} or more characters.',
            max: '{name} field must be {value} or less characters.',
            list: '{name} filed must follow this format: item1,item2,item3'
        },
        async: false,
        sync: true
    };

    $this.validate = function(options) {
        $options['errorClass'] = (new Date()).getTime() + '-' + Math.floor(Math.random() * 9999) + 1;

        for(var index in options) {
            $options[index] = options[index];
        }

        if($options.rules === undefined) {
            console.error('No rules set. At least one rule must be set in the Validator class.');
            return false;
        }

        events();
    };

    var testRules = function() {
        $options.hasErrors = false;

        for(var input in $options.rules) {
            if($options.rules.hasOwnProperty(input)) {
                var rules = $options.rules[input].split('|');

                for(var index in rules) {
                    testRule(input, rules[index]);
                }
            }
        }

        if($options.onSubmit !== undefined) {
            $options.onSubmit({
                event: event,
                passes: !$options.hasErrors
            });
        } else {
            if(!$options.hasErrors) {
                $(this).removeClass('has-errors');
                $(this).submit();
            } else {
                $(this).addClass('has-errors');
                event.preventDefault();
            }

            showErrors($options.errors);
        }
    };

    var testRule = function(input, rule) {
        var selector = $('#' + input);
        rule = rule.split(':');
        var value = selector.val();
        var passed = true;

        if(rule[0] === 'ticked') {
            passed = $rules[rule[0]](selector);
        } else if(rule.length > 1) {
            passed = $rules[rule[0]](value, rule[1]);
        } else {
            passed = $rules[rule[0]](value);
        }

        if(!passed) {
            if($options.errors[input] === undefined) {
                $options.errors[input] = [];
            }

            var message = $options.messages[rule[0]].replace(/\{name\}/, input);
            message = message.replace(/\{value\}/, rule[1]);

            $options.errors[input].push({
                selector: selector,
                message: message
            });

            $options.hasErrors = true;
        }

        return passed;
    };

    var showErrors = function(errors) {
        $($options.errorClass).remove();

        $.each(errors, function(name, object) {
            $.each(object, function(index, error) {
                var message = $options.errorMessage.replace(/\{message\}/i, error.message);

                if(!$options.errorMessages) {
                    error.selector.parent().append(message);
                } else {
                    $options.errorMessages.append(message);
                }
            });
        });

        $options.errors = {};
        $options.hasErrors = false;
    };

    var events = function() {
        $options.form.on('submit', testRules);

        //object.form.find('input, textarea, select').on('keyup keydown change', function(event) {
        //    if($validate.async) {
        //        var input = $(this).attr('id');
        //        var inputRules = object.rules[input].split('|');
        //
        //        $.each(inputRules, function(index, inputRule) {
        //            testRule(input, inputRule);
        //        });
        //
        //        if(!$hasErrors) {
        //            object.form.removeClass('has-errors');
        //        } else {
        //            object.form.addClass('has-errors');
        //        }
        //
        //        showErrors($errors);
        //    }
        //});
    };

};
