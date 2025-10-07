#!/bin/bash
set -e

# ----------------- CONFIGURATION -----------------
VPS_USER="mmi23g02"
VPS_HOST="mmi23g02.mmi-troyes.fr"
VPS_TARGET_DIR="/var/www/movea"

FRONTEND_DIR="./frontend"
FRONTEND_ARCHIVE="nuxt_app.tar.gz"
FRONTEND_PM2_NAME="movea-frontend"

BACKEND_DIR="./backend"
BACKEND_DEPLOY_DIR="./deploy"
BACKEND_ARCHIVE="nestjs_app.tar.gz"
BACKEND_PM2_NAME="movea-backend"

SCRIPT_DIR="$(pwd)"

# ----------------- FRONTEND -----------------
deploy_frontend() {
    echo "🔨 Compilation du frontend Nuxt..."
    cd "$FRONTEND_DIR" || { echo "❌ Dossier frontend introuvable"; exit 1; }

    sudo chown -R $(whoami):$(whoami) .
    rm -rf node_modules .nuxt

    npm install
    NODE_ENV=production npm run build

    echo "📦 Création de l'archive frontend..."
    tar -czf "$SCRIPT_DIR/$FRONTEND_ARCHIVE" -C .output .

    echo "🚀 Envoi frontend vers le VPS..."
    scp "$SCRIPT_DIR/$FRONTEND_ARCHIVE" $VPS_USER@$VPS_HOST:/tmp/

    echo "🔗 Déploiement frontend sur le VPS..."
    ssh $VPS_USER@$VPS_HOST << EOF
        set -e
        mkdir -p $VPS_TARGET_DIR/frontend
        rm -rf $VPS_TARGET_DIR/frontend/*
        tar -xzf /tmp/$FRONTEND_ARCHIVE -C $VPS_TARGET_DIR/frontend
        rm /tmp/$FRONTEND_ARCHIVE
        sudo pm2 reload $FRONTEND_PM2_NAME
EOF

    rm -f "$SCRIPT_DIR/$FRONTEND_ARCHIVE"
    echo "✅ Frontend déployé !"
    cd - >/dev/null
}

# ----------------- BACKEND -----------------
deploy_backend() {
    echo "🔨 Préparation du backend NestJS..."
    cd "$BACKEND_DIR" || { echo "❌ Dossier backend introuvable"; exit 1; }
    sudo env "PATH=$PATH" npm run build


    echo "📂 Création du dossier deploy backend..."
    rm -rf "$BACKEND_DEPLOY_DIR"
    mkdir "$BACKEND_DEPLOY_DIR"
    cp -r dist "$BACKEND_DEPLOY_DIR/"
    cp -r node_modules "$BACKEND_DEPLOY_DIR/"
    cp package.json "$BACKEND_DEPLOY_DIR/"

    echo "📦 Création de l'archive backend..."
    cd "$BACKEND_DEPLOY_DIR"
    tar -czf "$SCRIPT_DIR/$BACKEND_ARCHIVE" .
    cd - >/dev/null

    echo "🚀 Envoi backend vers le VPS..."
    scp "$SCRIPT_DIR/$BACKEND_ARCHIVE" $VPS_USER@$VPS_HOST:/tmp/

    echo "🔗 Déploiement backend sur le VPS..."
    ssh $VPS_USER@$VPS_HOST << EOF
        set -e
        mkdir -p $VPS_TARGET_DIR/backend
        find $VPS_TARGET_DIR/backend -mindepth 1 -maxdepth 1 ! -name 'uploads' ! -name '.env' -exec sudo rm -rf {} +
        sudo tar -xzf /tmp/$BACKEND_ARCHIVE -C $VPS_TARGET_DIR/backend
        sudo rm /tmp/$BACKEND_ARCHIVE
        sudo pm2 reload $BACKEND_PM2_NAME
EOF

    rm -f "$SCRIPT_DIR/$BACKEND_ARCHIVE"
    echo "✅ Backend déployé !"
}

# ----------------- EXECUTION -----------------
deploy_frontend
deploy_backend

echo "🎉 Déploiement complet terminé !"
