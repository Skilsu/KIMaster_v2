import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import ssl
import os

# Email Einstellungen
SMTP_SERVER = 'mailgate.thm.de'
SMTP_PORT = 465
USERNAME = ''  # THM-Benutzername 
PASSWORD = "" # THM-Passwort

# Email details
from_email = 'esma.bayindir@mnd.thm.de'  # Replace with your THM email
subject = 'Erinnerungsmail'
body = 'Wir möchten Ihnen hiermit mitteilen, dass Ihr Account in 30 Tagen gelöscht wird, aufgrund von 18 Monaten Inaktivität. Falls Sie dies nicht möchten, melden Sie sich bitte in Ihrem Account an.'

# Set up SSL context for secure connections
context = ssl.create_default_context()

def send_emails_bcc(to_emails):
    """
    Sendet eine Erinnerungs-E-Mail an alle Empfänger als BCC.

    :param to_emails: Liste der E-Mail-Adressen
    """
    try:
        # Sicherstellen, dass `to_emails` ist eine Liste  
        if not isinstance(to_emails, list):
            raise ValueError("to_emails must be a list of email addresses")

        # SMTP server erstellen
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(USERNAME, PASSWORD)

            # Email Inahlt erstellen
            msg = MIMEMultipart()
            msg['From'] = from_email
            msg['Subject'] = subject
            msg['BCC'] = ', '.join(to_emails)  # Alle Empfänger in BCC hinzufügen
            msg.attach(MIMEText(body, 'plain'))

            # Email senden
            server.sendmail(from_email, to_emails, msg.as_string())
            print(f"Erinnerungsmail erfolgreich an {len(to_emails)} Empfänger gesendet (BCC).")

    except Exception as e:
        print(f"Error while sending emails: {e}")

# PASSWORD = os.environ.get('PasswortTHM')  # Replace with your THM password (oder aus Umgebungsvariable)