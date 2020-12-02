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

- User can check the confirmed, death, and recovery cases chart for global totals.
- User can check the percentage of US confirmed cases from global cases.
- User can check the percentage of US death cases from global cases.
- User can check statical data for confirmed cases per U.S state:
   - If you click the bar chart, you can track confirmed cases and death cases per state.
   - Note that in the NY case, the bar chart is high from the beginning.
   - You can check if cases are getting higher over a period of days.
- User can check dynamic data for confirmed and deaths per U.S state:
   - You can check which U.S. state has the top record by a specific moment.
   - For example, you can check which moment Texas beats California per record type.


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
