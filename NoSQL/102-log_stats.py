# my comment
#!/usr/bin/env python3
"""102-log_stats"""

from pymongo import MongoClient


def main():
    """Provide stats about Nginx logs."""
    client = MongoClient('mongodb://127.0.0.1:27017')
    collection = client.logs.nginx

    total_logs = collection.count_documents({})
    print("{} logs".format(total_logs))

    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print("\tmethod {}: {}".format(method, count))

    status_check = collection.count_documents({
        "method": "GET",
        "path": "/status"
    })
    print("{} status check".format(status_check))

    print("IPs:")
    pipeline = [
        {
            "$group": {
                "_id": "$ip",
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "count": -1
            }
        },
        {
            "$limit": 10
        }
    ]

    for ip in collection.aggregate(pipeline):
        print("\t{}: {}".format(ip["_id"], ip["count"]))


if __name__ == "__main__":
    main()
