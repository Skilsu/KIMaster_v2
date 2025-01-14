FROM python:3.11.9-slim

# Set the working directory in the container
WORKDIR /app

# Add and install Python dependencies
COPY ./Server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Set the PYTHONPATH environment variable
ENV PYTHONPATH=/app

# Copy all required files into the container
COPY Server /app/Server
COPY Tools /app/Tools
COPY Games /app/Games

# Install cron
RUN apt-get update && apt-get install -y cron && apt-get clean

# Add crontab file to the cron directory
COPY crontab /etc/cron.d/delete_dsgvo_cron

# Set permissions for the crontab file
RUN chmod 0644 /etc/cron.d/delete_dsgvo_cron && crontab /etc/cron.d/delete_dsgvo_cron

# Ensure cron logs are visible
RUN touch /var/log/cron.log

# Default command for the container (overwritten by docker-compose if needed)
CMD ["python", "-u", "/app/Server/start.py"]
