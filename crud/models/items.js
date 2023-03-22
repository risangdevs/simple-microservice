const { getDatabase } = require("../config/mongo");
const mongo = require("mongodb");

class Item {
  static add(data) {
    return getDatabase().collection("items").insertOne(data);
  }
  static findAll() {
    return getDatabase().collection("items").find().toArray();
  }
  static findByPk(id) {
    const o_id = new mongo.ObjectId(id);
    return getDatabase().collection("items").findOne({ _id: o_id });
  }
  static delete(id) {
    const o_id = new mongo.ObjectId(id);
    return getDatabase().collection("items").deleteOne({ _id: o_id });
  }
  static edit(id, data) {
    const o_id = new mongo.ObjectId(id);
    return getDatabase()
      .collection("items")
      .updateOne(
        { _id: o_id },
        {
          $set: {
            title: data.title,
            description: data.description,
          },
        }
      );
  }
}
module.exports = Item;
