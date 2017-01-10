# syncspot-recommendations
generate recommendations for brands

Design :

Similarity indices:
 J(A,B) = |A∩B| / |A∪B|

1. Using collaborative filter to recommend promotions
2. Data will be stored in key values pairs (redis)
3. Have a rater classes that adds rating (likes and dislikes)
4. Have a similars class that finds similar promotions
5. Have a suggestions class that suggests promotions
6. Expose functions to a front end interface 

Plan:

1. Create the api
2. Convert database from bourne to production database (as to build offline)
3. Create the front end 
4. Turn it into a microservice


Resources:

1. Windows alt codes: http://technoworld007.blogspot.co.uk/2013/06/windows-alt-key-numeric-codes-of-all.html
2. Algo based on: https://www.toptal.com/algorithms/predicting-likes-inside-a-simple-recommendation-engine