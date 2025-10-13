To whom it may concern,

My name is Charlotte Worthey. I use she/her/hers pronouns, and I'm based in Westminster, Colorado.

I am a Software Engineer and Data Engineer with 17 years of software development excellence and multiple top-selling video game title credits.

Many of my largest projects are quite hush-hush and I cannot talk about them in great detail. However, there are plenty of things on my portfolio that showcase my particular talents. Some of my latest personal projects are here on this page.

They're mainly for a technical audience.

Please enjoy.

*~ Charlotte*

## Worthey Studios, 2024-2025

![Screenshot of the Worthey Studios website.](screenshot-website.png)

![Screenshot of the Worthey Studios website portal.](screenshot-website-portal.png)

Worthey Studios is my private teaching initiative for software development. Here is where I place many of my hopes and dreams outside of the usual working hours.

Thanks to the internet, knowledge has never been more accessible to those that have the motivation to obtain it. However, learning in a vacuum without feedback can lead to problems: reinforcement of maladjusted practices, over-reliance on products that have known limitations, and lack of team experiences.

Over-reliance on University degrees and certification programs also lead to problems: students are often disconnected from the reality that self-learning is an important part of the job, the cost is arguably too high for a field with unstable career prospects, and the student–teacher ratio is unfavorable for the students.

I see a need for an affordable education tier that cuts through the middle of these two extremes, where the portfolios the students create speak for themselves, leading to skill-based career opportunities. The class sizes are 3-5. I recognize that learning comes from experience, and I seek to foster an experience that reflects the working world as closely as possible while supporting individual student needs. I feel that for the right students, this approach will be a better fit than a bootcamp.

Worthey Studios, in summary, is the educational opportunity I wish I had.

### Key Components

*Virtual Lessons:* Affordable project-based Zoom calls for groups of 3-5 students.

*Website Front-end:* A public-facing website front-end, built with Vite, React, and TypeScript.

*Website Back-end:* A back-end for form submission built with Azure Functions, costing just a few cents per month to keep online.

*Alerting:* Tests front-end and back-end on prod endpoints daily, with failure alerting that texts and emails the admin (me). Failure in the alerting system itself has also been accounted for.

*CI/CD:* Automated build and deployment with GitHub actions.

*Student Portal:* The beginnings of a stylishly minimal student portal that, with luck, will become a stand-alone open-source project in the future explicitly for teachers that are cool. Modeled after a BIOS interface from the early days of IBM.

*Neko and Party-Mode:* Fun and unique graphical flourishes on the website. The first flourish is Neko, a cat sprite that follows the cursor. The other flourish is party-mode, a toggle that makes the website dance with color.

*Learning Materials:* Library of growing learning materials, challenges, and projects to hand to students as needed.

*Marketing Materials:* Fliers, business cards for the purposes of marketing.

### Learning #1 - Finding my Audience

Adults that wish to enhance their software skills are responding to fliers much more frequently than those in the 13-18 age range.

My current understanding is that students in public and private schools have access to computer science curriculum and prefer to solely rely on it. Still, I may be able to provide supplementary support for students that showcase special interest in computer science subjects or for those in alternative education settings, provided I can find a way to reach them.

Meanwhile, the adult students I have had are commonly motivated by personal growth which is wonderful to see.

### Learning #2 - Accessibility Issues

Web technology in general is behind on accessibility, and this project has been quite eye-opening to me in that regard. I used NVDA, a popular screen-reader, to explore various websites while wearing a physical blindfold. I was astonished at how badly implemented many websites were. Even certain websites from technology giants like Microsoft that have dedicated accessibility personnel had accessibility gaps that were glaring.

After following W3C guidelines and educating myself on WAI-ARIA for my project, I found that the tools simply were not powerful enough to deliver proper accessibility for my app as I had originally intended.

For one, I could not interface with the screen reader directly which was needed for the student portal. I had to use invisible divs containing text to explain the portal usage rather than create an immersive [read–eval–print loop (REPL)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) for the screen-reader.

