#!/usr/bin/env python
# coding=utf-8


#!/usr/bin/env python
# -*- coding:utf-8 -*-
import datetime
from Infrastructure.DI import Meta

class IUseRepository:
    """
    用户信息仓库接口
    """

    def fetch_one_by_user_pwd(self, username, password):
        """
        根据用户名密码获取模型对象
        :param username: 主键ID
        :param password: 主键ID
        :return:
        """
    def fetch_one_by_email_pwd(self, email, password):
        """
        根据邮箱密码获取模型对象
        :param email: 主键ID
        :param password: 主键ID
        :return:
        """

    def update_last_login_by_nid(self, nid, current_date):
        """
        根据ID更新最新登陆时间
        :param nid:
        :return:
        """

    def fetch_all(self):
        """
        获取所有的用户信息
        :return:
        """
        pass

    def add_user(self, username, password, email, user_type, vip, last_login, current_date):
        pass

    def delete_user_by_id(self, id_list):
        pass

    def update_user_by_id(self, **update_data):
        pass

    def get_counts(self):
        pass


class VipType:

    VIP_TYPE = (
        {'nid': 1, 'caption': '铜牌'},
        {'nid': 2, 'caption': '银牌'},
        {'nid': 3, 'caption': '金牌'},
        {'nid': 4, 'caption': '铂金'},
    )

    def __init__(self, nid):
        self.nid = nid

    def get_caption(self):
        caption = None

        for item in VipType.VIP_TYPE:
            if item['nid'] == self.nid:
                caption = item['caption']
                break
        return caption

    caption = property(get_caption)


class UserType:

    USER_TYPE = (
        {'nid': 1, 'caption': '用户'},
        {'nid': 2, 'caption': '商户'},
        {'nid': 3, 'caption': '管理员'},
    )

    def __init__(self, nid):
        self.nid = nid

    def get_caption(self):
        caption = None

        for item in UserType.USER_TYPE:
            if item['nid'] == self.nid:
                caption = item['caption']
                break
        return caption

    caption = property(get_caption)


class User:
    """领域模型"""
    def __init__(self, nid, username, email, last_login, user_type, vip_type):
        self.nid = nid
        self.username = username
        self.email = email
        self.last_login = last_login
        self.user_type = user_type
        self.vip_type = vip_type


class UserService(metaclass=Meta.DIMetaClass):

    def __init__(self, user_repository):
        self.userRepository = user_repository()

    def check_login(self, username=None, email=None, password=None):

        if username:
            user_model = self.userRepository.fetch_one_by_user_pwd(username, password)
        else:
            user_model = self.userRepository.fetch_one_by_email_pwd(email, password)
        if user_model:
            current_date = datetime.datetime.now()
            self.userRepository.update_last_login_by_nid(user_model.nid, current_date)
        return user_model

    def fetch_all(self):
        ret_list = self.userRepository.fetch_all()
        return ret_list

    def add_user(self, username, password, email, user_type, vip):
        current_date = datetime.datetime.now()
        last_id = self.userRepository.add_user(username, password, email, user_type, vip, current_date, current_date)
        return last_id

    def delete_user_by_id(self, id_list):
        self.userRepository.delete_user_by_id(id_list)

    def update_user_by_id(self, **update_data):
        self.userRepository.update_user_by_id(**update_data)

    def get_counts(self):
        return self.userRepository.get_counts()