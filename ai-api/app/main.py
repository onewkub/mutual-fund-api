from typing import Optional

from fastapi import FastAPI, Request

from pydantic import BaseModel

from prophet import prediction

app = FastAPI()


class Price(BaseModel):
    date: list
    nav: list


@app.get("/")
def read_root():
    return {"this is the root of my AI web api."}


@app.post("/predict_price/")
async def predict(day: int, prices: Price):
    # data = await request.json()
    res_date, res_nav = prediction(prices, day)
    return {'date': res_date, 'nav': res_nav}
