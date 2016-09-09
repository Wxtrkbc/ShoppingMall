#!/usr/bin/env python
# coding=utf-8

import os
from Infrastructure.Core.HttpRequest import BaseRequestHandler
from .. import Config


class AdminRequestHandler(BaseRequestHandler):
    def render(self, template_name, **kwargs):
        if Config.base_template_path:
            template_name = os.path.join(Config.base_template_path, template_name)
        super(BaseRequestHandler, self).render(template_name, **kwargs)