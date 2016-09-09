#!/usr/bin/env python
# coding=utf-8

#!/usr/bin/env python
# coding=utf-8

from ..Core.HttpRequest import AdminRequestHandler
from Infrastructure.Pager import pager
from Service.User import Service
from ..import Mapper
import json
from ..import Config

class Index(AdminRequestHandler):

    def get(self, *args, **kwargs):
        Mapper.AdminDI.auto_inject()  # 注入
        user_server_obj = Service.UserService()
        user_count = user_server_obj.get_counts().get('count(nid)')
        print(user_count)
        rep = user_server_obj.fetch_all()
        page = pager.Pagenation(1, user_count, Config.EACH_PAGE_ITEMS)
        str_page = page.generate_str_page()
        print(str_page)
        self.render('Home/index.html', rep_list=rep.modelView, page=str_page)

    def post(self, *args, **kwargs):
        pass





class UserAdd(AdminRequestHandler):

    def post(self, *args, **kwargs):
        username = self.get_argument('username', None)
        password = self.get_argument('password', None)
        email = self.get_argument('email', None)
        user_type = self.get_argument('user_type', None)
        vip = self.get_argument('vip', None)
        print(username, password, email, user_type, vip)

        Mapper.AdminDI.auto_inject()  # 注入
        user_server_obj = Service.UserService()
        last_id = user_server_obj.add_user(username, password, email, user_type, vip)
        print(last_id)


class UserDelete(AdminRequestHandler):

    def post(self, *args, **kwargs):

        id_list_str = self.get_argument('id_list', None)
        if id_list_str:
            id_list = json.loads(id_list_str)
            Mapper.AdminDI.auto_inject()  # 注入
            user_server_obj = Service.UserService()
            user_server_obj.delete_user_by_id(id_list)


class UserUpdate(AdminRequestHandler):
    def post(self):
        update_data_str = self.get_argument('data', None)
        if update_data_str:
            update_data_list = json.loads(update_data_str)
            print(update_data_list)
            for user in update_data_list:
                update_data = user
                Mapper.AdminDI.auto_inject()  # 注入
                user_server_obj = Service.UserService()
                user_server_obj.update_user_by_id(**update_data)













