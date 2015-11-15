# qnub:t9n

Fork of <https://raw.githubusercontent.com/softwarerero/meteor-accounts-t9n/master/t9n.coffee> not depended from accounts. Without `coffeescript` and `blaze` dependency. Converted to native JavaScript.

I just like the simplicity of idea 👍.

## Usage

To add translation:

    es = {
      meteor: "meteoro"
    };

    T9n.map("es", es);

## API

###  Set a current language for translations:

`T9n.setLanguage("es");`

### Get a translation in Javascript:

`t9n(<code>)`

Examples:

* `t9n('name');`
* `t9n('store.purchase');`
* `t9n('error.accounts.User not found');`

If a translation is not found the key is displayed. To spot not translated keys a prefix and a postfix can surround the key, they default to ">" and "<" so a you would see ">nonExistantKey<". You can change the pre- and postfix:

`T9n.missingPrefix = ">";`
`T9n.missingPostfix = "<";`

If you use `get` you can also print the prefix and postfix if you set the second parameter to `true` (it defaults to `false`).

`t9n(<code>, true);`

### Get a localized text with parameters

Optionally named parameters can be used, naming them allows for repetition.

`t9n(<code>, <mark_missinf_flag>, args);`

Example:

  If you define a string in your language file like

    'sentence': '@{subject} @{predicate} @{adverb} @{object}. Frische @{object} @{predicate} @{subject}.'

  and have an object like

    args = {
      subject: "Fischer's Fritz"
      predicate: 'fischt'
      object: 'Fische'
      adverb: 'frische'
    };

  you could call

    t9n('sentence', true, args);

  and that should give you

    'Fischer's Fritz fischt frische Fische. Frische Fische fischt Fischer's Fritz.'

  You must specify the second argument for prefix/postfix too, I am sorry.

### Force language

You can get translated text for any existed translation by seting 4th argument to laguage code:

`t9n(<code>, <true>, <args>, lang);`

Example:

    t9n('Site_description', false, {}, 'ru');

Will output translation string for 'Site_description' in `ru` language.

### Define translations

`T9n.map(language, yourMap);`

Example:

    T9n.map('en', {
      hello: 'world',
      store: {
        purchase: 'buy now',
        basket: 'basket'
      }
    });

# License

MIT
