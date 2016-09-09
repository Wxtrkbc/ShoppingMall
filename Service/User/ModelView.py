#!/usr/bin/env python
# -*- coding:utf-8 -*-


class UserModelView:

    def __init__(self, nid, username, email, last_login, user_type_id, user_type_caption, vip_type_id, vip_type_caption):
        self.nid = nid
        self.username = username
        self.email = email
        self.last_login = last_login
        self.user_type = user_type_id
        self.user_type_caption = user_type_caption
        self.vip_type = vip_type_id
        self.vip_type_caption = vip_type_caption