// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUVUVTNPd1E2OG9YUG1oZUYxRFo2Q05WT1c3VXdqRU42c2Z4NnZzTjBFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZml5OW94TmNBT3dDY2ZtR05ocGZ2cDVFUlpJSjFQZGQ2SnorVVV1L1NqMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0R2ZZQVYvUE9va0I5UkpBQ3dRQmQrUkNRTU9OVUw5dzRrQzhCWGlsL1ZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIdnJWaXFqWWNod0VxemlxRE0vZW1NU1A0eUE0bE9QUlpQcHpZRU9LTEdFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhQKy91dm0xUDR3M1R0TGVwbjNUK2dTaC9HNHRpd09vcjJOdDE1aitLVTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYvdkJvYlRCZHRiYTMwcmdEcVBHbmNqRTJSOU5MSnlRck1qbTJsTUdNalU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU1wc2dJcXZad3lFeHAycmhscklvVnpkY0FwSXNJRkVkdnkxcnFEZjZFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVRRSERjZnlqT1RzODhsRXUxd1ZNcmU5Y0RVbitkNUhMejBJLzRqUktBYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpSdmhiQ3IzMkxNZ2lTa1lEd3BLSHpmZCtweEJyNHNWYnJBWTlxeTI4K2d2WnBtV2xadjZabFFTeks5cDJPMEg1MW5ycWJkMi8vY1dMMSthdXplQWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MywiYWR2U2VjcmV0S2V5IjoiL1AwM0Jjc1JQT1h0b21jVStjYW5PR3lLUU9WWklLNHIvcWRSNGNNeVh5Zz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiMjFXMm8xb2VUYk9yYnllUnJHSjZMdyIsInBob25lSWQiOiJhZWQ2MDU4Ny02MjFjLTQ4MWQtODU1Ny0zNjZlMGY3ZDZlN2MiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUk4wcHducTdkY0hZOFRYRUFXUGZ1aG9KTVZzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtVNmlTcTA3dHZiVVRkNHFmR3R1djF3VzFLcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI3Qk1WVFhKWSIsIm1lIjp7ImlkIjoiMjU2NzA0Mzc2MDc3OjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qg1xu8J2Qjlxu8J2QjSBcbvCdkJNcbvCdkIRcbvCdkIJcbvCdkIdcbiDhtLDhtLzhtLog4bWA4bSx4bac4bS0IOG0teG0uuG2nCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjd0akE4UXc2RGx1QVlZQkNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWEdCeVRkc0ZYRCs2RnBpQTNKRXJNblMzbTJCNEJHK2M1NFIzaTY5VVVtOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNGdpLzRSVjhXeE51dWpHQlNENkNLQW5pSFdCaS9CbW0vUEdvZk53T2RhNmdOUCtrcHFTUS9hNWUweVJnQjdvb01JNTNkNGpacTBhVTRuVUV6Ly9sQmc9PSIsImRldmljZVNpZ25hdHVyZSI6ImcwYmtnMDVlVlpwVDBHS2N4eXpCNFovTFBhc2V5OVdaSGZmZWpNWjEyZWZPOHdqM1hSUW9JY094eklPMTVweXRrUnM5ZW1Lc2xYLzMvN1pHV0JVbWdnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzA0Mzc2MDc3OjVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVnhnY2szYkJWdy91aGFZZ055Ukt6SjB0NXRnZUFSdm5PZUVkNHV2VkZKdiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTcxMjIwN30=",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "Bera",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "256704376077",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
