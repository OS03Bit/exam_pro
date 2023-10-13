import os
import pickle
import numpy as np
import time
import cv2
import face_recognition

cap = cv2.VideoCapture(1) #Change the number to 0 or 1 if camera is not working
cap.set(3, 640)
cap.set(4, 480)

print("Loading Encode File ...")

file_location = "13-10-23/Images/Akhil/EncodeFile.p" #Set the location of the encoded file for that specific person

file = open(file_location, 'rb')
encodeListKnownWithIds = pickle.load(file)
file.close()
encodeListKnown, studentIds = encodeListKnownWithIds
print("Encode File Loaded")

#Set Parameters here
start_time = time.time()
recognition_interval = 5
org = (50, 50)
font = cv2.FONT_HERSHEY_COMPLEX
font_scale = 0.5
font_thickness = 2

while True:
    success, img = cap.read()
    face_locations = face_recognition.face_locations(img)
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)

    if len(face_locations) == 1:
        if time.time() - start_time >= 1:
            faceCurFrame = face_recognition.face_locations(imgS)
            encodeCurFrame = face_recognition.face_encodings(imgS, faceCurFrame)

            if faceCurFrame:
                for encodeFace, faceLoc in zip(encodeCurFrame, faceCurFrame):
                    matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
                    faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
                    matchIndex = np.argmin(faceDis)
                    if matches[matchIndex]:
                        print(studentIds[matchIndex])
                        text = f"Verified: {studentIds[matchIndex]}"
                        cv2.putText(img, text, org, font, font_scale, (0, 255, 0), font_thickness)
                        
                    else:
                        print("Invalid Face")
                        cv2.putText(img, f"Invalid Face", org, cv2.FONT_HERSHEY_COMPLEX, 0.5, (255,255,0), 2)
                        
    elif len(face_locations) >= 2:
        print("Multiple Faces Detected")
        cv2.putText(img, f"Multiple Faces Found", org, cv2.FONT_HERSHEY_COMPLEX, 0.5, (0,0,255), 2)
    
    else:
        print("No Face Found")
        cv2.putText(img, f"No Face Found", org, cv2.FONT_HERSHEY_COMPLEX, 0.5, (255,0,255), 2)
    
    cv2.imshow("Face Recognition", img)
    cv2.waitKey(1)
