created: 2020-03-08T17:30:08+00:00
tags: [cms]
description: "With today's modern day-to-day workflow, it is easy to feel spoiled with all of the handy tools at our disposal. Tools like Git allows us to rollback to any previous state of our applications, just in case something were to go horribly wrong. A Content Management System (CMS) allows us to easily update content, without ever touching the code. Package managers like NPM and Composer can provide our project with all of the dependencies it needs simply by running a command. But sometimes, these tools may not be available to you. You might remotely connected to a client's server, which can lack the software you would commonly use in your own environment. And developers are not always working on new code. A majority of time is spent working on existing code. Some of that code may feel severely antiquated from what we are used to."

# Tools I took for granted

With today's modern day-to-day workflow, it is easy to feel spoiled with all of the handy tools at our disposal. Tools like Git allows us to rollback to any previous state of our applications, just in case something were to go horribly wrong. A Content Management System (CMS) allows us to easily update content, without ever touching the code. Package managers like NPM and Composer can provide our project with all of the dependencies it needs simply by running a command. But sometimes, these tools may not be available to you. You might remotely connected to a client's server, which can lack the software you would commonly use in your own environment. And developers are not always working on new code. A majority of time is spent working on existing code. Some of that code may feel severely antiquated from what we are used to.

## Git 

Imagine starting on a new project without Git. Scary right? Git is an essential part of today's software development. However, you may find yourself working on an older project that does not use version control. To safely make changes, a developer would need to create a backup of every file that was changed. That way, if something does break, the developer and client are not left SOL. In this situation, when the changes are ready to go live, it is not as simple as just pulling down from a repository. If you find yourself in this situation, you will need to FTP every file you changed individually. All of this is a huge headache by today's standards. Not only are you at a much higher risk of creating irreversible damage, but you must keep track of each moving part manually.

## Content Management Systems

Content management systems make customizing the content on pages very simple. With a CMS you can upload content to your site without the need to touch any code. But what if you have a static site made up of several HTML files and no CMS? If you need to make a change to the base layout of your site (headers, main navigations, footers, etc...), that change will need to be made across several files. You could use a search and replace tool ([or a static site generator](./rebuilding_my_blog.html)) to make this all happen at once, but what if you have something like a "selected" class on navigation items? Each page will have the same navigation but with a unique selected class for the current page's navigation item. You can start to imagine the headache of editing nearly identical elements across several files. With most content management systems, this is all taken care of.

## Package Managers

With package managers, you can install all of the code your project needs by running a single command. Older projects may not be fortunate enough to include a file for the package managers that lists the dependencies to be installed. When working on a project like this, you may need to individually initialize and update git submodules (git is great for version control, but use your chose programming languages' most popular package manager please). What's worse is dealing with source code from a separate project, copy, pasted, and committed directly into a different project. In either of these situations, it can be unclear what packages your project requires, and the project will not receive the patches that would be pulled in from a package manager. With tools like Composer and NPM, these concerns are eliminated, so you can spend more time working on your project than resolving issues created from incompatible code.

## Let your tools do the work

Modern tools make our lives as developers much easier. However, we still find ourselves supporting older projects without these amenities. Working with these systems is far from impossible, but more caution and patience is often required.

