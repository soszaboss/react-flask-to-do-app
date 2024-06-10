import pymongo
import contextlib
from pymongo import MongoClient
from bson.objectid import ObjectId
class MongodbClient:
    def __init__(self, client):
        self.client = client

    def get_collection(self, db:str, collection_name:str):
        db = self.client.get_database(db)
        collection = db.get_collection(collection_name)
        return collection
    def create_dbs(self, db_name:str):
        try:
            db = self.client[db_name]
        except Exception as e:
                raise Exception("The following error occurred: ", e)
        else:
            return db
    
    def create_collection(self, db:str, collection_name:str):
        try:
            db = self.client.get_database(db)
            db.create_collection(collection_name)
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        
class Insert(MongoClient):

    def insert_one(self, db, collection_name:str, doc:dict):
        try:
            collection = self.get_collection(db, collection_name)
            doc = collection.insert_one(doc)
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
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return data.inserted_ids
    
        
class Update(MongodbClient):
        
    def update_one(self, db, collection_name:str, query_filter:dict, update_operation:dict, upsert=False):
        try:
            collection = self.get_collection(db, collection_name)
            if not query_filter and not update_operation:
                raise ValueError('query filter and update operation cannot be empty')
            updated_data = collection.update_one(query_filter, update_operation, upsert=upsert)
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
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            if not upsert:
                return updated_data.raw_result
            else:
                return updated_data.upserted_id
            

class Delete(MongoClient):

    def delete_one(self, db, collection_name:str, query_filter:dict):
        try:
            collection = self.get_collection(db, collection_name)
            if not query_filter:
                raise ValueError('query filter operation cannot be empty')
            deleted_data = collection.delete_one(query_filter)
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return deleted_data.raw_result
        
    def delete_one_by_id(self, db, collection_name:str, id:str):
        try:
            collection = self.get_collection(db, collection_name)
            if not id:
                raise ValueError('query filter operation cannot be empty')
            object_id = ObjectId(id)
            filter = {'_id': object_id}
            deleted_data = collection.delete_one(filter)
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return deleted_data.raw_result
    
    def delete_many(self, db, collection_name:str, query_filter:dict):
        try:
            collection = self.get_collection(db, collection_name)
            # if not query_filter:
            #     raise ValueError('query filter operation cannot be empty')
            deleted_data = collection.delete_many(query_filter)
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return deleted_data.raw_result
        
    

class Find(MongodbClient):

    def __init__(self, uri, param=None):
        self.param = param
        super().__init__(uri)

    def find_many_decorator():
        def decorator(func):
            def wrapper(self, *args, **kwargs):
                try:
                    collection = self.get_collection(*args, **kwargs)
                except Exception as e:
                    raise Exception("The following error occurred: ", e)
                else:
                    if self.param is not None:
                        return collection.find(*self.param)
                    else:
                        return collection.find()
            return wrapper
        return decorator

    def list_find_decorator_items(func):
        def items(*args, **kwargs):
            return list(func(*args, **kwargs))
        return items

    @list_find_decorator_items
    @find_many_decorator() #(param=parameter)
    def find(db, collection_name):
        pass

 
    def find_one(self, db, collection_name, filter:tuple):
        try:
            collection = self.get_collection( db, collection_name)
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            if not filter:
                raise ValueError('filter is empty')
            return list(collection.find(*filter))

    def find_one_by_id(self, db, collection_name, id:str):
        object_id = ObjectId(id)
        filter = ({'_id': object_id},)
        return self.find_one(db, collection_name, filter)
    
    def find_and_sort(self, data:dict, db:str, collection_name:str):
        try:
            items = self.find(db=db, collection_name=collection_name).sort(data)
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return list(items)
        
    def find_and_limit(self, limit:int, db:str, collection_name:str):
        try:
            items = self.find(db=db, collection_name=collection_name).limit(limit)
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return list(items)
        
    def limit_and_sort(self, limit:int, data:dict, db:str, collection_name:str):
        try:
            items = self.find(db=db, collection_name=collection_name).sort(data).limit(limit)
        except Exception as e:
            raise Exception("The following error occurred: ", e)
        else:
            return list(items)
        
# status_data = [
#     {
#         'status': 'pending',
#         'value': False
#     },
#      {
#         'status': 'finish',
#         'value': True
#     },

