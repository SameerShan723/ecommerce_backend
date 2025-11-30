import { catchAsync } from "../middlewares/errorHandler.js";
import authService from "../services/auth.service.js";
import { createdResponse, successResponse } from "../utils/response.js";

class AuthController {
  login = catchAsync(async (req, res) => {
    const user = await authService.login(req.body);
    console.log(user);
    successResponse(res, user, "Login successful");
  });

  signup = catchAsync(async (req, res) => {
    const { email, name, password, role, addresses, phone, store } = req.body;
    const user = await authService.signup({
      name,
      email,
      password,
      role,
      addresses,
      phone,
      store,
    });
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      addresses: user.addresses,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    createdResponse(res, userResponse, "User created successfully");
  });
}

export default new AuthController();
