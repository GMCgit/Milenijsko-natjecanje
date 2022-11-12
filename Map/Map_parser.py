from PIL import Image

pix = Image.open('Map.jpg', 'r')
print(pix.size)
print(" ")
imageD = list(pix.getdata())
imageV = []


for i in range(1600):
    imageV.append(imageD[i*1600:1599+i*1600])


values = []
for i in range(100):
    values.append([])
    for j in range(100):
        a = imageV[1+i*16]
        b = a[1+j*16]
        values[i].append(b)


mapF = []
for i in range(100):
    mapF.append([])
    for j in range(100):
        if values[i][j] == (128, 157, 73, 255): mapF[i].append("g")
        elif values[i][j] == (47, 85, 56, 255): mapF[i].append("f")
        elif values[i][j] == (83, 120, 111, 255): mapF[i].append("w")
        elif values[i][j] == (0, 0, 160, 255): mapF[i].append("s")
        elif values[i][j] == (143, 136, 130, 255): mapF[i].append("p")
        elif values[i][j] == (237, 28, 36, 255): mapF[i].append("c")

print(mapF)
