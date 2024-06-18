import { logger } from "../app/logging.js";
import addressService from "../service/address-service.js";

const listAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    const result = await addressService.list(user, contactId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAddressById = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    const result = await addressService.get(user, contactId, addressId);

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const contactId = req.params.contactId;

    const result = await addressService.create(user, contactId, request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddressById = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;
    const request = req.body;

    const result = await addressService.update(user, contactId, addressId, request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error)
  }
}

const removeAddressById = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    await addressService.remove(user, contactId, addressId);

    res.status(200).json({
      data: "Address is deleted successfully !",
    });
  } catch (error) {
    next(error);
  }
}

export { listAddress, getAddressById, createAddress, updateAddressById, removeAddressById };
