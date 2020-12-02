# Rona_dashboard

## Description

Rona_dashboard! It is a full stack Data visualization App. backend for Python & Django and frontend for React.js(hooks)


## Live Demo

Try the application live at [https://myungjinho85.pythonanywhere.com/#/)

## Technologies Used

- D3.js
- Pandas
- React.js (CRA)
- React Hooks
- React Router
- CSS3
- HTML5
- SVG
- Python
- Django

## Features

- User can check confirmed, deaths, recovered chart from global total cases
- User can check how much percentage US confirmed cases from global
- User can check how much percentage US deaths cases from global
- User can check static data for confirmed per U.S state
   - if you click bar chart, you could track confirmed and death record per state
   - in NY case, bar chart is high from the begining
   - you could check it is getting higher these days
- User can check dynamic data for confirmed & deaths per U.S state
   - you could check which U.S. state was top record by specific moment
   - you could check when moment Texas beat California


## Development

### Getting Started

1. Clone the repository.

   ```shell
   git clone https://github.com/jinho6225/rona_dash.git
   cd rona_dash
   ```

2. Install all dependencies with NPM.

   ```shell
   npm install
   ```

3. make virtual env first

   ```shell
   python3 -m venv venv
   ```
   
4. Install all dependencies with pip.

   ```shell
   pip install -r requirement.txt
   ```
   
5. Start the project. Once started you can view the application by opening http://localhost:8000 in your browser.

   ```shell
   npm rub build
   python manage.py runserver
   ```
