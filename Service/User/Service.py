#!/usr/bin/env python
# coding=utf-8

from .Response import UserResponse
from .ModelView import UserModelView
from Infrastructure.DI import Meta


class UserService(metaclass=Meta.DIMetaClass):

    def __init__(self, model_user_service):
        self.modelUserService = model_user_service()

    def check_login(self, user_request):
        response = UserResponse()
        try:
            model = self.modelUserService.check_login(user_request.username, user_request.email, user_request.password)
            if not model:
                print(2222222222)
                raise Exception('用户名或密码错误')
            else:
                model_view = UserModelView(nid=model.nid,
                                           username=model.username,
                                           email=model.email,
                                           last_login=model.last_login,
                                           user_type_id=model.user_type.nid,
                                           user_type_caption=model.user_type.caption,
                                           vip_type_id=model.vip_type.nid,
                                           vip_type_caption=model.vip_type.caption,)
                response.modelView = model_view
        except Exception as e:
            response.status = False
            response.message = str(e)
        return response

    def fetch_all(self):
        response = UserResponse()
        model_list = self.modelUserService.fetch_all()
        model_view_list = []
        for model in model_list:
            model_view = UserModelView(nid=model.nid,
                                       username=model.username,
                                       email=model.email,
                                       last_login=model.last_login,
                                       user_type_id=model.user_type.nid,
                                       user_type_caption=model.user_type.caption,
                                       vip_type_id=model.vip_type.nid,
                                       vip_type_caption=model.vip_type.caption, )
            model_view_list.append(model_view)
            response.modelView = model_view_list
        return response

    def add_user(self, username, password, email, user_type, vip):
        response = UserResponse()
        last_id = self.modelUserService.add_user(username, password, email, user_type, vip)
        return last_id

    def delete_user_by_id(self, id_list):
        self.modelUserService.delete_user_by_id(id_list)

    def update_user_by_id(self, **update_data):
        self.modelUserService.update_user_by_id(**update_data)

    def get_counts(self):
        return self.modelUserService.get_counts()