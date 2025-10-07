#!/bin/bash

# Script pour lancer le front-end sur le port 5000 et le back-end sur le port 3000

# Lancer le front-end (Nuxt) sur le port 5000
echo "Lancement du front-end sur le port 5000..."
cd ./frontend || { echo "Le dossier frontend n'existe pas !"; exit 1; }
# Définir la variable d'environnement pour le port
PORT=5000 npm run dev &
FRONT_PID=$!

# Lancer le back-end sur le port 3000
echo "Lancement du back-end sur le port 3000..."
cd ../backend || { echo "Le dossier backend n'existe pas !"; exit 1; }
npm run start:dev &
BACK_PID=$!

# Attendre que les deux processus se terminent
wait $FRONT_PID $BACK_PID

echo "Front-end et back-end sont terminés."
