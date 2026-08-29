import urllib.request
import json

try:
    # 1. Create conversation
    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/v1/chat/conversations",
        data=json.dumps({"title": "Test Thread"}).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print("CREATED CONV:", data)
        conv_id = data["id"]

    # 2. Send Message
    send_req = urllib.request.Request(
        f"http://127.0.0.1:8000/api/v1/chat/conversations/{conv_id}/send",
        data=json.dumps({
            "message": "nuv a version and nuv nak a vidamga help chesthav? enni domains lo help cheyyagalavu?",
            "preferred_provider": "openai",
            "preferred_model": "gpt-4o"
        }).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(send_req) as resp:
        reply_data = json.loads(resp.read().decode("utf-8"))
        print("REPLY DATA:", json.dumps(reply_data, indent=2))

except Exception as e:
    print("ERROR:", e)
