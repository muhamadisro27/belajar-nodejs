import { prismaClient } from "../app/database.js";
import { logger } from "../app/logging.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, req) => {
  const contact = validate(createContactValidation, req);

  contact.username = user.username;

  return await prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
    },
  });
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: { username: user.username, id: contactId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      email: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact is not found !");
  }

  return contact;
};

const update = async (user, req) => {
  const contact = validate(updateContactValidation, req);

  const countContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });

  if (countContact < 1) {
    throw new ResponseError(404, "Contact is not found !");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contactCount = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (contactCount < 1) {
    throw new ResponseError(404, "Contact is not found !");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchContactValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.name)
    filters.push({
      OR: [
        {
          firstName: {
            contains: request.name,
          },
          lastName: {
            contains: request.name,
          },
        },
      ],
    });

  if (request.email)
    filters.push({
      email: {
        contains: request.email,
      },
    });

  if (request.phoneNumber) {
    filters.push({
      phoneNumber: {
        contains: request.phoneNumber,
      },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip,
  });

  const totalItem = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      totalPage: Math.ceil(totalItem / request.size),
      totalItem,
    },
  };
};

export default { create, get, update, remove, search };
