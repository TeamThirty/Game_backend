FROM python:3.8
WORKDIR /app
COPY requirements.txt /app/
COPY init_db.sql /docker-entrypoint-initdb.d/

RUN pip install gunicorn

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
