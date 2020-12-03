import pandas as pd
import datetime

tod = datetime.datetime.now()
d = datetime.timedelta(days = 3)
x = tod - d
daily_report = f"{x.month}-{int(x.strftime('%d'))}-{x.year}"
# print(daily_report)
# #global confirmed, deaths, recovered
url = f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{daily_report}.csv'
daily_df = pd.read_csv(url)
# daily_df = pd.read_csv(f'data/{daily_report}-global.csv')
totals_df = daily_df[['Confirmed', 'Deaths', 'Recovered']].sum().reset_index(name="count")
world_df = totals_df.rename(columns={'index': 'condition'})
df = pd.DataFrame(world_df)
world_df_list = df['count'].tolist()
world_df_list

#by US
url = f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/{daily_report}.csv'
daily_df = pd.read_csv(url)
# daily_df = pd.read_csv(f'data/{daily_report}.csv')
us_df = daily_df[['Country_Region', 'Confirmed', 'Deaths']]
us_df = us_df.groupby("Country_Region").sum().reset_index()

df = us_df.drop(['Country_Region'], axis=1)
df = pd.DataFrame(df)
confirmed_us = df['Confirmed'].tolist()
death_us = df['Deaths'].tolist()

#by state
state_df = daily_df[['Province_State', 'Confirmed', 'Deaths']]
state_df


url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv'
df = pd.read_csv(url, error_bad_lines=False)
# df = pd.read_csv('data/time_series_covid19_confirmed_US.csv')
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
tod = datetime.datetime.now()
d = datetime.timedelta(days = 3)
x = tod - d 
year = str(x.year)[0:2]
daily_report = f"{x.month}/{int(x.strftime('%d'))}/{year}"


total_confirmed_df = confirmed_df[['Province_State', f'{daily_report}']]
total_confirmed_count_list = total_confirmed_df.drop(['Province_State'], axis=1)
# Creating DataFrame   
df = pd.DataFrame(total_confirmed_count_list)   
total_confirmed_count_list = df[daily_report].tolist()   
max_total_confirmed_count = max(total_confirmed_count_list)


# for deaths
url_death = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv'
death_df = pd.read_csv(url_death, error_bad_lines=False)
# death_df = pd.read_csv('data/time_series_covid19_deaths_US.csv')
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


def getConfirmedByState(state):

    def innerFn(conditions, state):
        url = f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_{condition}_US.csv'
        df = pd.read_csv(url, error_bad_lines=False)
        # df = pd.read_csv('data/time_series_covid19_confirmed_US.csv')
        if condition == 'deaths':
            df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population'], axis=1)
        else:
            df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key'], axis=1)
        confirmed_df = df.groupby("Province_State").sum().reset_index()
        confirmed_df = confirmed_df.loc[confirmed_df['Province_State'] == state]
        confirmed_df = confirmed_df.drop(['Province_State'], axis=1)
        confirmed_df = confirmed_df.sum().reset_index(name=condition)
        confirmed_data_by_state = confirmed_df.rename(columns={'index': 'date'})
        return confirmed_data_by_state

    conditions = ['confirmed', 'deaths']
    final_df = None

    for condition in conditions:
        condition_df = innerFn(condition, state)
        if final_df is None:
            final_df = condition_df
        else:
            final_df = final_df.merge(condition_df)

    date_list = final_df.drop(['confirmed', 'deaths'], axis=1)
    confirmed_list = final_df.drop(['date', 'deaths'], axis=1)
    deaths_list = final_df.drop(['date', 'confirmed'], axis=1)

    date_list = pd.DataFrame(date_list)   
    confirmed_list = pd.DataFrame(confirmed_list)   
    deaths_list = pd.DataFrame(deaths_list)   

    date_list = date_list['date'].tolist()   
    confirmed_list = confirmed_list['confirmed'].tolist()   
    deaths_list = deaths_list['deaths'].tolist()   


    return {
        'period': date_list,
        'confirmed': confirmed_list,
        'deaths': deaths_list,
    }





