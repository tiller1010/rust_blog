created: 2024-01-07T13:50:29.8443461-05:00
tags: [web_development,language_learning,education,cms]
description: Building a language learning app for the web is a great way to reach a wide audience. Here are some things to keep in mind while developing a language-learning app on the web.

## A Growing E-Learning Market
Did you know that the e-learning market is expected to reach $325 billion by 2025? That’s a $72 billion increase from 2017. The e-learning industry is booming, and it’s not going to slow down anytime soon. Here are some things to keep in mind while developing a language-learning app on the web.

## Support browser translation
Some users may not be English speakers. It’s important to support browser translation so that users can translate the app into their native language. But on a language learning app, we certainly do not want all of the content to be translated. The content of specific elements should stay in the language it is supposed to represent. That is why you must use the `translate="no"` attribute and `"notranslate"` class on elements that should retain their original content.

If your app should validate user input (like in the form of a challenge), be sure to pass the correct answer into a hidden element. That way when the browser translates from English to a different language, the correct answer will be translated to the user's preferred language as well. This value must be formatted so that validation can be handled properly, more on this in the next section.

## Keep challenges lenient
When learning a new language, it’s important to keep the challenges lenient. You don't want a beginner to be discouraged by failing to include an [accent mark](https://www.npmjs.com/package/remove-accents) or for entering a common misspelling. If your language app is going to include interactive typing challenges, be sure to format the user's input, and validate it fairly.

Include a list of multiple correct inputs, and format the user's input to the simplest possible form. This means converting to lowercase, trimming white-space, and removing accents or special characters. The application should then validate this, starting with the simplest solution.

## Define your translations
In contrast to browser translations, you could also define your translations. This is a great way to ensure that the content of your app is translated correctly. Frameworks like SilverStripe may support modules like [Fluent](https://github.com/tractorcow-farm/silverstripe-fluent), in which translated content can be defined manually. The end user would then visit a sub-URL for each translated language, e.g. (example.com/es for the Spanish version of the app).

Taking this a step further, you may decide to use a translation API like [Google Translate](https://cloud.google.com/translate/docs/). This would allow you to translate content on the fly, and to support a wider range of languages. However, this would also require you to pay for the API and implement a caching strategy to avoid exceeding your quota. The [text-translator Rust Crate](https://crates.io/crates/text-translator) allows you to do this programmatically.