# ]
# data = [
#     {
#         'task': 'Acheter des fleurs pour le jardin',
#         'description': 'Choisissez des fleurs colorées pour égayer votre espace extérieur.',
#         'date': '2024-06-04',
#         'status': '665fa52343691636cd0ab63c'
#     },
#     {
#         'task': 'Réviser pour l examen de mathématiques',
#         'description': 'Passez en revue les formules et les concepts clés.',
#         'date': '2024-06-05',
#         'status': '665fa52343691636cd0ab63b'
#     },
#     {
#         'task': 'Préparer un gâteau au chocolat',
#         'description': 'Trouvez une recette délicieuse et mettez-vous aux fourneaux !',
#         'date': '2024-06-06',
#         'status': '665fa52343691636cd0ab63c'
#     },
#     {
#         'task': 'Faire une promenade au parc',
#         'description': 'Profitez du beau temps et respirez l\'air frais.',
#         'date': '2024-06-07',
#         'status': '665fa52343691636cd0ab63b'
#     },
#     {
#         'task': 'Lire un livre',
#         'description': 'Choisissez un livre qui vous passionne et plongez-vous dedans.',
#         'date': '2024-06-08',
#         'status': '665fa52343691636cd0ab63b'
#     },
#     {
#         'task': 'Nettoyer le garage',
#         'description': 'Organisez vos affaires et jetez ce dont vous n\'avez plus besoin.',
#         'date': '2024-06-09',
#         'status': '665fa52343691636cd0ab63c'
#     },
#     {
#         'task': 'Apprendre une nouvelle chanson à la guitare',
#         'description': 'Trouvez une partition et pratiquez jusqu\'à ce que vous la maîtrisiez.',
#         'date': '2024-06-10',
#         'status': '665fa52343691636cd0ab63b'
#     },
#     {
#         'task': 'Planter des légumes dans le jardin',
#         'description': 'Choisissez des légumes de saison pour diversifier votre alimentation.',
#         'date': '2024-06-11',
#         'status': '665fa52343691636cd0ab63b'
#     },
#     {
#         'task': 'Réviser pour l examen de physique',
#         'description': 'Passez en revue les lois et les concepts clés.',
#         'date': '2024-06-12',
#         'status': '665fa52343691636cd0ab63c'
#     },
#     {
#         'task': 'Préparer une tarte aux pommes',
#         'description': 'Trouvez une recette traditionnelle et mettez-vous aux fourneaux !',
#         'date': '2024-06-13',
#         'status': '665fa52343691636cd0ab63b'
#     },
#     {
#         'task': 'Faire une randonnée en montagne',
#         'description': 'Profitez du paysage et respirez l\'air pur.',
#         'date': '2024-06-14',
#         'status': '665fa52343691636cd0ab63c'
#     },
#     {
#         'task': 'Lire un roman',
#         'description': 'Choisissez un roman qui vous intrigue et plongez-vous dedans.',
#         'date': '2024-06-15',
#         'status': '665fa52343691636cd0ab63b'
#     },
#     {
#         'task': 'Nettoyer la cave',
#         'description': 'Organisez vos affaires et jetez ce dont vous n\'avez plus besoin.',
#         'date': '2024-06-16',
#         'status': '665fa52343691636cd0ab63c'
#     },
#     {
#         'task': 'Apprendre une nouvelle chanson au piano',
#         'description': 'Trouvez une partition et pratiquez jusqu\'à ce que vous la maîtrisiez.',
#         'date': '2024-06-17',
#         'status': '665fa52343691636cd0ab63b'
#     },
#     {
#         'task': 'Faire du yoga',
#         'description': 'Pratiquez quelques postures pour améliorer votre flexibilité et votre concentration.',
#         'date': '2024-06-18',
#         'status': '665fa52343691636cd0ab63c'
#     }
# ]

# data = {
#         'task': 'Faire du yoga',
#         'description': 'Pratiquez quelques postures pour améliorer votre flexibilité et votre concentration.',
#         'date': '2024-06-18',
#         'status': '665fa52343691636cd0ab63c'
#     }

# query = FetchQuery('mongodb://127.0.0.1:27017/')
# database = Database('mongodb://127.0.0.1:27017/')
# insert_status = database.insert_many(db='to_do_list', collection_name='status', docs=status_data)
# delete_todo = database.delete_many(db='to_do_list', collection_name='tasks', query_filter={})
# insert_to_do = database.delete_one_by_id(db='to_do_list', collection_name='tasks', doc=data)
# to_do = query.find_one_by_id(db='to_do_list', collection_name='tasks', id='665fbfab57dbca6dc7334d71')
# status = query.find(db='to_do_list', collection_name='status')
# print(insert_to_do)
# print(to_do)

class MongoContextManager:
    def init(self, url):
        self.URL = url
        self.CLIENT = None

    def __enter__(self):
        self.CLIENT = MongodbClient(self.URL)
        return self.CLIENT
    
    def __exit__(self, exc_type, exc_value, exc_traceback):
        return self.CLIENT.close()
    
@contextlib.contextmanager
def MongoContextManagerDecorator(url:str):
    client = MongodbClient(url)

    yield

    client.close()