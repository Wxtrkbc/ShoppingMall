#!/usr/bin/env python
# coding=utf-8


class UserRequest:
    def __init__(self, username=None, email=None, password=None):
        self.username = username
        self.email = email
        self.password = password