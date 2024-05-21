import smtplib

# Email Sending Code

def sendEmail(subject, body, to_email):
    # Email Credentials
    email = "kameron.kub30@ethereal.email"
    password = "H5vtG51kYt2kH2xQFQ"

    # Server Config
    smtpServ = 'smtp.ethereal.email'
    smtpPort = 587

    # Create Message
    message = f"Subject: {subject}\n\n{body}"

    # Connect to Server then Send Email
    try:
        server = smtplib.SMTP(smtpServ, smtpPort)
        server.starttls()
        server.login(email, password)
        server.sendmail(email, to_email, message)
        server.quit()

        apiResponse = f"Email Sent Successfully to {to_email}"
        print(apiResponse)
        return apiResponse
    except smtplib.SMTPException as e:
        api_response = f"Failed to send email to {to_email}. Error: {str(e)}"
        print(api_response)
        return api_response
    except Exception as e:
        apiResponse = f"Failed to send Email to {to_email}"
        print(apiResponse)
        return apiResponse