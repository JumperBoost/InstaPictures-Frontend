# Insta'Pictures — Côté Frontend
Projet de visualisation de médias (photos/vidéos) de n'importe quel ville, via les données d'Instagram.

## Descriptif
Ce mini-projet est un site internet dans lequel il est possible de consulter les photos et vidéos d'une ville, prises par les habitants et/ou touristes.
Les médias sont basées sur les données d'Instagram, récoltés via une [API Apify](https://apify.com/apify/instagram-scraper).

Le projet est découpé en deux parties : le **frontend** et le **backend**.
Dans cette partie, il s'agit du frontend, c'est-à-dire l'affichage et la logique côté client. Le backend est disponible dans un autre [dépôt](https://github.com/JumperBoost/InstaPictures-Backend/).

## Technologies utilisées
- [**Nuxt.js**](https://nuxt.com/) 3 _(framework Vue.js)_ avec [**Node.js**](https://nodejs.org/) 22 pour l'affichage utilisateur
- [**TypeScript**](https://www.typescriptlang.org/) 5.7 pour la logique technique
- [**Tailwind**](https://tailwindcss.com/) 3.4, framework CSS pour une élaboration plus rapide du style
- CDN [**Cloudflare**](https://www.cloudflare.com/) pour la sécurité

## Prérequis d'utilisation
- **Node.js** 22 avec modules installés _(npm install)_
- Fichier [**nuxt.config.ts**](nuxt.config.ts) configuré avec le bon URL d'API

## Lien hébergé
https://instapictures.jumperboost.fr/
