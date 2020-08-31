<p align="center">
  <img src="https://mekiit.com/wp-content/uploads/2020/06/logo-superfuds.png" width="177" height="80">
  <h3 align="center">SuperdFüds warehouse API (CRUD)</h3>
</p>

### 📖 Description 
API built in nodejs, express and sequelize that allows CRUD operations for warehouses system.

<br>

### 🔧 Install 
You have to install all dependencies before execute API:
```sh
cd warehouses-api/
npm install
npm run start
```

<br>

### 📦 Usage 
This API allows you to execute CRUD (create, read, update and delete) operations over mysql database that contains warehouse and warehouse_description tables:

1) Get all warehouses: (GET /api/warehouses)
```sh
curl 127.0.0.1:3000/api/warehouses

{
    "status": "4 warehouses fetched",
    "warehouses": [
        {
            "id": 6,
            "name": "Cofradia",
            "headquarters_number": 130000,
            "created_at": "2020-08-31T02:32:07.000Z",
            "updated_at": "2020-08-31T02:32:07.000Z",
            "description": [
                {
                    "id": 5,
                    "warehouse_id": 6,
                    "phone": 3000000,
                    "city": "Bogota",
                    "address": "Cra 1 #1-1",
                    "created_at": "2020-08-31T02:32:07.000Z",
                    "updated_at": "2020-08-31T02:32:07.000Z"
                }
            ]
        }
        
    ]
}
```
2) Get one warehouse by id: (GET /api/warehouse/:id)
```sh
curl 127.0.0.1:3000/api/warehouse/6

{
    "status": "warehouse #6 fetched",
    "warehouse": {
        "id": 6,
        "name": "wareHouse",
        "headquarters_number": 130000,
        "created_at": "2020-08-31T02:32:07.000Z",
        "updated_at": "2020-08-31T02:32:07.000Z",
        "description": [
            {
                "id": 5,
                "warehouse_id": 6,
                "phone": 3000000,
                "city": "Bogota",
                "address": "Cra 1 #1-1",
                "created_at": "2020-08-31T02:32:07.000Z",
                "updated_at": "2020-08-31T02:32:07.000Z"
            }
        ]
    }
}
```
3) Create a new warehouse: (POST /api/warehouses)
```sh
curl -d '{"name": "San Diego","headquartersNumber": 130000,"description":[{"phone": 3000000,"city": "Medellin","address": "Cra 2 #2-2"}]}' -H "Content-Type: application/json" -X POST http://127.0.0.1:3000/api/warehouses

{
    "status": "new warehouse created",
    "warehouse": {
        "created_at": "2020-08-31T03:01:58.972Z",
        "updated_at": "2020-08-31T03:01:58.972Z",
        "id": 15,
        "name": "San Diego",
        "headquarters_number": 130000,
        "description": [
            {
                "created_at": "2020-08-31T03:01:58.972Z",
                "updated_at": "2020-08-31T03:01:58.972Z",
                "id": 15,
                "phone": 3000000,
                "city": "Medellin",
                "address": "Cra 2 #2-2",
                "warehouse_id": 15
            }
        ]
    }
}
```
4) Update warehouse by id: (PUT /api/warehouse/:id)
```sh
curl -d '{"name": "San Carlos"}' -H "Content-Type: application/json" -X PUT http://127.0.0.1:3000/api/warehouse/15

{
    "status": "Instance #15 updated",
    "warehouse": {
        "id": 15,
        "name": "San Carlos",
        "headquarters_number": 130000,
        "created_at": "2020-08-31T03:01:58.000Z",
        "updated_at": "2020-08-31T03:01:58.000Z",
        "description": [
            {
                "id": 15,
                "warehouse_id": 15,
                "phone": 3000000,
                "city": "Medellin",
                "address": "Cra 2 #2-2",
                "created_at": "2020-08-31T03:01:58.000Z",
                "updated_at": "2020-08-31T03:01:58.000Z"
            }
        ]
    }
}
```
5) Delete warehouse by id: (DELETe /api/warehouse/:id)
```sh 
curl -X DELETE http://127.0.0.1:3000/api/warehouse/15

{
    "status": "Total deleted instances: 1"
}

curl 192.168.1.57:3000/api/warehouse/15

{
    "status": "Error while retrieving information from database",
    "error": "Instance not found"
}
```

**Demo:**
![api_demo](http://g.recordit.co/rDtXJo7GWx.gif)
<br>

### ⚙️ Tests 
To run all tests execute:
```sh
npm run test
```

![test](https://lh3.googleusercontent.com/pw/ACtC-3ccBmsKe88nIFClsrFKhYjdYCZhWATloZqgyzj8x7GyAhB6af3ms0-WTH_lSQkhUQdUYLzr12P-y00UDr-D4kjxC8Z-qWTcbl3E4N6l970Sn703sMIeQ9nOWS_3IhG6oyisqClHdDQ87NTjZPbpE9UogA=w937-h364-no)

<br>

## Author
* **David Gonzalez** - [davidgonzalezfx](https://github.com/davidgonzalezfx)
