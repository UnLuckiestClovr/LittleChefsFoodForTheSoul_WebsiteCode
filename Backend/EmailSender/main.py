import business.sendemail as sendemail
import business.emailhandler as emailhandler

print("[Consumer] Imports Initialized")

if __name__ == "__main__":
    emailhandler.handle_emails_from_queue()