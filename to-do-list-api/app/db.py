import pymongo
from pymongo import MongoClient

class MongodbClient:
    def __init__(self, uri):
        self.URL = uri
        self.client = MongoClient(uri)

    def close(self):
        return self.client.close()

    def get_collection(self, db:str, collection_name:str):
        db = self.client.get_database(db)
        collection = db.get_collection(collection_name)
        return collection
    def create_dbs(self, db_name:str):
        try:
            db = self.client[db_name]
            self.close()
        except Exception as e:
                raise Exception("The following error occurred: ", e)
        else:
            return db
    
    def create_collection(self, db:str, collection_name:str):
        try:
            db = self.client.get_database(db)
            db.create_collection(collection_name)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        
class Database(MongodbClient):
    def insert_one(self, db, collection_name:str, doc:dict):
        try:
            collection = self.get_collection(db, collection_name)
            doc = collection.insert_one(doc)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return doc.inserted_id
        
    def insert_many(self, db:str , collection_name:str, docs:list):
        try:
            collection = self.get_collection(db, collection_name)
            for task in docs:
                typ = type(task)
                if typ != dict:
                    raise ValueError( f'collection has to be a list of dictionaries: {task}')
            data = collection.insert_many(docs)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return data.inserted_ids
        
    def update_one(self, db, collection_name:str, query_filter:dict, update_operation:dict, upsert=False):
        try:
            collection = self.get_collection(db, collection_name)
            if not query_filter and not update_operation:
                raise ValueError('query filter and update operation cannot be empty')
            updated_data = collection.update_one(query_filter, update_operation, upsert=upsert)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            if not upsert:
                return updated_data.raw_result
            else:
                return updated_data.upserted_id
    def update_many(self, db, collection_name:str, query_filter:dict, update_operation:dict, upsert=False):
        try:
            collection = self.get_collection(db, collection_name)
            if not query_filter and not update_operation:
                raise ValueError('query filter and update operation cannot be empty')
            updated_data = collection.update_many(query_filter, update_operation, upsert=upsert)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            if not upsert:
                return updated_data.raw_result
            else:
                return updated_data.upserted_id
            
    def delete_one(self, db, collection_name:str, query_filter:dict):
        try:
            collection = self.get_collection(db, collection_name)
            if not query_filter:
                raise ValueError('query filter operation cannot be empty')
            deleted_data = collection.delete_one(query_filter)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return deleted_data.raw_result
    
    def delete_many(self, db, collection_name:str, query_filter:dict):
        try:
            collection = self.get_collection(db, collection_name)
            if not query_filter:
                raise ValueError('query filter operation cannot be empty')
            deleted_data = collection.delete_many(query_filter)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return deleted_data.raw_result
        
       
class FetchQuery(MongodbClient):
    def find_decorator(self, param=None):
        def decorator(func):
            def wrapper(*args, **kwargs):
                try:
                    collection = self.get_collection(*args, **kwargs)
                except Exception as e:
                    raise Exception("The following error occurred: ", e)
                else:
                    if param is not None:
                        return collection.find(*param)
                    else:
                        return collection.find()
            return wrapper
        return decorator
    def list_find_decorator_items(func):
        def items(*args, **kwargs):
            return list(func(*args, **kwargs))
        return items

    @list_find_decorator_items
    @find_decorator#(param=parameter)
    def find(self, db, collection_name):
        pass
    def find_and_sort(self, data:dict, db:str, collection_name:str):
        try:
            items = self.find(db=db, collection_name=collection_name).sort(data)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return list(items)
        
    def find_and_limit(self, limit:int, db:str, collection_name:str):
        try:
            items = self.find(db=db, collection_name=collection_name).limit(limit)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return list(items)
        
    def limit_and_sort(self, limit:int, data:dict, db:str, collection_name:str):
        try:
            items = self.find(db=db, collection_name=collection_name).sort(data).limit(limit)
            self.close()
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return list(items)