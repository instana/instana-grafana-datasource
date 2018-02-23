FROM cpoepke/mountebank-basis:latest
 
ADD imposters /mb/
 
EXPOSE 2525
EXPOSE 8010
 
CMD mb --configfile /mb/imposters.ejs --allowInjection
