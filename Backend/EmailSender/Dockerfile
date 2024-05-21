FROM python:3.11

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV NAME ecommerce_emailhandler

EXPOSE 9000

CMD ["python","-u","main.py"]