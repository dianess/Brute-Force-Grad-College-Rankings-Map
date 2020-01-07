##Graduate College Rankings Map

In this project, our team has created maps of the U.S. graduate colleges in the top-20 rankings for different graduate programs. We used Python for webscraping, SQL to combine data from different sources, Leaflet and Mapbox for our maps, geoJSON to plot on the maps, HTML, CSS, and JavaScript to create interactive web pages.

***ETL***
The geoJSON file that we pulled from Data.gov had many schools in it (7521 total) that do not offer graduate programs. To begin with, we pulled a csv version of the file into Excel and deleted all the schools related to cosmetology, beauty, massage, welding, mechanics, hairstyling, cosmetics, barber, spa, cosmetics, golf, community colleges, etc. none of which are in our Graduate Programs. 

Our other source of data had to be scraped from the U.S. News & World Report website. We used Python to scrape the data for the top 20 universities in several different graduate program categories.

After some cleaning of data to make sure the univerity names from each source matched each other, we used SQL (PGAdmin) to join our data files so that we had the latitude and longitude data needed for plotting on maps plus the degree and ranking data we needed for our display. Additional steps to improve the data were required in order to make sure that all ties in the last ranking were included in the data set (For example, the scrape stopped at the 20th university and any universities that were tied with that one had to be verified and pulled by hand.)
***end ETL***

We created 3 different pages that are launched from a landing page. Those include the top 20 universities for 9 different graduate programs, the top 20 universities for 6 subcategories of science graduate programs, and a view that shows each of a university's ranked graduate programs.

For the first 2 pages: 9 grad programs and 6 science subcategories, when the user lands on the page, all the universities for all those programs appear on the map. In the upper right corner, a user can hover over a control box, unclick "All" and choose one or several specific programs that they would like to see data mapped for. The control layer lists the name of the program along with the icon associated with that program on the map. If the user clicks on an icon, a pop-up box shows the degree program, the name of the university, and it's ranking for that degree program.

On the page containing every ranked program for each university, the data includes both the 9 graduate programs and the 6 science subcategories. On landing on the page, the user will initially see yellow and green circles and some blue markers. A blue marker indicates one grad program. When clicked on, a pop-up box shows the name of the university, the degree program, and it's ranking. Green circles contain number of less than 10 and yellow circles contain number greater than or equal to 10. When a user clicks on a circle, it will either show several different universities in that region of the map and/or will show the number of ranked degree programs at a single university. If several universities are contained indicated by the circle, then when the user clicks on the circle, other circles and/or markers will spread out and be visible.




