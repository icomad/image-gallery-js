package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class PasswordBlank {
    private String error = "Password is required and can not be blank!";
    private String field = "password";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public PasswordBlank() {}
}
