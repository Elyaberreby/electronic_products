const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let electronicSchema = new mongoose.Schema({
    id: Number,
    Name: String,
    Price: Number,
    discountPrice: {
        type: Number,
        default: null
    },
    date_created: {
        type: Date,
        default: Date.now()
    }
})

exports.ElectronicModel = mongoose.model("electronicProducts", electronicSchema);

exports.validateProduct = (_reqBody) => {
    let joiSchema = Joi.object({
        id: Joi.number().min(2).max(100).required(),
        Name: Joi.string().min(2).max(150).required(),
        Price: Joi.number().min(2).max(150).required(),
        DiscountPrice: Joi.number().min(1).max(10).allow("", null)   
    })
    return joiSchema.validate(_reqBody);
}

