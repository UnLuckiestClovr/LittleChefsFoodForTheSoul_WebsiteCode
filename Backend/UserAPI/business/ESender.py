import sys
import queue
from time import sleep
from json import dumps
import pika

# Set the standard output to unbuffered mode
sys.stdout.reconfigure(line_buffering=False)

# Initialize RabbitMQ Information --------------------------------------------------------------------------------------------

# Create a queue for emails
email_queue = queue.Queue()

# ------------------------------------------------------------------------------------------------------------------------

# Producer

def produce_email_to_queue(email_dict) -> str:
    email_queue.put(email_dict)
    return "Password Updated!"


def produce_rabbitmq_messages():
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

            print("[Producer] Successfully Connected to RabbitMQ")

            while True:
                if not email_queue.empty():
                    email_data = email_queue.get()
                    channel.basic_publish(
                        exchange='',
                        routing_key=queue_name,
                        body=dumps(email_data),
                        properties=pika.BasicProperties(
                            delivery_mode=2,  # make message persistent
                        )
                    )
                    print("[Producer] Email Produced to Consumer: ", email_data)
                    sleep(1)
        except pika.exceptions.AMQPConnectionError:
            if attempt < max_retries:
                print(f"[Producer] Failed to connect to RabbitMQ. Retrying in {retry_delay} seconds (attempt {attempt}/{max_retries})")
                sleep(retry_delay)
            else:
                print(f"[Producer] Failed to connect to RabbitMQ after {max_retries} attempts. Exiting.")
                return
        except Exception as e:
            # Handle other exceptions
            print(f"Error occurred: {e}")
            sleep(1)