 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0xMWHZLWjJhLzZxTVdlOXJrOXlST1Bub3VmTE10M0JzWG16dkwzaTBWND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUEvODNwaXp5YXN4NmVKTUtEUU13bEJSOXRmeVVCZTZjaXZtdUdaWkR4QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQnd6anpPNmIxdE5iK2xoYVRkZWpYOVdzSFp2b1h4TnY2dHBFRWRNSkhBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoQmVPeWVOQU9BU0tUMmtCL3RkdmJXV20xV0FYblc5YzhHMmdsUEFQbng4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFQcnErUjVYUnplMkRxRjNjSllwRmpjLy9BVHVxUDBiTy82V3Z5RE0wVVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQwd0VDTU93V0NQL3Y0S0dnNkdvY2RFUjRveWdCNjlpYUc2SCtwaEJTbkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0xoZHF6N2FTclNuT1F1RDlTVUovMU5UVkxZdk4zWE9DanlDWHMvdm4wYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieE5yUWJ0UkgvbEFuTHdRQkd6d1IwQ2gxTWFHRlpTT0Z6MTJaSkVDV0Nodz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZPWlk5OWlNa2RqR2wrRmI4bG1xSVdlVjR4TS8zMUV1c2VrOXBEcGZ5eGZqMStvNFBEVU9jK2xKRVgwdWZ6NXF2MkJoSmhuQjFCTUI3YjlCd2puZWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUwLCJhZHZTZWNyZXRLZXkiOiIySVEzeWZPTlZmVTdFVm1XQ3FMVktmNnJuemN0dXp5NEpHTmlZK08yKy80PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyNTUxMjM5NTcwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkU2OUM1NzYyMUFDMUQzMjczQjQ4RTNFNDhERTIzNUNCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQyMDI3MTl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIyNTUxMjM5NTcwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkYyRThCQUI3MkI2RUQ4NEJGNUQ0QjdEMTYzMkZGQTNCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQyMDI3MTl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InRSb3RBOXhFU1JDbk1fNndlcFV0T0EiLCJwaG9uZUlkIjoiMzA1NWFhYWYtNThmMy00MTllLWEzZGMtZTQzNDE0OGVjNjYzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJjTmppSkJjem9FTGp4VlE1UHZlTUFONWRnTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5Ymo4S0NYanliRWd6MVlzdE1vSVU2RTl2Q0U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOEQ1U0NZWE4iLCJtZSI6eyJpZCI6IjIyNTUxMjM5NTcwOjEyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPQzdqM1FRenYyVXRnWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ6dWF6dDZpbkxqbDBoTXJzTWd0VEs3UHl3ZHA4ZXJZbVpzNjhuN2E0eFJBPSIsImFjY291bnRTaWduYXR1cmUiOiJFYnBMUU93SS9oVHV4MnJRM3VWdXYwQXo2MFptN2RMREcvanp2MFZJOXh0ZTFhZWtKdVVpeFRXL1lEMVZIaldIbWp3L3ZCZDJhS2prZmR4RlFzYjZCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQ1NGNlpmUng0UFRJMWM4S3pQczlLRlJ3OFArS21BYkZ4MWhnWG5YR1h1T3c0b3BKWDdiQ3hEd1IxcWV1Z3NwVDl4Y0xWanRMS25ZWEw4YjNFTTZqaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjU1MTIzOTU3MDoxMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjN21zN2VvcHk0NWRJVEs3RElMVXl1ejhzSGFmSHEySm1iT3ZKKzJ1TVVRIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0MjAyNzE0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJZVyJ9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'off',
    CHATBOT: process.env.CHAT_BOT || "on",
    OWNER_NAME: process.env.OWNER_NAME || "Karmi",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "22551239570",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
