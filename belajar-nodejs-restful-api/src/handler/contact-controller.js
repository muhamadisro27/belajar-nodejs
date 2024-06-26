import { logger } from "../app/logging.js";
import contactService from "../service/contact-service.js";

const createContact = async (req, res, next) => {
  try {
    const result = await contactService.create(req.user, req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const result = await contactService.get(req.user, req.params.contactId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = contactId;

    const result = await contactService.update(user, request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeContactById = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    await contactService.remove(user, contactId);

    res.status(200).json({
      data: "Contact is deleted successfully !",
    });
  } catch (error) {
    next(error);
  }
};

const searchContactById = async (req, res, next) => {
  try {
    const user = req.user;

    const request = {
      name: req.query.name,
      email: req.query.email,
      phoneNumber: req.query.phone,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await contactService.search(user, request);

    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createContact,
  getContactById,
  updateContactById,
  removeContactById,
  searchContactById,
};
