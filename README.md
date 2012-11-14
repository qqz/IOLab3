###Project title
InstaGiantsParade

###Team member names
Arthur Che  
Michael Hintze  
Qianqian Zhao

###Team member responsibilities
Arthur - worked on Instagram data query, timeline slider, some CSS  
Michael - parsed out Instagram API, page layout and CSS, gallery  
Qianqian - set up database, SQL queries, PHP file

###Project description
InstaGiantsParade allows you to re-live the San Francisco Giants championship parade through the lens of Instagram photos. It shows photos uploaded on the day of the parade, and allows you to look at them based on 30-minute intervals of when they were uploaded. We also have a tag aggregator to see the most popular tags within a given interval. Clicking on an individual photo creates a modal to view a bigger version of the picture, along with the picture's tags. 

###Our approach
We met as a group to decide on a topic and the data we'd like to use. Collectively, we worked on pulling image info from the Instagram API. We stored info for about 9000 photos in a MySQL database to play with. From there, we iterated on various ways we could display photos and their information, and decided on browsing the parade photos by time.

###Technologies used on the project
HTML5  
CSS3  
jQuery  
jQueryUI  
Instagram API  
MySQL  
PHP  

###URL of the repository on github
https://github.com/qqz/IOLab3

###Live URL of where it's hosted
http://chancezhao.com/iolab3

###Browser support
Chrome  
Safari  
Firefox  
IE 7  

###Bugs/quirks we're aware of
-Performance isn't quite as good as we'd like. We've restricted it to loading 200 images per time interval, though we have more available. Ideally, we would have wanted to load more if we could find a way to increase performance.
-There's a split second of grey screen when you click on a new time on the slider. We're having trouble with the timeline bar staying in place, but it moves back correctly after that split second. Tried to de-bug this but couldn't quite get to the bottom of it.
-Small quirk with our modal loading icon - it works for the first image, then doesn't work for subsequent ones.