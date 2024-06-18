import { prismaClient } from "../app/database.js";
import { logger } from "../app/logging.js";
import { ResponseError } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const list = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.count({
    where: { username: user.username, id: contactId },
  });

  if (contact < 1) {
    throw new ResponseError(404, "Contact is not found !");
  }

  return await prismaClient.address.findMany({
    where: {
      contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

const get = async (user, contactId, addressId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.count({
    where: { username: user.username, id: contactId },
  });

  if (contact < 1) {
    throw new ResponseError(404, "Contact is not found !");
  }

  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      id: addressId,
    },
  });

  if (!address) {
    throw new ResponseError(404, "Address is not found !");
  }

  return address;
};

const create = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.count({
    where: { username: user.username, id: contactId },
  });

  if (contact < 1) {
    throw new ResponseError(404, "Contact is not found !");
  }

  const address = validate(createAddressValidation, request);
  address.contactId = contactId;

  return await prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

const update = async (user, contactId, addressId, request) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.count({
    where: { username: user.username, id: contactId },
  });

  if (contact < 1) {
    throw new ResponseError(404, "Contact is not found !");
  }

  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.count({
    where: {
      id: addressId,
    },
  });

  if (address < 1) {
    throw new ResponseError(404, "Address is not found !");
  }

  request.id = addressId;
  request = validate(updateAddressValidation, request);

  return prismaClient.address.update({
    where: {
      id: addressId,
    },
    data: request,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

const remove = async (user, contactId, addressId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.count({
    where: { username: user.username, id: contactId },
  });

  if (contact < 1) {
    throw new ResponseError(404, "Contact is not found !");
  }

  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.count({
    where: {
      id: addressId,
    },
  });

  if (address < 1) {
    throw new ResponseError(404, "Address is not found !");
  }

  return prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

export default { list, get, create, update, remove };
