
from pymongo import MongoClient
import gridfs

# Conecte-se ao banco de dados MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client.mydatabase

# Crie uma instância do GridFS
fs = gridfs.GridFS(db)

# Abra o arquivo que deseja salvar
with open('C:/Users/felip/OneDrive/Imagens/', 'rb') as file:
    # Salve o arquivo no GridFS
    file_id = fs.put(file, filename='9836b085141a351361c97a6f5746c37f.png')

# Verifique se o arquivo foi salvo com sucesso
if file_id:
    print('Arquivo salvo com sucesso no GridFS.')
else:
    print('Falha ao salvar o arquivo no GridFS.')
