FROM python:3.7
# RUN pip install fastapi uvicorn
RUN pip install pystan fbprophet fastapi uvicorn sklearn
COPY ./app /app
WORKDIR /app
RUN uvicorn --help
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

