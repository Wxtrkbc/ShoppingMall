#!/usr/bin/env python
# coding=utf-8

import tornado.ioloop
import tornado.web
import Config


def load_routes(app):
    for route in Config.routes:
        host_pattern = route['host_pattern']
        route_path = route['route_path']
        route_name = route['route_name']

        m = __import__(route_path, fromlist=True)
        pattern_list = getattr(m, route_name)
        app.add_handlers(host_pattern, pattern_list)


def start():

    settings = {}

    settings.update(Config.settings)

    application = tornado.web.Application([], **settings)

    load_routes(application)
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    start()