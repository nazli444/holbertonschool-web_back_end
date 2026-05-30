#!/usr/bin/env python3
"""
This module imports async_generator from the previous task and defines
a coroutine that uses an asynchronous comprehension.
"""

import asyncio
from typing import List

# Dynamically importing async_generator as required by the task style
async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """
    Coroutine that collects 10 random numbers from async_generator
    using an asynchronous list comprehension and returns them.
    """
    return [i async for i in async_generator()]
