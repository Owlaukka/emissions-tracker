# Emissions Tracker

The app gets CO2 emission data from the World Bank API and displays it in a web-based UI. An API is also provided that serves JSON data.

It should be noted that the World Bank API provides data that contains both the countries' emissions as well as different regions' emissions in one file. These larger regions (like the EU or the world) have been filtered out from the data that the API outputs. Non-existent data has also been filtered out. This, however, leads to some countries not having very many entries in the app. The World Bank data is also not very up-to-date. It only goes up to 2014 atm. Naturally the app will fetch new data periodically so if the particular API that was used starts sending newer data, that will be used in the app instead.

## Usage
### UI
The app is accesible on [heroku](https://polar-fortress-43062.herokuapp.com/). The app is roughly speaking separated into two parts: absolute emissions and per capita emissions. The top toolbar can be used to navigate between these two categories in terms of all countries. A year can be selected either by using the select text-field or with the slider below it. Specific countries can be searched with a search field above the country column in the table. Clicking on a row in the table leads to that country's page where the evolution of its emissions can be seen nicely.
### API
As mentioned, this app also provides an API. It has the following endpoints:
- `/api/emissions/countries/all/absolute`
- `/api/emissions/countries/all/per_capita`
- `/api/emissions/countries/:countrycode/absolute/range/:start-:end`
- `/api/emissions/countries/:countrycode/per_capita/range/:start-:end`

The API provides JSON data that has been filtered and formatted to be more convenient for use. It does not include everything that the World Bank API provides like regional emissions (i.e. for EU or North America), and non-existent emission entries. Meaning entries that have a non-existent emission value have been filtered out.

## Structure of the app
### The backend
The backend is an Express server that provides the API as well as serves the client-side static files. Since an API was requested, it made sense to have this UI also use this API for data as well.

Since the World Bank data is provided as a ZIP-file (using the links provided in the assignment description) it takes a bit of time to have it unzipped. Therefore I decided to have the data streamed from the WB API through an unzipper, an XML-toJSON convertor and a filter (to format it a bit) into a JSON-file. Two different API calls to the WB API are used; one to get the emissions and another to get the population data. Three JSON files are generated on the app server: one for all the absolute emission data for all countries and all available year, another for similar population data, and a final one that contains per capita emission data based on the two other files. These files are downloaded/generated every day at night. Client API calls may also initiate this download/generation process if the files don't exist or are over a month old. If the WB API is unavailabe at a given time, the app server tries again five times, once every hour after a failed attempt. 

I found having the data stream directly from the WB API, through filters into the client was too slow and would therefore produce an unpleasant user experience.

## Things to do/improve (not in any kind of order)
- The UI is far from polished. Most of my focus/time went on the API.
- Lack of tests. I was really tight on time so I chose to focus on getting the app to working condition so I didn't have time to write tests. Should this app be worked on further, creating a test suite would definitely be on the top of the priority list.
- The regional data provided by the WB API could be used somehow as well. It made little sense to have them mixed with the country-specific data, but it could be used to, for instance, create a comparison between different regions of the world. It could also be used to give percentual data of emissions. This shouldn't be all that difficult to implement as the necessary data is being downloaded from the WB API already, so only an additional filtering function would have to be created to get the relevant data.
- Visualization of the data could be improved. Graphs of country specific data especially could be useful.
- Perhaps store WB data in a database, especially if a database is required for other things. Would make handling and provisioning data easier. On the other hand, having a database for only, virtually static data might be unnecessary and inefficient...
- Use a linter.