const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

async function executeDML(sql, binds, autoCommit) {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }
    let result = await cnx.execute(sql, binds, { autoCommit });
    cnx.release();
    return result;
}

async function initDBPool() {
    try {
        // Create a connection pool which will later be accessed via the
        // pool cache as the 'default' pool.
        await oracledb.createPool({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
            // edition: 'ORA$BASE', // used for Edition Based Redefintion
            // events: false, // whether to handle Oracle Database FAN and RLB events or support CQN
            // externalAuth: false, // whether connections should be established using External Authentication
            // homogeneous: true, // all connections in the pool have the same credentials
            // poolAlias: 'default', // set an alias to allow access to the pool via a name.
            // poolIncrement: 1, // only grow the pool by one connection at a time
            // poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
            // poolMin: 0, // start with no connections; let the pool shrink completely
            // poolPingInterval: 60, // check aliveness of connection if idle in the pool for 60 seconds
            // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
            // queueMax: 500, // don't allow more than 500 unsatisfied getConnection() calls in the pool queue
            // queueTimeout: 60000, // terminate getConnection() calls queued for longer than 60000 milliseconds
            // sessionCallback: myFunction, // function invoked for brand new connections or by a connection tag mismatch
            // sodaMetaDataCache: false, // Set true to improve SODA collection access performance
            // stmtCacheSize: 30, // number of statements that are cached in the statement cache of each connection
            // enableStatistics: false // record pool usage for oracledb.getPool().getStatistics() and logStatistics()
        });
        console.log('Connection pool started');

        // Now the pool is running, it can be used
        await dostuff();

    } catch (err) {
        console.error('init() error: ' + err.message);
    } finally {
        await closePoolAndExit();
    }
}

async function closePoolAndExit() {
    console.log('Terminating DB Pool');
    try {
        // Get the pool from the pool cache and close it when no
        // connections are in use, or force it closed after 10 seconds.
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
        // This setting should not be needed if both Oracle Client and Oracle
        // Database are 19c (or later).
        await oracledb.getPool().close(10);
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

/*
------------------------------------------------------------------------------
Operaciones hacia la BD
------------------------------------------------------------------------------
*/

// Obtener mensajes nuevos sin mostrar (con estado 0)
const getNextNewMessages = async () => {
    let sql = `select id,contenido from smsatlantis.mensajes_confirmados_interno where estado = 0 and rownum < 100 order by ultima_vez DESC`;
    const result = await executeDML(sql, [], false);
    const Messages = [];
    result.rows.map(sms => {
        let row = {
            "id": sms[0],
            "sms": sms[1],
        }
        Messages.push(row);
    });

    return Messages;
};


// Obtener mensajes que ya han sido mostrados (estado 1). Se debe usar cuando no hay nuevos por mostrar
const getRepeatedMessages = async () => {
    let sql = `select id,contenido from smsatlantis.mensajes_confirmados_interno where estado = 1 and rownum < 20 order by ultima_vez ASC`;
    const result = await executeDML(sql, [], false);
    const Messages = [];
    result.rows.map(sms => {
        let row = {
            "id": sms[0],
            "sms": sms[1],
        }
        Messages.push(row);
    });

    return Messages;
};

/*
------------------------------------------------------------------------------
Operaciones hacia la BD 
------------------------------------------------------------------------------
*/
// Obtener mensajes a mostrar llamando un cursor
// Este hace un llamado a una stored function
const getNextMessages = async () => {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }

    const result = await cnx.execute(
        `BEGIN :cursor := SMSATLANTIS.MARQUEE_APP.GET_NEXT_MESSAGES(); END;`,
        {
            cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        });
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();  // no parameter means get all rows
    await resultSet.close();  // always close the ResultSet  
    cnx.release();
    return formatNextMessagesResponse(rows);
}

const getNextMessagesInterno = async () => {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }

    const result = await cnx.execute(
        `BEGIN :cursor := SMSATLANTIS.MARQUEE_APP_INTERNO.GET_NEXT_MESSAGES(); END;`,
        {
            cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        });
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();  // no parameter means get all rows
    await resultSet.close();  // always close the ResultSet  
    cnx.release();
    return formatNextMessagesResponse(rows);
}


