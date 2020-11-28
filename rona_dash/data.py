import pandas as pd
import datetime
# x = datetime.datetime.now()
# daily_report = f"{x.month}-{int(x.strftime('%d'))-1}-{x.year}"

# #global confirmed, deaths, recovered by country
# daily_df = pd.read_csv(f'data/{daily_report}.csv')
# totals_df = daily_df[['Confirmed', 'Deaths', 'Recovered']].sum().reset_index(name="count")
# totals_df = totals_df.rename(columns={'index': 'condition'})

# #confirmed, deaths, recovered by country
# countries_df = daily_df[['Country_Region', 'Confirmed', 'Deaths', 'Recovered']]
# countries_df = countries_df.groupby("Country_Region").sum().reset_index()


# #USA total confirmed, deaths report
# def make_confirmed_df():
#     df = pd.read_csv('data/time_series_covid19_confirmed_US.csv')
#     df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Province_State', 'Country_Region', 'Lat', 'Long_', 'Combined_Key'], axis=1).sum().reset_index(name='confirmed')
#     df = df.rename(columns={'index':'date'})
#     return df

# def make_deaths_df():
#     df = pd.read_csv('data/time_series_covid19_deaths_US.csv')
#     df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Province_State', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population'], axis=1).sum().reset_index(name='deaths')
#     df = df.rename(columns={'index':'date'})
#     return df

# final_df = make_confirmed_df()
# deaths = make_deaths_df()
# final_df = final_df.merge(deaths)

# #USA confirmed and deaths report by State/Province
# def make_province_confirmed_df(province):
#     df = pd.read_csv('data/time_series_covid19_confirmed_US.csv')
#     df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key'], axis=1)
#     df = df.loc[df["Province_State"] == province]
#     df = df.drop(columns=['Province_State']).sum().reset_index(name='confirmed')
#     df = df.rename(columns={'index': 'date'})
#     return df

# def make_province_deaths_df(province):
#     df = pd.read_csv('data/time_series_covid19_deaths_US.csv')
#     df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population'], axis=1)
#     df = df.loc[df["Province_State"] == province]
#     df = df.drop(columns=['Province_State']).sum().reset_index(name='deaths')
#     df = df.rename(columns={'index': 'date'})
#     return df

# final_province_us_df = make_province_confirmed_df('California')
# cal_deaths = make_province_deaths_df('California')
# final_province_us_df = final_province_us_df.merge(cal_deaths)

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
province_list

# total confirmed count list
# it needs to get max number for xaxis
x = datetime.datetime.now()
year = str(x.year)[0:2]
daily_report = f"{x.month}/{int(x.strftime('%d'))-2}/{year}"

url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv'
df = pd.read_csv(url, error_bad_lines=False)

df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key'], axis=1)
confirmed_df = df.groupby("Province_State").sum().reset_index()
total_confirmed_df = confirmed_df[['Province_State', f'{daily_report}']]
total_confirmed_count_list = total_confirmed_df.drop(['Province_State'], axis=1)
# Creating DataFrame   
df = pd.DataFrame(total_confirmed_count_list)   
total_confirmed_count_list = df[daily_report].tolist()   
max_total_confirmed_count = max(total_confirmed_count_list)
# df = pd.read_csv('data/time_series_covid19_deaths_US.csv')
# df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population'], axis=1)
# deaths_df = df.groupby("Province_State").sum().reset_index()
# deaths_df

'''
github url 패턴중에 raw 란게 있습니다. 그걸로 받으시면 될듯
9:29
github/aaaa/aaa/blob/main/test.csv 란 경로가 있다면
Olevi Rein  9:29 PM
github/aaaa/aaa/raw/main/test.csv 로 받으시면 됩니다.
'''
