from sqlalchemy import create_engine, MetaData


db_url= "mysql+pymysql://root:@localhost:3306/mydb"

engine= create_engine(db_url)

conn = engine.connect()

meta_data= MetaData()
