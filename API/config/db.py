from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

# db_url = URL.create(
#     "mysql+pymysql",
#     username="2112m4z7b44ahc6jwrmp",
#     password="pscale_pw_MqX5kj4BUAXeiunFcXAB47wZjoCk6PK7e86DB9DP2r0",
#     host="aws.connect.psdb.cloud",
#     port=3306,
#     database="srdm",
#     query={'ssl': {'ca': "/etc/ssl/certs/ca-certificates.crt"}}

# )

# db_url= "mysql+pymysql://root@localhost:3306/mydb"
db_url = "mysql+pymysql://2112m4z7b44ahc6jwrmp:pscale_pw_MqX5kj4BUAXeiunFcXAB47wZjoCk6PK7e86DB9DP2r0@aws.connect.psdb.cloud:3306/srdm?ssl_ca=cacert.pem"

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
