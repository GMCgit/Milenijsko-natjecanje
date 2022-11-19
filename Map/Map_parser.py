from PIL import Image

pix = Image.open('c:/Users/marin/Documents/Informatika/Milenijsko natjecanje/Milenijsko-natjecanje/Map/Map.png', 'r')
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
        if values[i][j] == (128, 157, 73, 255): mapF[i].append("g")
        elif values[i][j] == (47, 85, 56, 255): mapF[i].append("f")
        elif values[i][j] == (83, 120, 111, 255): mapF[i].append("w")
        elif values[i][j] == (0, 0, 160, 255): mapF[i].append("s")
        elif values[i][j] == (143, 136, 130, 255): mapF[i].append("p")
        elif values[i][j] == (237, 28, 36, 255): mapF[i].append("c")
        mapC[i].append(".")

for i in range(1,99):
    for j in range(1,99):
        if(mapF[i][j] != "w"): continue

        if(mapF[i][j+1] == "g"):
            mapC[i][j] = "ws1"
        
        if(mapF[i+1][j] == "g"):
            mapC[i][j] = "ws2"
        
        if(mapF[i][j-1] == "g"):
            mapC[i][j] = "ws3"
        
        if(mapF[i-1][j] == "g"):
            mapC[i][j] = "ws4"

        if(mapF[i-1][j+1] == "g" and mapF[i-1][j] == "g" and mapF[i][j+1] == "g"):
            mapC[i][j] = "wd1"
        
        if(mapF[i+1][j+1] == "g" and mapF[i+1][j] == "g" and mapF[i][j+1] == "g"):
            mapC[i][j] = "wd2"

        if(mapF[i+1][j-1] == "g" and mapF[i+1][j] == "g" and mapF[i][j-1] == "g"):
            mapC[i][j] = "wd3"

        if(mapF[i-1][j-1] == "g" and mapF[i-1][j] == "g" and mapF[i][j-1] == "g"):
            mapC[i][j] = "wd4" 

print(mapC[37][45])
exit()

print(mapF)
print(mapC)