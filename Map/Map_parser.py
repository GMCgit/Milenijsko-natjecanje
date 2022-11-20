from PIL import Image
from random import randint

pix = Image.open('Map.png', 'r')
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
mapC = []
for i in range(100):
    mapF.append([])
    mapC.append([])
    for j in range(100):
        if values[i][j] == (128, 157, 73, 255):
            mapF[i].append("g")
        elif values[i][j] == (47, 85, 56, 255):
            mapF[i].append("f")
        elif values[i][j] == (83, 120, 111, 255):
            mapF[i].append("w")
        elif values[i][j] == (0, 0, 160, 255):
            mapF[i].append("s")
        elif values[i][j] == (143, 136, 130, 255):
            mapF[i].append("p")
        elif values[i][j] == (237, 28, 36, 255):
            mapF[i].append("c")
        elif values[i][j] == (255, 242, 0, 255):
            mapF[i].append("n")
        elif values[i][j] == (255,174,201,255):
            mapF[i].append("b")
        mapC[i].append(".")

land = ["g", "f"]

for i in range(1, 99):
    for j in range(1, 99):
        if(mapF[i][j] == "w"):
            if(mapF[i][j+1] == "g"):
                mapC[i][j] = "ws1"

            if(mapF[i+1][j] == "g"):
                mapC[i][j] = "ws2"

            if(mapF[i][j-1] == "g"):
                mapC[i][j] = "ws3"

            if(mapF[i-1][j] == "g"):
                mapC[i][j] = "ws4"

            if(mapF[i-1][j+1] in land and mapF[i-1][j] in land and mapF[i][j+1] in land):
                mapC[i][j] = "wd1"

            if(mapF[i+1][j+1] in land and mapF[i+1][j] in land and mapF[i][j+1] in land):
                mapC[i][j] = "wd2"

            if(mapF[i+1][j-1] in land and mapF[i+1][j] in land and mapF[i][j-1] in land):
                mapC[i][j] = "wd3"

            if(mapF[i-1][j-1] in land and mapF[i-1][j] in land and mapF[i][j-1] in land):
                mapC[i][j] = "wd4"
        elif(mapF[i][j] == "p"):
            if (mapF[i-1][j] == "p" and mapF[i+1][j] == "p" and mapF[i][j-1] == "p"):
                mapC[i][j] = "ps1"
            elif (mapF[i-1][j] == "p" and mapF[i+1][j] == "p" and mapF[i][j+1] == "p"):
                mapC[i][j] = "ps3"
            elif (mapF[i][j-1] == "p" and mapF[i][j+1] == "p" and mapF[i-1][j] == "p"):
                mapC[i][j] = "ps2"
            elif (mapF[i][j-1] == "p" and mapF[i][j+1] == "p" and mapF[i+1][j] == "p"):
                mapC[i][j] = "ps4"

            elif (mapF[i+1][j] != "p" and mapF[i-2][j] == "p" and mapF[i][j-1] == "p" and mapF[i][j+1] != "p"):
                mapC[i][j] = "per1"
            elif (mapF[i+1][j] != "p" and mapF[i-2][j] == "p" and mapF[i][j+1] == "p" and mapF[i][j-1] != "p"):
                mapC[i][j] = "pel1"

            elif (mapF[i][j-1] != "p" and mapF[i][j+2] == "p" and mapF[i+1][j] == "p" and mapF[i-1][j] != "p"):
                mapC[i][j] = "pel2"
            elif (mapF[i][j-1] != "p" and mapF[i][j+2] == "p" and mapF[i-1][j] == "p" and mapF[i+1][j] != "p"):
                mapC[i][j] = "per2"

            elif (mapF[i-1][j] != "p" and mapF[i+2][j] == "p" and mapF[i][j-1] == "p" and mapF[i][j+1] != "p"):
                mapC[i][j] = "pel3"
            elif (mapF[i-1][j] != "p" and mapF[i+2][j] == "p" and mapF[i][j+1] == "p" and mapF[i][j-1] != "p"):
                mapC[i][j] = "per3"

            elif (mapF[i][j+1] != "p" and mapF[i][j-2] == "p" and mapF[i+1][j] == "p" and mapF[i-1][j] != "p"):
                mapC[i][j] = "per4"
            elif (mapF[i][j+1] != "p" and mapF[i][j-1] == "p" and mapF[i-1][j] == "p" and mapF[i+1][j] != "p"):
                mapC[i][j] = "pel4"

for i in range(100):
    for j in range(100):
        if mapF[i][j] == "f":
            mapF[i][j] += str(randint(1, 3))


print(mapF)
print(mapC)
