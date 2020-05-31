package it.polimi.tiw.imgalleryjs.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import it.polimi.tiw.imgalleryjs.exceptions.*;
import it.polimi.tiw.imgalleryjs.exceptions.InternalError;
import it.polimi.tiw.imgalleryjs.services.UserService;
import it.polimi.tiw.imgalleryjs.utils.SQLExceptionHandler;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet("/signup")
@MultipartConfig
public class SignUpController extends HttpServlet {

    private Gson gson;

    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        var username = request.getParameter("username");
        var email = request.getParameter("email");
        var password = request.getParameter("password");
        var confirmPassword = request.getParameter("passwordCheck");

        var out = response.getWriter();

        if (username == null || username.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new UserBlank()));
            out.flush();
            return;
        }

        if (email == null || email.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new EmailBlank()));
            out.flush();
            return;
        }

        if (password == null || confirmPassword == null || password.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new PasswordBlank()));
            out.flush();
            return;
        }

        if (!confirmPassword.equals(password)){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new PasswordMismatch()));
            out.flush();
            return;
        }

        var userService = new UserService();
        try {
            var user = userService.signUp(username, email, password);
            if (user == null){
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print(this.gson.toJson(new InternalError()));
                out.flush();
                return;
            }
            request.getSession().setAttribute("user", user);
            response.setStatus(HttpServletResponse.SC_OK);
            out.print(this.gson.toJson(user));
            out.flush();
        } catch (SQLException e) {
            SQLExceptionHandler.evaluateError(e, response, gson);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
