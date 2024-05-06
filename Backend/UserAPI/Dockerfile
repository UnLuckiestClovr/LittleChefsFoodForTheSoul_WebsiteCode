FROM python:3.11

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 15011

ENV NAME LittleChefsUserAPI
ENV MONGO_HOST=localhost
ENV MONGO_PORT=15004

CMD ["python", "app.py"]