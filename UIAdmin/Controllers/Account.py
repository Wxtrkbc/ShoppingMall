#!/usr/bin/env python
# coding=utf-8

from ..Core.HttpRequest import AdminRequestHandler
from Infrastructure.Check_code import check_code
import io
from Service.User import Request
from Service.User import Service
from ..import Mapper

class Login(AdminRequestHandler):

    def get(self, *args, **kwargs):
        self.render('Account/Login.html')

    def post(self, *args, **kwargs):
        print(22)
        username = self.get_argument('username', None)
        password = self.get_argument('password', None)
        check_code = self.get_argument('check_code', None)
        print(username, password, check_code, self.session['CheckCode'])
        if self.session['CheckCode'].upper() == check_code.upper():
            request_obj = Request.UserRequest(username=username, password=password)
            Mapper.AdminDI.auto_inject()                    # 注入
            user_server_obj = Service.UserService()         # 此处需要依赖注入
            response_obj = user_server_obj.check_login(request_obj)
            if response_obj.status:
                self.write('登陆成功')
            else:
                self.write(response_obj.message)
        else:
            self.write('验证码错误')



class Check_code(AdminRequestHandler):

    def get(self, *args, **kwargs):
        mstream = io.BytesIO()
        img, code = check_code.create_validate_code()
        img.save(mstream, 'GIF')
        self.session['CheckCode'] = code
        self.write(mstream.getvalue())



