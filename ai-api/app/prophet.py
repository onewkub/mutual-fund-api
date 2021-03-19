# evaluate prophet time series forecasting model on hold out dataset
import pandas as pd
from fbprophet import Prophet
from sklearn.metrics import mean_absolute_error
#from matplotlib import pyplot
from datetime import datetime, timedelta
# load data


def prediction(date_data, time_delta=720, type_time='month', start_time=None):
    # date_data = {
    #     "date": [
    #         "2019-08-01", "2019-09-02",
    #         "2019-10-01", "2019-12-02",
    #         "2020-03-02", "2020-04-01",
    #         "2020-06-01", "2020-07-01",
    #         "2020-08-03", "2020-09-01",
    #         "2020-10-01", "2020-11-02",
    #         "2020-12-01", "2021-02-01"
    #     ],
    #     "nav": [
    #         10.8338, 10.3686,
    #         10.5432, 11.2403,
    #         12.0986, 10.9739,
    #         14.4102, 15.3456,
    #         16.3727, 17.7691,
    #         17.9072, 17.3564,
    #         19.978, 21.9087
    #     ]
    # }
    # print(date_data.date)
    data = {"date": date_data.date, "nav": date_data.nav}
    df = pd.DataFrame(data=data, columns=["date", "nav"])
    # prepare expected column names
    df.columns = ["ds", "y"]
    df['ds'] = pd.to_datetime(df['ds'])
    # print(df)
    # create test dataset, remove last 12 months
    train = df
    # print(train.tail())
    # define the model
    model = Prophet()
    # fit the model
    model.fit(train)
    # define the period for which we want a prediction
    future = list()
    if (start_time == None):
        lastdate = df.iloc[-1]
        start_time = lastdate["ds"]
    freq_time = 'AS'
    if type_time == 'month':
        freq_time = 'MS'
    stop_time = start_time + timedelta(days=time_delta)
    date_future = pd.date_range(
        start=start_time, end=stop_time, freq=freq_time)
    # print(start_time)
    date_future = pd.to_datetime(date_future)
    date_pred_list = []
    for i in date_future:
        date_pred_list.append(i.isoformat())
    # print(date_future)
    future = pd.DataFrame(date_future)
    future.columns = ['ds']
    future['ds'] = pd.to_datetime(future['ds'])
    # print(future)
    # use the model to make a forecast
    # print(future['ds'].values)
    forecast = model.predict(future)
    # print(forecast)
    # # calculate MAE between expected and predicted values for december

    y_pred = forecast['yhat'].values
    date_pred = forecast['ds'].values
    # #mae = mean_absolute_error(y_true, y_pred)
    # #print('MAE: %.3f' % mae)
    # # plot expected vs actual
    # pyplot.plot(y_pred, label='Predicted')
    # pyplot.legend()
    # pyplot.show()
    # print(date_pred,y_pred)
    return (date_pred_list, y_pred.tolist())
# prediction(50,time_delta=720,type_time = 'month',start_time=None)
