import re

redirect = [
    ("http://from/(.*)", "http://to/\\1"),
]

r = [(re.compile(_from), _to) for (_from, _to) in redirect]

def request(ctx, flow):
    req = flow.request

    old_url = req.url

    for _from, _to in r:
        match = _from.match(old_url)
        if match:
            new_url = match.expand(_to)
            print("\nREDIRECT '%s'\nTO\t '%s'\n" % (old_url, new_url))
            req.url = new_url
            return
