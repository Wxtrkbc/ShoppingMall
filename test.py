#!/usr/bin/env python
# coding=utf-8


l = {'user_email': '29502417wqe1@qq.com', 'user_id': '1', 'user_type_caption': '管wqe理员'}
nid = l.pop('user_id')
s=''
for k, v in l.items():
    s += k + '=\''+ v+ '\','
ret = 'update userinfo set ' + s[0:len(s)-1] + ' where nid=' + nid
print(ret)


# def func(d):
#     s = ''
#     for k, v in d.items():
#         s += k + '=\'' + v + '\','
#     return s[0:len(s)-1]
#
# def fun(nid, **args):
#     sql = """update UserInfo set %s WHERE nid = %s"""  %(func(args),nid)
#     print(sql)
# fun(1,**l)