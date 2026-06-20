#!/usr/bin/env python3
""" Update topics of a school document """


def update_topics(mongo_collection, name, topics):
    """
    Updates all documents with matching name
    Sets the topics field to the given list
    """
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
