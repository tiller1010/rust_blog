created: 2023-10-03T08:36:50.8779139-04:00
tags: [rust]
description: "WordPress is a great platform to get started blogging with, but for me, it's more than what I really need. I don't need a database, I don't need a web server, and I don't need a CMS. At the end of the day, all I really need is static HTML, CSS, and JavaScript."

# Rebuilding a WordPress blog with rust

WordPress is a great platform to get started blogging with, but for me, it's more than what I really need. I don't need a database, I don't need a web server, and I don't need a CMS. At the end of the day, all I really need is static HTML, CSS, and JavaScript.

## Save some money
Premium Web hosting with Hostinger costs about $90 a year. That's money I could be saving by switching to free hosting with GitHub Pages.

## What about content management?
I'm a developer, so I'm comfortable with writing markdown. I decided to use a static site generator to convert my markdown files into HTML. I chose mdblog, a cargo crate I found on [crates.io](https://crates.io). This crate, however, had lacking support for Windows environments (still my daily driver), so I was required to fork it and make updates myself. This mostly involved adding checks for carriage returns in post files.

## Importing posts
I had to write a script to convert my WordPress posts into markdown files. I exported my posts from WordPress as an XML file. Then I wrote a script to parse the XML file and convert the posts into markdown files. I used the crate "html2md" to convert the HTML content from my posts into the markdown format, after which the script outputs markdown files for each post. I then use those markdown files to generate HTML files from the mdblog templates. The journey of my posts starts at the HTML embedded in the WordPress XML export file, to markdown files, back to formatted HTML files.

## Isn't that more work than necessary?
It is, but it doesn't come without benefits. I can now write my posts in markdown, and I can use git to track changes to my blog. My local text editor is a highly customized Neovim, which makes writing and editing posts much faster and more intuitive to me. This also comes with the added benefit of AI assisted writing, via GitHub Copilot.

## Outcome
Overall, I'm happy with how the new blog turned out. I did, unfortunately, have to sacrifice some features, such as the ability to edit with the WordPress mobile app and the ability for users to leave comments, but I think the trade-off was worth it (most comments were spam anyway). My hosting is now free, I do not need to worry about spam comment, and editing the blog posts is now easier than ever.

