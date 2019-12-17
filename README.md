# Brute-Force-Grad-College-Rankings-Map

In this project, our team has created a map of U.S. graduate colleges with rankings for different graduate categories, using Leaflet, d3, JavaScript...

ETL: The geoJSON file that we pulled from Data.gov had many schools in it (7521 total) that do not offer graduate programs. To begin with, we pulled a csv version of the file into Excel and deleted all the schools related to cosmetology and beauty and community colleges, none of which are in our 12 Graduate Programs. One team member worked on this while another was scraping U.S. News for the rankings. Hoping to pull those files into SQL and do a join eventually.
7521
delete "beauty"  6919
delete "cosmetology" 6683
delete "community college" 6147
delete "massage" 6087
delete "welding" 6077
delete "mechanics 6076
delete "community and technical" 6052


Notes: does not have data we want: https://collegescorecard.ed.gov/data/