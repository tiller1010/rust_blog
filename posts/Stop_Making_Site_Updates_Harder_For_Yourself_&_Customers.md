created: 2020-09-15T00:41:41+00:00
tags: [web_development,business]
description: "Imagine if every time you needed to start your car, you first had to install the engine. No one would ask to borrow your car, but you would be reluctant to use it yourself. No one wants a mundane task to take anymore time and effort than is required. Simple problems should have simple solutions, and updates to our websites should be painless. A site that works on one machine, should work on any machine. A site that needs a single change in punctuation on a single page, should not require a developer."

# Stop Making Site Updates Harder For Yourself & Customers

Imagine if every time you needed to start your car, you first had to install the engine. No one would ask to borrow your car, but you would be reluctant to use it yourself. No one wants a mundane task to take anymore time and effort than is required. Simple problems should have simple solutions, and updates to our websites should be painless. A site that works on one machine, should work on any machine. A site that needs a single change in punctuation on a single page, should not require a developer.

## Use different environments

Development of a website often begins locally. The site is installed on the same computer the developer works with. When the site is finished, it is often staged in a development environment. The website is accessible from the internet, but it is not yet optimized for the public. When the site is ready to go live, it is installed again in a separate production environment. The site should function nearly identical in all three environments, but certain things should behave differently. In the case of an overlooked fatal error, we wouldn't want to show an end-user a long error trace; only the developer cares about that sort of thing. When entering payment information, we wouldn't want a real transaction to occur during development. Our site should behave differently in subtle ways, depending on our environment. Managing three different codebases for each environment would be highly inefficient and prone to errors. This is where environment variables come into play. With a single configuration file, we can control every setting that should differ in each instance of our site. The code should read the declared environment variables, and decide whether it should actually charge a debit card, or run a fake transaction in a test sandbox environment.

<img alt="" src="images/environment.jpg" height="328" width="493" />
<i>In windy environments, the turbines are more effective at producing power</i>

## Break stuff in isolation

Start coding on your local environment and break your program in any way you can. Experimentation on local environments should occur often to ensure a robust production environment. Implementing this workflow means that updates for a website are relatively painless for everyone. You and your customers will not have to sweat nervously when making changes that could range from small to dramatic. A developer can work comfortably in a local environment, free to break anything without consequence. Compare this to working on a production site blindly. Both parties risk facing devastating consequences while making changes live and on the fly.

<img alt="" src="images/solar-panel.jpg" height="326" width="492" />
<i>Also a source of power, solar panels are more appropriate in sunny environments</i>

## Use a CMS

Think about installing your car engine to drive again. If you are a mechanic, while this may feel tedious and time-consuming, you are confident in your ability to start the car. Now, imagine that the only parts of a car that you are familiar with are the brake pedal, gas pedal, and steering wheel. Starting that car is going to feel intimidating and daunting. You may just decide to walk that day.

Your customers do not want to install an engine just to drive. When it comes to their website, content should be updated easily, without any need to touch code. Thankfully, we have Content Management Systems to solve this problem. A developer will write code that will define page types and data objects. This data will make use of templates to be rendered in the layout of the site. From this point, content can be entered in a user-friendly, Graphical User Interface, and then published to the site. A great Content Management System, as well as my personal favorite, is SilverStripe. SilverStripe makes both the developers and customers' lives easier when bringing sites to life. SilverStripe is clean and comprehensible, both in its code and in its user interface. You can check out my tutorials on the SilverStripe CMS and Framework here [https://www.youtube.com/watch?v=XVOianFRSl0](https://www.youtube.com/watch?v=XVOianFRSl0)

![](images/silverstripe.png)Learn SilverStripe and save everyone some headache  

KISS is not only a hard rock band from the 1970s, but a clever acronym used by developers when avoiding complexity. Keep It Simple Stupid. You and your customers do not want risky changes to be made to a site running in production. Your customers want things to be as easy as pie. Give them a CMS that both of you will love. Just remember to keep it simple.

