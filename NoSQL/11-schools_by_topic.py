#!/usr/bin/env python3
""" Find schools by topic """


def schools_by_topic(mongo_collection, topic):
    """
    Returns a list of schools that have a specific topic
    """
    return list(mongo_collection.find({"topics": topic}))
