import cv2
import face_recognition
import pickle
import os


folderPath = '13-10-23/Images/Akhil' #Set folder path to save the images & encoding file in
pathList = os.listdir(folderPath)
print(pathList)
imgList = []
studentIds = []
for path in pathList:
    imgList.append(cv2.imread(os.path.join(folderPath, path)))
    studentIds.append(os.path.splitext(path)[0])

print(studentIds)


def findEncodings(imagesList):
    encodeList = []
    for img in imagesList:
        # img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)

    return encodeList


print("Encoding Started ...")
encodeListKnown = findEncodings(imgList)
encodeListKnownWithIds = [encodeListKnown, studentIds]
print("Encoding Complete")

file_path = os.path.join(folderPath, "EncodeFile.p")
file = open(file_path, 'wb')
pickle.dump(encodeListKnownWithIds, file)
file.close()
print("File Saved")