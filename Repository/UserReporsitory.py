#!/usr/bin/env python
# -*- coding:utf-8 -*-
from Model.User import IUseRepository
from Model.User import User
from Model.User import UserType
from Model.User import VipType
from .DbConnection import DbConnection


class UserRepository(IUseRepository):
    def __init__(self):
        self.db_conn = DbConnection()

    def fetch_one_by_email_pwd(self, email, password):
        ret = None

        cursor = self.db_conn.connect()
        sql = """select nid,username,email,last_login,vip,user_type from UserInfo where email=%s and password=%s"""
        cursor.execute(sql, (email, password))
        db_result = cursor.fetchone()
        self.db_conn.close()
        print(type(db_result), db_result)
        if db_result:
            ret = User(nid=db_result['nid'],
                       username=db_result['username'],
                       email=db_result['email'],
                       last_login=db_result['last_login'],
                       user_type=UserType(nid=db_result['user_type']),
                       vip_type=VipType(nid=db_result['vip'])
                       )
        return ret

    def fetch_one_by_user_pwd(self, username, password):
        ret = None
        cursor = self.db_conn.connect()
        sql = """select nid,username,email,last_login,vip,user_type from UserInfo where username=%s and password=%s"""
        cursor.execute(sql, (username, password))
        db_result = cursor.fetchone()
        self.db_conn.close()

        if db_result:
            ret = User(nid=db_result['nid'],
                       username=db_result['username'],
                       email=db_result['email'],
                       last_login=db_result['last_login'],
                       user_type=UserType(nid=db_result['user_type']),
                       vip_type=VipType(nid=db_result['vip'])
                       )
        return ret

    def update_last_login_by_nid(self, nid, current_date):
        cursor = self.db_conn.connect()
        sql = """update UserInfo set last_login=%s where nid=%s"""
        cursor.execute(sql, (current_date, nid))
        self.db_conn.close()

    def fetch_all(self):
        ret_list = []
        cursor = self.db_conn.connect()
        sql = """select nid,username,email,last_login,vip,user_type from UserInfo """
        cursor.execute(sql)
        db_result = cursor.fetchall()
        self.db_conn.close()
        if db_result:
            for user in db_result:
                user_obj = User(nid=user['nid'],
                                username=user['username'],
                                email=user['email'],
                                last_login=user['last_login'],
                                user_type=UserType(nid=user['user_type']),
                                vip_type=VipType(nid=user['vip'])
                                )
                ret_list.append(user_obj)
            return ret_list

    def add_user(self, username, password, email, user_type, vip, last_login, current_date):
        cursor = self.db_conn.connect()
        sql = """insert into UserInfo (user_type,vip,username,password,email,last_login,ctime)
                  VALUES (%s,%s,%s,%s,%s,%s,%s)"""
        cursor.execute(sql, (user_type, vip, username, password, email, last_login, current_date))

        self.db_conn.close()
        new_id = cursor.lastrowid
        return new_id

    def delete_user_by_id(self, id_list):
        cursor = self.db_conn.connect()
        sql = """delete from UserInfo WHERE nid in %s"""
        cursor.execute(sql, (id_list,))
        self.db_conn.close()

    # 用来动态构建跟新的动态sql语句
    @staticmethod
    def fun(d):
        nid = d.pop('nid')
        s = ''
        for k, v in d.items():
            s += k + '=\'' + v + '\','
        return 'update userinfo set ' + s[0:len(s) - 1] + ' where nid=' + nid

    def update_user_by_id(self, **update_data):
        cursor = self.db_conn.connect()
        sql = UserRepository.fun(update_data)
        cursor.execute(sql)
        self.db_conn.close()

    def get_counts(self):
        cursor = self.db_conn.connect()
        sql = """select count(nid) from  UserInfo """
        cursor.execute(sql)
        db_result = cursor.fetchone()
        self.db_conn.close()
        if db_result:
            print(db_result)
            return db_result