Secondly, mobile screen-readers rely on undocumented and inconsistent paradigms that render them useless to target for the most part.

The take-away here is that accessibility on the web is due for a rethink. I will be keeping an eye on developments in this space.

### Learning #3 - Advancements in Web Dev
Accessibility problems aside, HTML5+CSS are powerful these days! This is my first project that made extensive use of CSS flex layouts, and I must say that the days of relying on CodePen styling tricks and frameworks like Bootstrap are done for me.

Vite is also very nice to have! I remember the pain of monkeying around with so many tools like webpack, Babel, tsc, etc. Vite seems to make all the choices I would have made when setting up a project for the first time. I've encountered very little friction while using it so far and will keep using it until further notice.

### Learning #4 - I Found React's Limit

Although Vite + React + TypeScript provided a comfortable development experience for most of the workings of the website, React got in my way when I was making the student portal. Granted, the student portal is an unusual web project.

The student portal in its current state consists of a declaratively-configured form-filler application (no sign-in) that features custom controls. It was mainly inspired by Jupyter notebooks and is intended to serve as a framework for interactive lessons in the future.

To make things work, the application needed to be implemented with a graph data structure that preserved relationships between form fields as the state was propagated between them. This is where the trouble began.

The immutable nature of React states clashed with the relationship-oriented graph approach. The relationships themselves did not need to update, but I had to include them in the react state to avoid a bunch of dictionary look-ups. This made me sad and made me not want to use React anymore for this project.

### Learning #5 - Dynamic Portal Content

The scheduler in the student portal is pretty much hacked in at the moment. When I come back and do it properly, it will require querying the backend for available times which will mean blocking the user from proceeding until the query has returned. Because of these runtime updates, it occurred to me that perhaps the portal itself should be scriptable/imperatively defined, rather than purely declarative. However, this opens a whole other can of worms that I'm not quite ready to tackle yet.

### Learning #6 - Nice State-Machine!

