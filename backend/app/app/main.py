from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import api_router


app = FastAPI(title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json")

origins = [

]

app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=["*"],
   allow_method=["*"]
)


app.include_router(api_router, prefix=settings.API_V1_STR)

