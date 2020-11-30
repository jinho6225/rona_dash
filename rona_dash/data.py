import pandas as pd
import datetime

x = datetime.datetime.now()
daily_report = f"{x.month}-{int(x.strftime('%d'))-1}-{x.year}"

#global confirmed, deaths, recovered
url = f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{daily_report}.csv'
daily_df = pd.read_csv(url)
totals_df = daily_df[['Confirmed', 'Deaths', 'Recovered']].sum().reset_index(name="count")
world_df = totals_df.rename(columns={'index': 'condition'})

#by US
url = f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/{daily_report}.csv'
daily_df = pd.read_csv(url)
us_df = daily_df[['Country_Region', 'Confirmed', 'Deaths']]
us_df = us_df.groupby("Country_Region").sum().reset_index()
us_df

#by state
state_df = daily_df[['Province_State', 'Confirmed', 'Deaths']]
state_df


url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv'
df = pd.read_csv(url, error_bad_lines=False)
df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key'], axis=1)
confirmed_df = df.groupby("Province_State").sum().reset_index()
daily_confirmed_record_by_state = confirmed_df.drop(['Province_State'], axis=1)
df = pd.DataFrame(daily_confirmed_record_by_state)
def get_list(df):
    lst = []
    for col in df.columns: 
        total_confirmed_count_list = df[col].tolist()   
        lst.append(total_confirmed_count_list)
    return lst
array = get_list(df)

def get_date_list(df):
    date_lst = []
    for col in df.columns: 
        date_lst.append(col)
    return date_lst
date_array = get_date_list(df)

province_list = confirmed_df[['Province_State']]

# total confirmed count list / it needs to get max number for xaxis
x = datetime.datetime.now()
year = str(x.year)[0:2]
daily_report = f"{x.month}/{int(x.strftime('%d'))-2}/{year}"
total_confirmed_df = confirmed_df[['Province_State', f'{daily_report}']]
total_confirmed_count_list = total_confirmed_df.drop(['Province_State'], axis=1)
# Creating DataFrame   
df = pd.DataFrame(total_confirmed_count_list)   
total_confirmed_count_list = df[daily_report].tolist()   
max_total_confirmed_count = max(total_confirmed_count_list)


# for deaths
url_death = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv'
death_df = pd.read_csv(url_death, error_bad_lines=False)
death_df = death_df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population'], axis=1)
death_df = death_df.groupby("Province_State").sum().reset_index()
daily_death_record_by_state = death_df.drop(['Province_State'], axis=1)
df = pd.DataFrame(daily_death_record_by_state)
def death_get_list(df):
    lst = []
    for col in df.columns: 
        total_confirmed_count_list = df[col].tolist()   
        lst.append(total_confirmed_count_list)
    return lst
death_array = death_get_list(df)

# total confirmed count list / it needs to get max number for xaxis
total_death_df = death_df[['Province_State', f'{daily_report}']]
total_death_count_list = total_death_df.drop(['Province_State'], axis=1)
# Creating DataFrame   
death_df = pd.DataFrame(total_death_count_list)   
total_death_count_list = death_df[daily_report].tolist()   
max_total_death_count = max(total_death_count_list)