The neko that follows the cursor on the website is now my reference implementation for state-machines because it was done so cleanly. Seriously! Take a look! [See the code here](https://github.com/chworthey/cs-studio-site/blob/main/src/neko/types/Neko.ts).

### Learning #7 - Students Use AI Too Much

AI tools used to write code are an unfortunate learning distraction at this time for my students. Those that learn with AI generate unprecedented levels of [technical debt](https://en.wikipedia.org/wiki/Technical_debt). While it may seem that AI-users get impressive things done on the surface, it's at the expense of future software endeavors because of the sheer volume of black-box code that they will one day need to update, and without the expertise to do so. What I took away from this is that students need to work on dedicated long-term projects so that their AI-usage eventually becomes their own worst enemy.

### Learning #8 - Cloud Outages Worry Me

Azure has allowed me to keep the costs way down and has had reasonable performance, which has been great. However, Azure technical support for personal-tier users is struggling right now and is far from the enterprise-tier support I'm used to.

My site was rendered un-operable for days at a time twice this year, breaking SLA's. One of those times made the news and took down airlines and things like that. The other seemed to only affect my specific app, and I had to recreate the app because it was unrecoverable from my end, and I could not get human support. Sure, I got "AI" support, but it wasted a couple days of my time and has me drawing up a contingency plan at the moment.

Because of these outages, reliable alerting infrastructure is a must-have. I was thankful I had spent time on it.

### Project Links

- [Website Home](https://chworthey.net/)
- [Website Portal](https://chworthey.net/portal)
- [Front-end Code](https://github.com/chworthey/cs-studio-site)
- [A sample starter project for my current students setting out to learn C++ (I'm teaching them C first, but I'm also introducing them to CMake so they can use their own tools)](https://github.com/worthey-studios-students/starter-c89-90-cmake)

## Tofu Engine, 2025

![A screenshot of Tofu Engine running with a monkey test model on the screen.](screenshot-monkey.jpeg)

![A screenshot of the Tofu Engine build output.](screenshot-build-output.png)

Tofu Engine is a minimal game engine framework that is designed to teach 2D and 3D C++ game development. It is a passion-project built by my partner January (he works on satellites!) and myself. Currently it is closed-source but will be open-sourced once we are ready to share.

Tofu has many inspirations:
- *Dark Basic:* My first exposure to game development at age 13, featuring a stylish IDE, and enough F1 help documentation to really get you going on your first project.
- *The Games Factory 2:* January's first exposure to game development. He made a bullet-hell game in it when he was 10.
- *XNA Framework:* A C# framework made by Microsoft Gaming that wrapped DirectX on the Xbox 360, Windows, Zune, and Windows Phone. It was used to publish indie games on the Xbox 360.
- *Unreal Engine 4-5:* Used all over the games industry and is the industry standard starter-engine for AAA projects. We really like the materials tooling and rendering tech, and we love that it allows devs to use C++ and modify the engine code. However, it is quite heavy and uses its own build tool and macro system and visual scripting system. We think these are distractions when it comes to learning game development.
- *Unity:* Also used all over the games industry, Unity is a nice tool to work with, especially for mobile games and indie projects. However, unless you are partners with the company, you do not get access to the C++ side of the tool and must rely on C# scripting. We think that staying with Unity cuts you off from growing beyond its current and future limitations.
- *Godot:* An open-source favorite that we look up to. We love it but have found so many show-stopping glitches when we put it to the test. The scripting language is interesting, but we have a preference for working and learning from a C++-oriented place.
- *OpenGL and DirectX (before DX12):* Where our heart is. Tofu may be a vulkan-based project, but we love the balance of simplicity and power of OpenGL and older DirectX versions. Tofu tries to give you that same power, while providing a gentler on-ramp with the tooling.

### Key Components

*Content Fryer:* A tool that cooks the content for the game (models, textures, etc.) that needs to be cooked. It is invoked with every build and leaves a series of compressed binary files that can be loaded during the game's runtime. The textures are cooked using the [KTX format](https://www.khronos.org/ktx/) to support GPU compressed textures. Everything else is a home-brewed binary format. We currently only accept PNG textures, FBX files, and JSON configuration as inputs. Outputs are placed in a ".tofu" folder at the root of the project.

*Asynchronous Engine API:* The engine API has a multi-threading strategy that is agreeable. We let users into the Tofu world at key points during the app's lifecycle and let users own the asynchronous file I/O. It's powerful enough to allow for Tetris to be played during your game's loading screen, or for Skyrim tiles to be streamed in and out at will during gameplay.

*Vulkan usage:* We use Vulkan and currently support Windows, Mac, and Linux platforms with it. Vulkan is great when used responsibly. Admittedly, we're still learning how to use it responsibly.

*Material system:* Our first engine system that ties together shaders that can be applied to several objects. It's still being developed. We currently compile GLSL to SPIR-V as part of our build tools to enable it, but the uniforms are still hard-coded at the moment.

*Matrix math:* We don't pull any punches when it comes to the math. We are allowing users to set the model, view, and projection matrices and work with vectors. The API is almost identical to glm.

*Humor:* We drop jokes everywhere in the codebase as an expression of our design philosophy. We think it makes learning more fun. Also, we're right.

*Logger:* January's pride and joy. It's a thread-safe logger that logs messages with debug, info, warning, and error levels. It logs to the output as well as a time-stamped file and is quite convenient to use!

*Planned components:* Sprite + font drawing, audio, dynamic meshes, render pass configuration, content fryer GUI, performance metrics, 3d textures and cube textures, mobile support, physics, PBR materials, compute shaders, and possibly light-baking.

### Sample Files
- [main.cpp](main.cpp): Example usage of engine that makes extensive use of futures and responsibly-placed early returns. Work in progress.
- [tofu.json](tofu.json): Example project configuration that defines content. Work in progress.

### Learning #1 - Dynamic Buffer Allocation and Descriptor Sets are Hard

We knew going into this project that using Vulkan would be an exercise of patience. But what we didn't know is that it would cause scope-creep when it came to all of the objects required to bind a material to an object. We started with the Content Fryer because we knew we needed a way to efficiently load data at runtime. But the content fryer began to create some boots that the engine, in its infancy, could not yet fill. And as we continued, it began to dawn on us that the renderer, which existed as one file, needed to become like 20 files.

We needed to include VMA (VulkanMemoryAllocator) to allocate the buffers properly. We also needed to build a working resource cache, and create a graphics pipeline state that made sense for all conceivable uses of the engine. We started looking at uniforms and questioned if we needed shader code-gen or not. We talked about including lighting by default. And a lot of that is still up in the air, but starting to settle.

### Learning #2 - KTX is Good, but it's also not Battle-Hardened

KTX seemed like a nice solution for us because it allows us to use GPU compressed textures in several different formats like [BC7](https://learn.microsoft.com/en-us/windows/win32/direct3d11/bc7-format), and it stores nicely on-disk as well which is FANCY. However, the tools as they are written gave me issues. I had to rip tons of code out of a console application to integrate it into the Content Fryer, and the performance was poor. I profiled it, and it turned out that there was a custom vector implementation that was destructing element by element rather than as a block. Fixing this led to an x16 speed-up.

I imagine that the golden path for using KTX is through glTF tools, and I deemed that it was trivial to provide all the other essential features of glTF with the content fryer tooling. I'm glad I went through with this because all of the configuration is now in one place and is consistent.

### Learning #3 - We Have an Image Library Entropy Problem

For images, it used to be that you would grab a library like FreeImage, ImageMagick, or something like that. But now those projects are so old they're showing signs of decay. You go to strange places like SourceForge to get them, and sometimes their builds don't have reasonable dependencies by today's standards.

It occurred to me, when is the last time somebody needed to download an image library from the source? Most companies that have C++ projects rely on these libraries, but they were cached in third party dependency folders often more than 10 years ago. Most developers are probably interfacing with photos through previously existing browsers, game engines, high level programming language libraries, and things of the sort. But all of them come back to this code that is rusting at the foundations of everything, code that we have so nearly forgotten about.

In the end, I loaded images through KTX which made the decisions for me. Still, the image library entropy problem is strange to see. We should keep an eye on it.

## More Projects

So far, I have discussed my more recent projects at length. But these are only the latest ones in a sea of [mostly private] lifetime projects.

Here are some more to check out:
- [My first Unity project in 2020, made over a week's time](https://github.com/chworthey/JewelThief). It's proof of how quickly I can pick up new tech because I know my fundamentals well.
- [A 2021 exploration of big data tools Hadoop HDFS, Hive, SQL](https://github.com/chworthey/hdfs-hive-sql-playground), and an [incomplete exploration of astronomy data using PySpark](https://github.com/chworthey/astro/blob/main/workspace/AstroM33.ipynb). This is data engineering stuff.
- [A 2024 documentation demo built on MKDocs for the makerspace located within the Littleton Bemis Public Library](https://gray-stone-085c4c510.5.azurestaticapps.net/Tutorials/tutorial-audio-recording/). I would love to see a makerspace use a format like this some day.
- [A 2020 sound library with a Python interface](https://github.com/chworthey/synther-examples/blob/master/notebooks/general_usage.ipynb). I would be surprised if it still runs.
- [A 2018 Unreal Project that is deeply embarrassing to me](https://youtu.be/pOASPVQvPN8). We shipped it on Google Play a few months after this demo, but it's no longer up. I did the camera animation, drunk-vision, materials, and physics.

Feel free to check out [my GitHub](https://github.com/chworthey) if you need even more projects.

## Last Project: Party-Mode Extension for VSCode, 2024

![A Gif of VSCode party-mode extension](party-mode.gif)

Code provided upon request.
