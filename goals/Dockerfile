FROM python:3.9.7-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5020

CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5020"]
