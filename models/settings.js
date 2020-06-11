const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

let Long = mongoose.Schema.Types.Long;

const settingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: Long,
    prefix: String,
    welcomechannel: String,
    logschannel: String,
});

module.exports = mongoose.model('Setting', settingSchema);