#!/usr/bin/env python
# coding=utf-8

from .Controllers import Account
from .Controllers import Home

patterns = [
    (r"/login.html$", Account.Login),
    (r"/check_code$", Account.Check_code),
    (r"/admin_index.html$", Home.Index),
    # (r"/member-list.html$", Home.Member),
    (r"/user_add$", Home.UserAdd),
    (r"/user_delete$", Home.UserDelete),
    (r"/update_user$", Home.UserUpdate),
]