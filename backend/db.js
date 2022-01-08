const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/iNoteBook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log('connected to the database successfully!!!!')
    })
}


module.exports = connectToMongo