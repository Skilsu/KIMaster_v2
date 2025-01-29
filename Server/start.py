from os import environ
from fastapi import FastAPI
import uvicorn
from fastAPIServer import FastAPIServer
from socketServer import SocketServer
from Tools.language_handler import LanguageHandler
from auth_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from db import SessionLocal
from anonymizeDSGVO import anonymize_and_remind_users
import logging

# Logger konfigurieren
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("start.py")

def create_app():
    """
    Create the FastAPI application.
    """
    app = FastAPI()

    msg_builder = LanguageHandler("../Tools/language.csv")
    socket_server = SocketServer(msg_builder)
    fast_api_server = FastAPIServer(socket_server.manager, msg_builder, socket_server.importer)

    app.websocket("/ws")(fast_api_server.websocket_endpoint)
    app.websocket("/game")(socket_server.websocket_endpoint)

    app.include_router(auth_router, prefix="/auth")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


def start_scheduler():
    """
    Start the APScheduler to run periodic tasks every 5 minutes.
    """
    scheduler = BackgroundScheduler()

    def scheduled_task():
        """Task to anonymize and remind inactive users."""
        logger.info("Scheduler task started: Anonymizing and reminding users.")
        db = SessionLocal()
        try:
            anonymize_and_remind_users(db)
        finally:
            db.close()
        logger.info("Scheduler task completed.")

    # Job alle 5 Minuten
    scheduler.add_job(
        scheduled_task,
        IntervalTrigger(minutes=1),  # Wiederholung alle 1 Minuten
        id="five_minute_task",
        replace_existing=True,  # Ersetze vorhandene Jobs mit derselben ID
    )

    # Scheduler starten
    scheduler.start()
    logger.info("Scheduler gestartet: Task wird alle 1 Minuten ausgeführt.")


app = create_app()

if __name__ == "__main__":
    host = environ.get("SERVER_HOST", "0.0.0.0")
    port = int(environ.get("SERVER_PORT", 8000))
    workers = int(environ.get("WORKER", 1))

    start_scheduler()
    uvicorn.run("start:app", host=host, port=port, workers=workers)
