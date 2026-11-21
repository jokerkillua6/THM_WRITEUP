import hashlib
with open("Remittance.one","rb") as f:
 data=f.read()
start=data.find(b"</DOCTYPE html>")
end=data.find(b"</html>")+len(b"</html>")
tr_data=data[start:end]
print(hashlib.sha256(tr_data).hexdigest())
