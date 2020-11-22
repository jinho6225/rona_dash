import pandas as pd

#global confirmed, deaths, recovered by country
daily_df = pd.read_csv('data/daily_report.csv')
totals_df = daily_df[['Confirmed', 'Deaths', 'Recovered']].sum().reset_index(name="count")
totals_df = totals_df.rename(columns={'index': 'condition'})

#confirmed, deaths, recovered by country
countries_df = daily_df[['Country_Region', 'Confirmed', 'Deaths', 'Recovered']]
countries_df = countries_df.groupby("Country_Region").sum().reset_index()


#USA total confirmed, deaths report
def make_confirmed_df():
    df = pd.read_csv('data/confirmed.csv')
    df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Province_State', 'Country_Region', 'Lat', 'Long_', 'Combined_Key'], axis=1).sum().reset_index(name='confirmed')
    df = df.rename(columns={'index':'date'})
    return df

def make_deaths_df():
    df = pd.read_csv('data/deaths.csv')
    df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Province_State', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population'], axis=1).sum().reset_index(name='deaths')
    df = df.rename(columns={'index':'date'})
    return df

final_df = make_confirmed_df()
deaths = make_deaths_df()
final_df = final_df.merge(deaths)

#USA confirmed and deaths report by State/Province
def make_province_confirmed_df(province):
    df = pd.read_csv('data/confirmed.csv')
    df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key'], axis=1)
    df = df.loc[df["Province_State"] == province]
    df = df.drop(columns=['Province_State']).sum().reset_index(name='confirmed')
    df = df.rename(columns={'index': 'date'})
    return df

def make_province_deaths_df(province):
    df = pd.read_csv('data/deaths.csv')
    df = df.drop(['UID', 'iso2', 'iso3', 'code3', 'FIPS', 'Admin2', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population'], axis=1)
    df = df.loc[df["Province_State"] == province]
    df = df.drop(columns=['Province_State']).sum().reset_index(name='deaths')
    df = df.rename(columns={'index': 'date'})
    return df


final_province_us_df = make_province_confirmed_df('California')
cal_deaths = make_province_deaths_df('California')
final_province_us_df = final_province_us_df.merge(cal_deaths)



'''
github url 패턴중에 raw 란게 있습니다. 그걸로 받으시면 될듯

9:29
github/aaaa/aaa/blob/main/test.csv 란 경로가 있다면

Olevi Rein  9:29 PM
github/aaaa/aaa/raw/main/test.csv 로 받으시면 됩니다.
'''