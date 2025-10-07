## Commandes pour les migrations
Générer: 
``npm run typeorm -- migration:generate src/migrations/ActivitiesType.ts -d src/data-source.ts``

Run: 
``npm run typeorm -- migration:run -d src/config/data-source.ts``