#!/usr/bin/env python
# coding=utf-8


routes = (
    # {
    #     'host_pattern': 'www.wangdong.com',
    #     'route_path': 'UIWeb.Urls',
    #     'route_name': 'patterns'
    # },
    {
        'host_pattern': 'admin.wangdong.com',
        'route_path': 'UIAdmin.Urls',
        'route_name': 'patterns'},
    # {
    #     'host_pattern': 'dealer.wangdong.com',
    #     'route_path': 'UIDealer.Urls',
    #     'route_name': 'patterns'
    # }
)

settings = {
    'template_path': 'Views',
    'static_path': 'Statics',
    'static_url_prefix': '/statics/',
}

PY_MYSQL_CONN_DICT = {
    "host": '127.0.0.1',
    "port": 3306,
    "user": 'root',
    "passwd": '123',
    "db": 'shoppingdb',
    'charset': 'utf8',
}

