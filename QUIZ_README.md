# 🏋️ Quiz Interactif Fitchen

## 📋 Description

Quiz personnalisé inspiré de Calo.app avec des animations fluides et un design moderne. Le quiz calcule automatiquement les besoins caloriques et les macros personnalisés selon le profil de l'utilisateur.

## ✨ Fonctionnalités

### 🎯 Interface Interactive
- **Animations fluides** : Transitions "slide in / slide out" entre les questions
- **Barre de progression** : Indicateur visuel (1/6, 2/6, etc.)
- **Design immersif** : Fond animé avec formes flottantes
- **Responsive** : Optimisé mobile, tablette et desktop

### 📝 Questions du Quiz

1. **Date de naissance** (jour/mois/année)
   - Calcul de l'âge pour estimation du métabolisme

2. **Sexe** (Homme/Femme)
   - Ajustement des formules selon le sexe

3. **Taille** (en cm)
   - Utilisé dans le calcul du TMB

4. **Poids** (en kg)
   - Base pour les calculs caloriques et macros

5. **Objectif principal**
   - 💪 Prendre du muscle (surplus +10%)
   - 🔥 Perdre du poids (déficit -20%)
   - 📈 Prendre du poids (surplus +15%)
   - ⚖️ Maintenir le poids (maintenance)

6. **Niveau d'activité**
   - 🪑 Sédentaire (facteur 1.2)
   - 🚶 Modérément actif (facteur 1.375)
   - 🏃 Assez actif (facteur 1.55)
   - ⚡ Très actif (facteur 1.725)

## 🧮 Calculs Automatiques

### Taux Métabolique de Base (TMB)
Formule de **Mifflin-St Jeor** :
- **Homme** : (10 × poids) + (6.25 × taille) - (5 × âge) + 5
- **Femme** : (10 × poids) + (6.25 × taille) - (5 × âge) - 161

### Calories de Maintenance
TMB × Facteur d'activité

### Calories Objectif
- **Prise de muscle** : Maintenance × 1.10 (+10%)
- **Perte de poids** : Maintenance × 0.80 (-20%)
- **Prise de poids** : Maintenance × 1.15 (+15%)
- **Maintien** : Maintenance

### Répartition des Macros

**Prise de muscle** :
- Protéines : 2.2g/kg
- Lipides : 1g/kg
- Glucides : Reste des calories

**Perte de poids** :
- Protéines : 2g/kg
- Lipides : 0.8g/kg
- Glucides : Reste des calories

**Prise de poids** :
- Protéines : 1.8g/kg
- Lipides : 1.2g/kg
- Glucides : Reste des calories

**Maintien** :
- Protéines : 1.6g/kg
- Lipides : 1g/kg
- Glucides : Reste des calories

## 💾 Stockage des Données

Les réponses sont sauvegardées dans **localStorage** sous la clé `fitchen_quiz_answers`, permettant :
- Persistance entre les sessions
- Récupération des données sur la page de résultats
- Possibilité de refaire le test

## 🎨 Design

### Charte Graphique
- **Fond principal** : #0A0A0A (noir profond)
- **Cartes** : rgba(20, 20, 20, 0.95) avec glassmorphism
- **Accent principal** : #E32626 (rouge Fitchen)
- **Accent secondaire** : #FF4444 (rouge clair)
- **Gradient** : linear-gradient(135deg, #E32626, #FF4444)

### Animations
- `slideIn` : Apparition avec translation et scale (0.5s)
- `slideOut` : Disparition avec translation et scale (0.4s)
- `float` : Formes d'arrière-plan flottantes (20-30s)
- `fadeInUp` : Apparition des cartes de résultats (0.6s)

## 🚀 Navigation

### Routes
- `/quiz` → Page du quiz (sans header)
- `/results` → Résultats personnalisés (sans header)
- `/` → Retour à l'accueil (bouton "Faire le test")

### Comportement
- Clic sur une réponse → Question suivante automatique
- Bouton "Retour" → Question précédente
- Fin du quiz → Redirection vers `/results`
- Pas de réponses → Redirection vers `/quiz`

## 📱 Responsive

### Desktop (> 968px)
- Grille 2 colonnes pour les profils
- Questions côte à côte pour les choix
- Macros en ligne

### Tablet (640px - 968px)
- Calories empilées verticalement
- Macros en colonne unique

### Mobile (< 640px)
- Toutes les grilles en 1 colonne
- Padding réduit
- Tailles de police adaptées
- Date inputs empilés

## 🛠️ Stack Technique

- **React 19.2.0** avec hooks (useState, useEffect)
- **React Router DOM** pour la navigation
- **CSS pur** avec animations CSS
- **LocalStorage** pour la persistance des données

## 📊 Page de Résultats

Affiche 3 cartes principales :

1. **Profil** 👤
   - Âge, Taille, Poids, Objectif

2. **Besoins caloriques** 🔥
   - TMB → Maintenance → Objectif (avec mise en avant)

3. **Macros** 🥗
   - Cercles de progression pour Protéines/Glucides/Lipides
   - Pourcentages et grammes

### CTA
- **Bouton principal** : "Commander mes repas personnalisés" → `/commander`
- **Bouton secondaire** : "Refaire le test" → `/quiz`

## 🎯 Prochaines Étapes

- [ ] Intégration avec API backend pour sauvegarder les profils
- [ ] Export PDF des résultats
- [ ] Recommandations de plats selon les macros
- [ ] Envoi par email des résultats
- [ ] Suivi de progression dans le temps
