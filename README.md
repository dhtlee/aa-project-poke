## Application

Demo: https://aa-project-poke.vercel.app

## Local development

1. Clone repo
2. Build image: `docker build -t aa-project-poke .`
3. Run image: `docker run -d -p 8080:80 --name poke-container aa-project-poke`
4. Launch browser and navigate to `http://localhost:8080`

## Assumptions
1. API will always work, i.e. error boundaries not implemented
2. Size of pokemon data remain relatively consistent over time, i.e. ~1300 pokemons

## Decisions
1. Used mostly vanilla css except for Breadcrumbs and Pagination Bootstrap components for quicker dev
2. Used debounce for pokemon search
3. Normalized data in an array for search to prioritize user experience. Trie data structure is implemented in a separate branch but user loses the ability to search for keywords in middle of words (e.g. abra will return only abra and not crabrawler and kadabra)


## Enhancements
1. Saving search query and page number via URL and loading
2. Adding pokemon to favorite list


## AgencyAnalytics Frontend React Challenge!

Below are the pi  eces of technology that we have added into this repository for you with a little description.

[React](https://reactjs.org/) is a popular JavaScript library for building user interfaces. The whole app will be built on this, feel free to check out the docs!

[Vite](https://vite.dev/) is a popular build engine that is a standard these days and known for fast setup and build times. 

[PokeApi](https://pokeapi.co/ ) this is the definitive API for all things Pokemon. You will be using this for all of our data during this challenge. So please dig in and give it a test, it doesnt require an API key so you can run api calls directly in browser to test out the responses. 

Mockup is located in the /mockup folder

---

### The challenge will have you build a fully functioning react application that is designed to be a a bit of a "pokedex"

There are two pages:

## Page 1 ##
The home page. As the mockup suggests there are all of the following on the home page:
- A search bar where you can search for Pokemon
- The home page is paginated
- The layout is quite simple as far as showing the pokemon and their images.
- Since this page is the home of the application it should also be performant

## Page 2 ##
The second page is a detail screen for the Pokemon, on this page we just show details about each pokemon. This page is quite simple implement it based on the mockup!

## Page 3 ##
Page three is not covered in the mockups but if you're feeling a bit extra we leave this page up to you if you'd like to add your own flare to the pokedex add this page and give us a small write up about why you added it and why it adds user value to your application. An opportunity to show us a bit of everything, development capabilities, design flare and also your product sense. 


### What to expect next ###

Be prepared and able to answer tough questions about your pokedex, we will expect you to know it inside and out, because you built it after all!


