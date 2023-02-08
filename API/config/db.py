from sqlalchemy import create_engine, MetaData
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

db_url = URL.create(
    "mysql+pymysql",
    username="root",
    host="localhost",
    port=3306,
    database="mydb",
)

#db_url= "mysql+pymysql://root@localhost:3306/mydb"

engine= create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

meta_data= MetaData()
