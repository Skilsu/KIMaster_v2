from os import environ
from fastapi import FastAPI
import uvicorn
from fastAPIServer import FastAPIServer
from socketServer import SocketServer
from Tools.language_handler import LanguageHandler

from os import environ
from fastapi import FastAPI
import uvicorn
from fastAPIServer import FastAPIServer
from socketServer import SocketServer
from Tools.language_handler import LanguageHandler

from auth_routes import router as auth_router  # Importiere den Router aus auth_routes
from fastapi.middleware.cors import CORSMiddleware


def create_app():
    """
    Create the FastAPI application.

    Initializes the language handler, socket server, and FastAPI server.
    Configures WebSocket endpoints.
    """
    # Create a FastAPI application instance
    app = FastAPI()

    # Initialize LanguageHandler with a path to the language file
    msg_builder = LanguageHandler("../Tools/language.csv")

    # Initialize the SocketServer with the language handler
    socket_server = SocketServer(msg_builder)

    # Initialize the FastAPIServer with the socket manager and language handler
    fast_api_server = FastAPIServer(socket_server.manager, msg_builder, socket_server.importer)

    # Define WebSocket endpoints
    app.websocket("/ws")(fast_api_server.websocket_endpoint)  # WebSocket endpoint for FastAPIServer
    app.websocket("/game")(socket_server.websocket_endpoint)  # WebSocket endpoint for SocketServer

    # Authentifizierungsrouten hinzufügen
    app.include_router(auth_router, prefix="/auth")  # Alle Routen unter /auth verfügbar

    # CORS-Middleware hinzufügen
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Alle Ursprünge zulassen (entwicklungsfreundlich)
        allow_credentials=True,
        allow_methods=["*"],  # Alle Methoden (GET, POST, etc.) zulassen
        allow_headers=["*"],  # Alle Header zulassen
    )


    return app


app = create_app()

if __name__ == "__main__":
    # If this script is run directly, execute the main function
    uvicorn.run("start:app",
                host=environ["SERVER_HOST"],
                port=int(environ["SERVER_PORT"]),
                workers=int(environ["WORKER"]))
