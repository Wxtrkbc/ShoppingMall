#!/usr/bin/env python
# coding=utf-8

from Infrastructure.DI import Meta
from Model import User
from Repository import UserReporsitory
from Service.User import Service

class AdminDI:

    def __init__(self,):
        pass

    @staticmethod
    def auto_inject():
        Meta.DIMapper.inject(User.UserService, UserReporsitory.UserRepository)
        Meta.DIMapper.inject(Service.UserService, User.UserService)
