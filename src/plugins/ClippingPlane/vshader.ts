export const vshader = "attribute highp vec3 aVertex;\r\nattribute highp vec4 aColour;\r\nattribute highp float aId;\r\n\r\n\r\nuniform mat4 uMvMatrix;\r\nuniform mat4 uPMatrix;\r\n\r\n\r\nuniform mediump float uColorCoding; \r\nuniform mediump float uSelectedId;\r\n\r\n\r\nuniform vec4 uHoverPickColour;\r\n\r\n\r\nvarying vec4 vColor;\r\n\r\nvec4 getIdColor(float id){\r\n float product = floor(id + 0.5);\r\n float B = floor(product / (256.0*256.0));\r\n float G = floor((product - B * 256.0*256.0) / 256.0);\r\n float R = mod(product, 256.0);\r\n return vec4(R / 255.0, G / 255.0, B / 255.0, 1.0);\r\n}\r\n\r\nvec4 getTransparentColor(vec4 color, float transparency){\r\n mat4 aMat4 = mat4(1.0, 0.0, 0.0, 0.0,\r\n 0.0, 1.0, 0.0, 0.0,\r\n 0.0, 0.0, 1.0, 0.0,\r\n 0.0, 0.0, 0.0, transparency);\r\n return aMat4 * color;\r\n}\r\n\r\n\r\nvoid main(void) {\r\n\r\n bool ignoreVec = false;\r\n if (uColorCoding > 0.5 && uColorCoding <= 1.0)\r\n {\r\n vColor = getIdColor(aId);\r\n }\r\n else if (uColorCoding < -0.5)\r\n {\r\n vColor = getIdColor(1000010.0);\r\n }\r\n else\r\n { \r\n if(uSelectedId == aId)\r\n { \r\n vColor = uHoverPickColour; \r\n }\r\n else\r\n {\r\n if(uSelectedId > 0.0) \r\n {\r\n if(aId != 4.0){\r\n vColor = getTransparentColor(aColour, 0.0);\r\n ignoreVec = true;\r\n }\r\n else\r\n vColor = getTransparentColor(aColour, 0.5);\r\n }\r\n else \r\n vColor = aColour;\r\n }\r\n }\r\n\r\n if(!ignoreVec)\r\n {\r\n gl_Position = uPMatrix * uMvMatrix * vec4(aVertex, 1.0);\r\n }\r\n\r\n}"