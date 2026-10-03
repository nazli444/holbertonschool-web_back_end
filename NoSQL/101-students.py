# my comment
#!/usr/bin/env python3
"""101-students"""

def top_students(mongo_collection):
    """Return students sorted by average score."""
    return mongo_collection.aggregate([
        {
            "$project": {
                "name": 1,
                "topics": 1,
                "averageScore": {"$avg": "$topics.score"}
            }
        },
        {
            "$sort": {
                "averageScore": -1
            }
        }
    ])
