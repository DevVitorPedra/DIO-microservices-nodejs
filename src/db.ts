import { Pool } from "pg";
const connectionString = 'postgres://gnxcjepl:D-3NJRT3cCvlR3wwIl7teJ6Yu7M1FeqG@motty.db.elephantsql.com/gnxcjepl'
const db = new Pool({
    connectionString
})

export default db