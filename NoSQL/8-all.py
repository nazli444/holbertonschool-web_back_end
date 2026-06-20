#!/usr/bin/env python3
""" List all documents in a collection """


def list_all(mongo_collection):
    """
    Returns all documents in a collection.
    If collection is empty, returns an empty list.
    """
    return list(mongo_collection.find())
