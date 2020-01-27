const mongoose = require('mongoose');
const config = require('../../config');
const recipeModel = require("./models/recipeModel")

let historyManager = {};

historyManager.AddOne = async (payload) => {
    return new Promise(async (resolve, reject) => {
        mongoose.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });
        try
        {
            const savedRecipe = await recipeModel.create(payload);
            resolve(savedRecipe);
        }
        catch(error)
        {
            reject(error);
        }
        finally
        {
            mongoose.disconnect();
        }
    });
}

historyManager.Find = async (payload) => {
    return new Promise(async (resolve, reject) => {
        mongoose.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            const result = await recipeModel.find({ id: payload.id });
            resolve(result);
        }
        catch (error) {
            reject(error);
        }
        finally {
            mongoose.disconnect();
        }
    });
}

historyManager.Delete = async (payload) => {
    return new Promise(async (resolve, reject) => {
        mongoose.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            let result = await recipeModel.remove({ id: payload.id });
            resolve(result);
        }
        catch (error) {
            reject(error);
        }
        finally {
            mongoose.disconnect();
        }
    });
}

module.exports = historyManager;