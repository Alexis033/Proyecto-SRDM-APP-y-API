from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker
# from dotenv import load_dotenv
import os


# load_dotenv()

# db_url = "mysql+pymysql://root@localhost:3306/mydb"
db_url = "mysql+pymysql://6rrc4u6y48l2auq9puik:pscale_pw_OpVBWjEnXc0uJWu6ONHZAFQ88xmEoCgnUAQsxz8BFXy@aws.connect.psdb.cloud:3306/srdm?ssl_ca=cacert.pem"
# db_url = os.getenv("DB_URL")

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