// Obtener los banners de imagenes a mostrar
// Este hace un llamado a una stored function
const getNextImages = async () => {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }

    const result = await cnx.execute(
        `BEGIN :cursor := SMSATLANTIS.MARQUEE_APP.GET_NEXT_IMAGES(); END;`,
        {
            cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        });
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();  // no parameter means get all rows
    await resultSet.close();  // always close the ResultSet  
    cnx.release();
    return formatNextImagesResponse(rows);
}

const getNextImagesInterno = async () => {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }

    const result = await cnx.execute(
        `BEGIN :cursor := SMSATLANTIS.MARQUEE_APP_INTERNO.GET_NEXT_IMAGES(); END;`,
        {
            cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        });
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();  // no parameter means get all rows
    await resultSet.close();  // always close the ResultSet  
    cnx.release();
    return formatNextImagesResponse(rows);
}

// Obtener los banners de imagenes a mostrar
// Este hace un llamado a una stored function
const getNextAd = async () => {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }

    const result = await cnx.execute(
        `BEGIN :cursor := SMSATLANTIS.MARQUEE_APP.GET_NEXT_AD(); END;`,
        {
            cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        });
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();  // no parameter means get all rows
    await resultSet.close();  // always close the ResultSet  
    cnx.release();
    return formatNextAdResponse(rows);
}

const getNextAdInterno = async () => {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }

    const result = await cnx.execute(
        `BEGIN :cursor := SMSATLANTIS.MARQUEE_APP_INTERNO.GET_NEXT_AD(); END;`,
        {
            cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        });
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();  // no parameter means get all rows
    await resultSet.close();  // always close the ResultSet  
    cnx.release();
    return formatNextAdResponse(rows);
}


// Obtener los banners de imagenes a mostrar
// Este hace un llamado a una stored function
const getNextDonationInfo = async () => {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }

    const result = await cnx.execute(
        `BEGIN :cursor := SMSATLANTIS.MARQUEE_APP.GET_DONATION_INFO(); END;`,
        {
            cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        });
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();  // no parameter means get all rows
    await resultSet.close();  // always close the ResultSet  
    cnx.release();
    return formatNextDonationResponse(rows);
}

const getNextDonationInfoInterno = async () => {
    let cnx;
    try {
        cnx = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        //console.log("DB Connection Successfully!")
    } catch (err) {
        console.log('DB Connection error: ' + (err?.message || err))
    }

    const result = await cnx.execute(
        `BEGIN :cursor := SMSATLANTIS.MARQUEE_APP_INTERNO.GET_DONATION_INFO(); END;`,
        {
            cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        });
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();  // no parameter means get all rows
    await resultSet.close();  // always close the ResultSet  
    cnx.release();
    return formatNextDonationResponse(rows);
}

// -------------------------------------------
// Formateadores de respuestas
function formatNextMessagesResponse(rows) {
    const newObj = [];
    rows.forEach(function (row) {
        let obj = { "sms": row.toString().trim() };
        newObj.push(obj);
    });
    return newObj
}

function formatNextImagesResponse(rows) {
    const newObj = [];
    rows.forEach(function (row) {
        let [name, path, shape] = row;
        let obj = { "name": name, "path": path, "shape": shape };
        newObj.push(obj);
    });
    return newObj
}

function formatNextDonationResponse(rows) {    
    const newObj = [];
    rows.forEach(function (row) {
        let [company, info] = row;
        let obj = { "company": company, "info": info };
        newObj.push(obj);
    });
    return newObj
}

function formatNextAdResponse(rows) {
    const newObj = [];
    rows.forEach(function (row) {
        let [ad] = row;
        let obj = { "ad": ad };
        newObj.push(obj);
    });
    return newObj
}


module.exports = {
    getNextNewMessages,
    getRepeatedMessages,
    getNextMessages,
    getNextMessagesInterno,
    getNextImages,
    getNextImagesInterno,
    getNextAd,
    getNextAdInterno,
    getNextDonationInfo,
    getNextDonationInfoInterno, 
}