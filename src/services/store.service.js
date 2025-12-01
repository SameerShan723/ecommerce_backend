import Store from "../models/store.model.js";
import User from "../models/user.model.js";

class storeService {
  async createStore(body) {
    const storeData = await Store.create(body);
    return storeData;
  }
  async getAllStores() {
    const stores = await Store.find();
    return stores;
  }
  async getStoreById(id) {
    const store = await Store.findById(id);
    return store;
  }
  async updateStore(id, body) {
    const store = await Store.findByIdAndUpdate(id, body, { new: true });
    return store;
  }
  async deleteStore(id) {
    await Store.findByIdAndDelete(id);
    return true;
  }
  async assignSeller(body) {
    const { name, email, password, description, store_name, contact, address } =
      body;

    const seller = await User.create({
      name,
      email,
      password,
      address,
      phone: contact.phone,
      role: "seller",
    });

    const sellerStore = await Store.create({
      name: store_name,
      description,
      address,
      contact,
      user_id: seller._id,
    });

    const sellerDetails = {
      user_name: name,
      email: email,
      store_name: store_name,
    };
    return sellerDetails;
  }
}
export default new storeService();
