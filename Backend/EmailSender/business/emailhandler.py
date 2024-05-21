import business.sendemail as sendemail
import pika
from json import loads
from time import sleep


def consumeEmails(channel, method, properties, body):
    email_data = loads(body)
    response = sendemail.sendEmail(email_data.get('ESubject'), email_data.get('EMessage'), email_data.get('toEmail'))
    print(f"[Consumer] Email Sent : {response}")
    # Acknowledge the message
    channel.basic_ack(delivery_tag=method.delivery_tag)
    sleep(2)


def handle_emails_from_queue():
    max_retries = 12
    retry_delay = 5  # seconds

    for attempt in range(1, max_retries + 1):
        try:
            # Establish a connection to RabbitMQ server
            connection_params = pika.ConnectionParameters(host='localhost', port=15001)
            connection = pika.BlockingConnection(connection_params)

            # Open a channel
            channel = connection.channel()

            # Define queue name
            queue_name = 'email_queue'

            # Declare the queue
            channel.queue_declare(queue=queue_name, durable=True)

            print("[Consumer] Successfully Connected to RabbitMQ")

            # Set up subscription on the queue
            channel.basic_consume(queue=queue_name, on_message_callback=consumeEmails)

            print(' [*] Waiting for messages. To exit press CTRL+C')
            # Start consuming
            channel.start_consuming()
            
        except pika.exceptions.AMQPConnectionError:
            if attempt < max_retries:
                print(f"[Consumer] Failed to connect to RabbitMQ. Retrying in {retry_delay} seconds (attempt {attempt}/{max_retries})")
                sleep(retry_delay)
            else:
                print(f"[Consumer] Failed to connect to RabbitMQ after {max_retries} attempts. Exiting.")
                return
        except Exception as e:
            # Handle other exceptions
            print(f"[Consumer] Error occurred: {e}")
            sleep(1)

if __name__ == "__main__":
    handle_emails_from_queue()
