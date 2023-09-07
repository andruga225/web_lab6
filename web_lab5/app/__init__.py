from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import Response, JSONResponse

from app.modules import router
from app.common.db import create_session_factory, create_db_engine
from app.modules.dictionary.models import *


def create_app():
    origins = ['*']

    middleware = [
        Middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"]
        )
    ]

    app = FastAPI(middleware = middleware)

    app.include_router(router, prefix="/api")
    engine = create_db_engine()

    local_session_factory = create_session_factory(engine)

    @app.middleware("http")
    async def db_session_middleware(request: Request, call_next):
        response = Response("Internal server error", status_code=500)
        try:
            request.state.db = local_session_factory()
            response = await call_next(request)
        except ValueError as e:
            response = JSONResponse({"err": str(e)}, status_code=400)
        finally:
            request.state.db.close()
        return response

    return app