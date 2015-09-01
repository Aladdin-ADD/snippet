import re

redirect = [
    (r"http://google.cn/(.*)",
     r"http://google.com/\1"),
]

r = [(re.compile(_from), _to) for (_from, _to) in redirect]

def request(ctx, flow):
    req = flow.request

    old_url = req.url

    for _from, _to in r:
        match = _from.match(old_url)
        if match:
            new_url = match.expand(_to)
            # req.headers["Host"] = ""
            print("\nREDIRECT '%s'\nTO\t '%s'\n" % (old_url, new_url))
            req.url = new_url
            req.update_host_header()
            return

def response(ctx, flow):
    res = flow.response
    res.headers["Access-Control-Allow-Origin"] = ["*"]
